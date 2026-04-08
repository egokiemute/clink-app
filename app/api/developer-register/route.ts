import { NextResponse } from "next/server";

const CLINK_DEVELOPER_REGISTER_URL =
  "https://api.tryclink.com/developers/register";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(CLINK_DEVELOPER_REGISTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        data ?? {
          error: "REQUEST_FAILED",
          message: "Something went wrong. Please try again.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json(
      {
        error: "REQUEST_FAILED",
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}

