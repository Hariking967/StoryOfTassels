import { NextResponse } from "next/server";
import { sendBookingEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { from, to, subject, body } = await req.json();

    if (!from || !to || !subject || !body) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    await sendBookingEmail({
      from,
      to,
      subject,
      message: body,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Mail error:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
