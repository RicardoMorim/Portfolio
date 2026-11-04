import { NextResponse } from "next/server";
import { featuredProjects, profile, skills, workExperience } from "@/content/portfolio";

// A small, stateless, read-only MCP server over Streamable HTTP. It holds no session and
// exposes nothing the public API does not, so a plain JSON-RPC handler is all it needs.

const PROTOCOL_VERSIONS = ["2025-06-18", "2025-03-26", "2024-11-05"];
const MAX_BODY_BYTES = 16_384;
const MAX_QUERY_LENGTH = 200;
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Mcp-Protocol-Version",
};

type Args = Record<string, unknown>;

interface Tool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  run: (args: Args) => unknown;
}

interface RpcMessage {
  id?: string | number | null;
  method?: unknown;
  params?: { protocolVersion?: unknown; name?: unknown; arguments?: Args };
}

const NO_INPUT = { type: "object", properties: {}, additionalProperties: false };

function searchPortfolio({ query }: Args) {
  if (typeof query !== "string" || !query.trim() || query.length > MAX_QUERY_LENGTH) {
    throw new Error(`query must be a non-empty string of at most ${MAX_QUERY_LENGTH} characters`);
  }
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const matches = (value: unknown) => {
    const text = JSON.stringify(value).toLowerCase();
    return terms.some((term) => text.includes(term));
  };
  return {
    query,
    projects: featuredProjects.filter(matches),
    experience: workExperience.filter(matches),
    skills: skills.categories.filter(matches),
  };
}

function getProject({ id }: Args) {
  const project = featuredProjects.find((item) => item.id === id);
  if (!project) throw new Error(`Unknown project. Available ids: ${featuredProjects.map((item) => item.id).join(", ")}`);
  return project;
}

const TOOLS: readonly Tool[] = [
  {
    name: "get_profile",
    description: "Ricardo Morim's current role, summary, focus areas, education and public links.",
    inputSchema: NO_INPUT,
    run: () => profile,
  },
  {
    name: "get_experience",
    description: "Ricardo Morim's professional experience and achievements, newest first.",
    inputSchema: NO_INPUT,
    run: () => workExperience,
  },
  {
    name: "list_projects",
    description: "Ricardo Morim's selected projects with technologies and links.",
    inputSchema: NO_INPUT,
    run: () => featuredProjects,
  },
  {
    name: "get_project",
    description: "One project by id.",
    inputSchema: {
      type: "object",
      properties: { id: { type: "string", enum: featuredProjects.map((item) => item.id) } },
      required: ["id"],
      additionalProperties: false,
    },
    run: getProject,
  },
  {
    name: "get_skills",
    description: "Ricardo Morim's skills grouped by area.",
    inputSchema: NO_INPUT,
    run: () => skills,
  },
  {
    name: "search_portfolio",
    description: "Search projects, experience and skills by keyword, for example 'AppSec' or 'PyTorch'.",
    inputSchema: {
      type: "object",
      properties: { query: { type: "string", maxLength: MAX_QUERY_LENGTH } },
      required: ["query"],
      additionalProperties: false,
    },
    run: searchPortfolio,
  },
];

const success = (id: RpcMessage["id"], result: unknown) => ({ jsonrpc: "2.0", id, result });
const failure = (id: RpcMessage["id"], code: number, message: string) => ({ jsonrpc: "2.0", id: id ?? null, error: { code, message } });
const respond = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: CORS_HEADERS });

function callTool(message: RpcMessage) {
  const tool = TOOLS.find((item) => item.name === message.params?.name);
  if (!tool) return failure(message.id, -32602, "Unknown tool");
  try {
    const text = JSON.stringify(tool.run(message.params?.arguments ?? {}));
    return success(message.id, { content: [{ type: "text", text }], isError: false });
  } catch (error: unknown) {
    const text = error instanceof Error ? error.message : "Tool failed";
    return success(message.id, { content: [{ type: "text", text }], isError: true });
  }
}

function handle(message: RpcMessage) {
  switch (message.method) {
    case "initialize": {
      const requested = message.params?.protocolVersion;
      return success(message.id, {
        protocolVersion: PROTOCOL_VERSIONS.find((version) => version === requested) ?? PROTOCOL_VERSIONS[0],
        capabilities: { tools: {} },
        serverInfo: { name: "ricardo-morim-portfolio", version: "1.0.0" },
        instructions: "Read-only public information about Ricardo Morim, an AI Software Engineer focused on AI security.",
      });
    }
    case "ping":
      return success(message.id, {});
    case "tools/list":
      return success(message.id, { tools: TOOLS.map(({ name, description, inputSchema }) => ({ name, description, inputSchema, annotations: { readOnlyHint: true } })) });
    case "tools/call":
      return callTool(message);
    default:
      return failure(message.id, -32601, "Method not found");
  }
}

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return respond(failure(null, -32600, "Request too large"), 413);

  let message: unknown;
  try {
    message = JSON.parse(raw);
  } catch {
    return respond(failure(null, -32700, "Parse error"), 400);
  }
  if (typeof message !== "object" || message === null || Array.isArray(message)) {
    return respond(failure(null, -32600, "Invalid request"), 400);
  }

  const rpc = message as RpcMessage;
  if (rpc.id === undefined) return new NextResponse(null, { status: 202, headers: CORS_HEADERS });
  return respond(handle(rpc));
}

export function GET() {
  return new NextResponse(null, { status: 405, headers: { ...CORS_HEADERS, Allow: "POST, OPTIONS" } });
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}
