import { NextRequest, NextResponse } from "next/server";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { apiSuccess, apiError } from "@/types/api";

export async function POST(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file") as File;
  if (!file) return NextResponse.json(apiError("No file provided"), { status: 400 });

  // Max 10MB file size
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json(apiError("File too large (max 10MB)"), { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const isImage = file.type.startsWith("image/");
  const isCsv = file.name.endsWith(".csv") || file.type === "text/csv";

  if (isImage) {
    // Return base64 for Claude vision
    const base64 = buffer.toString("base64");
    return NextResponse.json(apiSuccess({
      type: "image",
      mediaType: file.type,
      base64,
      fileName: file.name,
    }));
  }

  if (isCsv || file.name.endsWith(".txt")) {
    // Return text content
    const text = buffer.toString("utf-8");
    return NextResponse.json(apiSuccess({
      type: "text",
      content: text.slice(0, 50000), // Limit to 50K chars
      fileName: file.name,
    }));
  }

  // For PDF and other files, return base64 for processing
  const base64 = buffer.toString("base64");
  return NextResponse.json(apiSuccess({
    type: "document",
    base64,
    fileName: file.name,
    mimeType: file.type,
  }));
}
