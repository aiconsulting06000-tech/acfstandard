import { NextResponse } from "next/server";
import { callClaude } from "../../../src/lib/claude";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prompt = body.prompt ?? body.input ?? "";
    if (!prompt) return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    const text = await callClaude(prompt);
    return NextResponse.json({ text });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? String(err) }, { status: 500 });
  }
}
