import { NextRequest } from "next/server";

const BACKEND_URL =
  process.env.API_SERVER_URL ??
  "https://vacant-grime-headrest.ngrok-free.dev";

type BackendContext = {
  params: Promise<{
    path?: string[];
  }>;
};

export async function GET(
  request: NextRequest,
  context: BackendContext
) {
  return proxyBackendRequest(request, context);
}

export async function POST(
  request: NextRequest,
  context: BackendContext
) {
  return proxyBackendRequest(request, context);
}

export async function PUT(
  request: NextRequest,
  context: BackendContext
) {
  return proxyBackendRequest(request, context);
}

export async function PATCH(
  request: NextRequest,
  context: BackendContext
) {
  return proxyBackendRequest(request, context);
}

export async function DELETE(
  request: NextRequest,
  context: BackendContext
) {
  return proxyBackendRequest(request, context);
}

async function proxyBackendRequest(
  request: NextRequest,
  context: BackendContext
) {
  const { path = [] } = await context.params;
  const upstreamPath = path.length > 0 ? `${path.join("/")}/` : "";
  const upstreamUrl = new URL(upstreamPath, `${BACKEND_URL}/`);

  upstreamUrl.search = request.nextUrl.search;

  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  const authorization = request.headers.get("authorization");
  const token = request.cookies.get("jwt")?.value;

  headers.set("ngrok-skip-browser-warning", "1");

  if (contentType) {
    headers.set("content-type", contentType);
  }

  if (authorization) {
    headers.set("authorization", authorization);
  } else if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }

  try {
    const hasBody = !["GET", "HEAD"].includes(request.method);
    const response = await fetch(upstreamUrl, {
      method: request.method,
      headers,
      body: hasBody ? await request.text() : undefined,
      cache: "no-store",
    });

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: filterResponseHeaders(response.headers),
    });
  } catch (error) {
    console.error("Unable to reach backend API.", error);

    return Response.json(
      {
        error: "Unable to reach backend API.",
        detail:
          error instanceof Error
            ? error.message
            : "Unknown backend proxy error.",
      },
      { status: 502 }
    );
  }
}

function filterResponseHeaders(headers: Headers) {
  const nextHeaders = new Headers();

  for (const [key, value] of headers.entries()) {
    if (
      key.toLowerCase() === "content-encoding" ||
      key.toLowerCase() === "content-length" ||
      key.toLowerCase() === "transfer-encoding"
    ) {
      continue;
    }

    nextHeaders.set(key, value);
  }

  return nextHeaders;
}
