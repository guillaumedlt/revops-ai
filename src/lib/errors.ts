// Centralized error catalog — friendly messages with action hints

export type ErrorCode =
  | "AUTH_REQUIRED"
  | "INSUFFICIENT_CREDITS"
  | "RATE_LIMITED"
  | "HUBSPOT_NOT_CONNECTED"
  | "HUBSPOT_TOKEN_EXPIRED"
  | "HUBSPOT_API_ERROR"
  | "ANTHROPIC_KEY_MISSING"
  | "OPENAI_KEY_MISSING"
  | "GOOGLE_KEY_MISSING"
  | "ANTHROPIC_API_ERROR"
  | "OPENAI_API_ERROR"
  | "GOOGLE_API_ERROR"
  | "API_OVERLOADED"
  | "STREAM_INTERRUPTED"
  | "INVALID_REQUEST"
  | "TIMEOUT"
  | "UNKNOWN";

interface ErrorInfo {
  code: ErrorCode;
  title: string;
  message: string;
  action?: string;
  actionUrl?: string;
}

export function getErrorInfo(code: ErrorCode, context?: { remaining?: number; cost?: number; provider?: string; statusCode?: number }): ErrorInfo {
  switch (code) {
    case "AUTH_REQUIRED":
      return { code, title: "Not signed in", message: "Please sign in to continue.", action: "Sign in", actionUrl: "/login" };

    case "INSUFFICIENT_CREDITS":
      return {
        code,
        title: "Out of credits",
        message: "You have " + (context?.remaining ?? 0) + " credits left, this request needs " + (context?.cost ?? 0) + ".",
        action: "Buy credits",
        actionUrl: "/settings?tab=billing",
      };

    case "RATE_LIMITED":
      return {
        code,
        title: "Too many requests",
        message: "You're sending messages too fast. Wait a minute and try again.",
      };

    case "HUBSPOT_NOT_CONNECTED":
      return {
        code,
        title: "HubSpot not connected",
        message: "Connect HubSpot to analyze your CRM data.",
        action: "Connect HubSpot",
        actionUrl: "/settings?tab=connectors",
      };

    case "HUBSPOT_TOKEN_EXPIRED":
      return {
        code,
        title: "HubSpot connection expired",
        message: "Your HubSpot session has expired. Please reconnect.",
        action: "Reconnect HubSpot",
        actionUrl: "/settings?tab=connectors",
      };

    case "HUBSPOT_API_ERROR":
      return {
        code,
        title: "HubSpot error",
        message: "HubSpot returned an error. This usually resolves itself in a few seconds.",
      };

    case "ANTHROPIC_KEY_MISSING":
      return {
        code,
        title: "Anthropic key missing",
        message: "You selected a Claude model but haven't added your Anthropic API key. Use Kairo AI (included) or add your key.",
        action: "Add API key",
        actionUrl: "/settings?tab=llm",
      };

    case "OPENAI_KEY_MISSING":
      return {
        code,
        title: "OpenAI key missing",
        message: "You selected a GPT model but haven't added your OpenAI API key.",
        action: "Add API key",
        actionUrl: "/settings?tab=llm",
      };

    case "GOOGLE_KEY_MISSING":
      return {
        code,
        title: "Google AI key missing",
        message: "You selected a Gemini model but haven't added your Google AI API key.",
        action: "Add API key",
        actionUrl: "/settings?tab=llm",
      };

    case "ANTHROPIC_API_ERROR":
    case "OPENAI_API_ERROR":
    case "GOOGLE_API_ERROR":
      var provider = context?.provider || "AI provider";
      var status = context?.statusCode;
      if (status === 401) {
        return { code, title: "Invalid API key", message: "Your " + provider + " API key is invalid or expired. Please check it in Settings.", action: "Check key", actionUrl: "/settings?tab=llm" };
      }
      if (status === 429) {
        return { code, title: provider + " rate limit", message: provider + " is rate-limiting your requests. Wait a moment and try again." };
      }
      if (status === 529 || status === 503) {
        return { code, title: provider + " overloaded", message: provider + " is currently overloaded. Try again in a few seconds, or switch to another model." };
      }
      return { code, title: provider + " error", message: provider + " returned an error" + (status ? " (" + status + ")" : "") + ". Try again or switch model." };

    case "API_OVERLOADED":
      return { code, title: "AI service overloaded", message: "The AI is overloaded right now. Try again in a few seconds, or switch to another model." };

    case "STREAM_INTERRUPTED":
      return { code, title: "Connection interrupted", message: "Lost connection to the AI mid-response. Your message is saved — please retry." };

    case "INVALID_REQUEST":
      return { code, title: "Invalid request", message: "Something in your message is malformed. Try rephrasing." };

    case "TIMEOUT":
      return { code, title: "Request timed out", message: "The AI took too long to respond. Try a shorter or simpler request." };

    case "UNKNOWN":
    default:
      return { code: "UNKNOWN", title: "Something went wrong", message: "An unexpected error occurred. Try again — if it persists, contact support." };
  }
}

// Helper to detect error code from raw provider response
export function detectErrorCode(error: any, statusCode?: number, provider?: string): ErrorCode {
  if (statusCode === 401) {
    if (provider === "openai") return "OPENAI_KEY_MISSING";
    if (provider === "google") return "GOOGLE_KEY_MISSING";
    if (provider === "anthropic") return "ANTHROPIC_KEY_MISSING";
  }
  if (statusCode === 429) return "RATE_LIMITED";
  if (statusCode === 529 || statusCode === 503) return "API_OVERLOADED";
  if (statusCode === 408 || (error && error.name === "AbortError")) return "TIMEOUT";

  var msg = (error?.message || String(error || "")).toLowerCase();
  if (msg.includes("overloaded")) return "API_OVERLOADED";
  if (msg.includes("rate limit")) return "RATE_LIMITED";
  if (msg.includes("invalid api key") || msg.includes("authentication")) {
    if (provider === "openai") return "OPENAI_KEY_MISSING";
    if (provider === "google") return "GOOGLE_KEY_MISSING";
    return "ANTHROPIC_KEY_MISSING";
  }
  if (msg.includes("hubspot") && msg.includes("expired")) return "HUBSPOT_TOKEN_EXPIRED";
  if (msg.includes("hubspot") && msg.includes("not connected")) return "HUBSPOT_NOT_CONNECTED";

  return "UNKNOWN";
}
