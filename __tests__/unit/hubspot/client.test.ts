import { describe, it, expect, beforeAll, afterAll, afterEach, vi } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import {
  getPipelines,
  getOwners,
  searchObjects,
  searchObjectsIterator,
  getAssociations,
} from "@/lib/hubspot/client";

const HS = "https://api.hubapi.com";
const PORTAL = "test-portal";
const TOKEN = "test-access-token";

// --- MSW Handlers ---
const handlers = [
  // Pipelines
  http.get(`${HS}/crm/v3/pipelines/deals`, () => {
    return HttpResponse.json({
      results: [
        {
          id: "default",
          label: "Sales Pipeline",
          displayOrder: 0,
          stages: [
            {
              id: "appointmentscheduled",
              label: "Appointment Scheduled",
              displayOrder: 0,
              metadata: { probability: 0.2, isClosed: null },
            },
            {
              id: "closedwon",
              label: "Closed Won",
              displayOrder: 5,
              metadata: { probability: 1.0, isClosed: "WON" },
            },
          ],
        },
      ],
    });
  }),

  // Owners
  http.get(`${HS}/crm/v3/owners`, () => {
    return HttpResponse.json({
      results: [
        {
          id: "owner-1",
          email: "alice@ceres.fr",
          firstName: "Alice",
          lastName: "Martin",
          userId: 12345,
        },
        {
          id: "owner-2",
          email: "bob@ceres.fr",
          firstName: "Bob",
          lastName: "Dupont",
          userId: 12346,
        },
      ],
    });
  }),

  // Search — deals (page 1)
  http.post(`${HS}/crm/v3/objects/deals/search`, async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    const after = body.after as string | undefined;

    if (after === "page2") {
      return HttpResponse.json({
        total: 3,
        results: [
          {
            id: "deal-3",
            properties: { dealname: "Deal C", amount: "30000" },
          },
        ],
        paging: {},
      });
    }

    return HttpResponse.json({
      total: 3,
      results: [
        {
          id: "deal-1",
          properties: { dealname: "Deal A", amount: "10000" },
        },
        {
          id: "deal-2",
          properties: { dealname: "Deal B", amount: "20000" },
        },
      ],
      paging: { next: { after: "page2" } },
    });
  }),

  // Associations
  http.get(`${HS}/crm/v4/objects/deals/:dealId/associations/contacts`, () => {
    return HttpResponse.json({
      results: [
        { toObjectId: "contact-1", associationTypes: [] },
        { toObjectId: "contact-2", associationTypes: [] },
      ],
    });
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// --- Tests ---

describe("HubSpot Client", () => {
  describe("getPipelines", () => {
    it("returns pipelines with stages", async () => {
      const pipelines = await getPipelines(TOKEN, PORTAL);

      expect(pipelines).toHaveLength(1);
      expect(pipelines[0].id).toBe("default");
      expect(pipelines[0].label).toBe("Sales Pipeline");
      expect(pipelines[0].stages).toHaveLength(2);
      expect(pipelines[0].stages[1].metadata.isClosed).toBe("WON");
    });
  });

  describe("getOwners", () => {
    it("returns owners list", async () => {
      const owners = await getOwners(TOKEN, PORTAL);

      expect(owners).toHaveLength(2);
      expect(owners[0].email).toBe("alice@ceres.fr");
      expect(owners[1].firstName).toBe("Bob");
    });
  });

  describe("searchObjects", () => {
    it("returns search results with pagination", async () => {
      const result = await searchObjects(
        "deals",
        [{ propertyName: "hs_lastmodifieddate", operator: "GTE", value: "0" }],
        ["dealname", "amount"],
        TOKEN,
        PORTAL
      );

      expect(result.total).toBe(3);
      expect(result.results).toHaveLength(2);
      expect(result.paging.next?.after).toBe("page2");
    });

    it("returns second page when after cursor provided", async () => {
      const result = await searchObjects(
        "deals",
        [{ propertyName: "hs_lastmodifieddate", operator: "GTE", value: "0" }],
        ["dealname", "amount"],
        TOKEN,
        PORTAL,
        "page2"
      );

      expect(result.results).toHaveLength(1);
      expect(result.results[0].id).toBe("deal-3");
      expect(result.paging.next).toBeUndefined();
    });
  });

  describe("searchObjectsIterator", () => {
    it("auto-paginates through all results", async () => {
      const allResults: Array<{ id: string }> = [];

      for await (const result of searchObjectsIterator(
        "deals",
        [{ propertyName: "hs_lastmodifieddate", operator: "GTE", value: "0" }],
        ["dealname", "amount"],
        TOKEN,
        PORTAL
      )) {
        allResults.push(result);
      }

      expect(allResults).toHaveLength(3);
      expect(allResults.map((r) => r.id)).toEqual([
        "deal-1",
        "deal-2",
        "deal-3",
      ]);
    });
  });

  describe("getAssociations", () => {
    it("returns associated object IDs", async () => {
      const ids = await getAssociations(
        "deals",
        "deal-1",
        "contacts",
        TOKEN,
        PORTAL
      );

      expect(ids).toEqual(["contact-1", "contact-2"]);
    });
  });

  describe("retry behavior", () => {
    it("retries on 429 and succeeds", async () => {
      let attempt = 0;
      server.use(
        http.get(`${HS}/crm/v3/owners`, () => {
          attempt++;
          if (attempt === 1) {
            return new HttpResponse(null, {
              status: 429,
              headers: { "Retry-After": "0" },
            });
          }
          return HttpResponse.json({
            results: [
              { id: "o1", email: "a@b.com", firstName: "A", lastName: "B", userId: 1 },
            ],
          });
        })
      );

      const owners = await getOwners(TOKEN, PORTAL);
      expect(owners).toHaveLength(1);
      expect(attempt).toBe(2);
    });

    it("throws on 400 without retrying", async () => {
      server.use(
        http.get(`${HS}/crm/v3/pipelines/deals`, () => {
          return HttpResponse.json(
            { message: "Bad request" },
            { status: 400 }
          );
        })
      );

      await expect(getPipelines(TOKEN, PORTAL)).rejects.toThrow(
        "HubSpot API error 400"
      );
    });
  });
});
