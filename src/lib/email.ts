import { resend } from "./resend";

export async function sendBookingEmail({
  from,
  to,
  subject,
  message,
}: {
  from: string;
  to: string;
  subject: string;
  message: string;
}) {
  try {
    const data = await resend.emails.send({
      from,
      to,
      subject,
      html: `<div style="font-family:Arial, sans-serif; line-height:1.5">
               <h2>${subject}</h2>
               <p>${message}</p>
             </div>`,
    });

    return data;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
}
