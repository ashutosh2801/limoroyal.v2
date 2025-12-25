import { NextResponse } from "next/server";
export const dynamic = "force-static";
//export const revalidate = 3600; // 1 hour

export async function GET() {
  try {
    console.log("Fetching pickup data from external API...");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vehicles`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        // Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`External API error: ${res.status}`);
    }

    const result = await res.json();

    return NextResponse.json({
      success: true,
      data: result.data ?? [],
    });
  } catch (error) {
    console.error("Pickup API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}
