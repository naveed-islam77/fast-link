import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { from, message, subject, text } = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: "delivered@resend.dev",
      to: process.env.ADMIN_EMAIL || "",
      subject: subject || "New Contact Message",
      html: message,
      replyTo: from,
      text
    });

    if (error) {
      console.error("Failed to send email:", error);
      return Response.json({ error: error.message || "Failed to send email" }, { status: 500 });
    }

    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}
