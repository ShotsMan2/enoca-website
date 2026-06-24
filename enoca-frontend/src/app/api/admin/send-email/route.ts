import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { to, subject, message } = await req.json();

    if (!to || !subject || !message) {
      return NextResponse.json({ error: "Eksik parametreler" }, { status: 400 });
    }

    let { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
    SMTP_PASS = SMTP_PASS?.replace(/\s+/g, '');

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      return NextResponse.json({ error: "SMTP ayarları eksik. Lütfen .env dosyanızı kontrol edin." }, { status: 500 });
    }

    const isGmail = SMTP_HOST?.includes("gmail");
    
    const transporter = nodemailer.createTransport(
      isGmail 
        ? {
            service: "gmail",
            auth: { user: SMTP_USER, pass: SMTP_PASS },
          }
        : {
            host: SMTP_HOST,
            port: Number(SMTP_PORT),
            secure: Number(SMTP_PORT) === 465,
            auth: { user: SMTP_USER, pass: SMTP_PASS },
          }
    );

    await transporter.sendMail({
      from: `"Enoca İletişim" <${SMTP_USER}>`,
      to,
      subject,
      text: message,
    });

    return NextResponse.json({ success: true, message: "E-posta başarıyla gönderildi." });
  } catch (error: any) {
    console.error("E-posta gönderme hatası:", error);
    return NextResponse.json({ error: "E-posta gönderilemedi", details: error.message }, { status: 500 });
  }
}
