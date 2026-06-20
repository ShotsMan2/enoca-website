import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    
    // Basit güvenlik - Gerçek senaryoda veritabanı veya bcrypt kontrolü yapılır.
    // Şimdilik .env'den alıyor, yoksa "admin123" kabul ediyor.
    const validPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (password === validPassword) {
      const response = NextResponse.json({ success: true });
      
      // Güvenli HTTP-Only Cookie oluştur
      response.cookies.set({
        name: "admin_session",
        value: "authenticated_" + Date.now(),
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 // 1 gün geçerli
      });

      return response;
    }

    return NextResponse.json({ error: "Hatalı şifre" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }
}
