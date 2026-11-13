import { NextResponse } from "next/server";
import { inngest } from "@/lib/inngest/client";

export async function POST() {
  try {
    const result = await inngest.send({
      name: "test/connection",
      data: {
        message: "Hello from Next.js!",
        timestamp: new Date().toISOString(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Inngest event sent successfully!",
      eventId: result.ids?.[0],
    });
  } catch (error) {
    console.error("Inngest connection failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Inngest connection failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}