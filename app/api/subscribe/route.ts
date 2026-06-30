import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const WEBHOOK_URL = "https://webhook.site/unique-id"; // Replace with actual webhook URL

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email } = body;

    // Server-side validation
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email là bắt buộc." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email không hợp lệ." },
        { status: 400 }
      );
    }

    if (name && (typeof name !== "string" || name.length > 100)) {
      return NextResponse.json(
        { error: "Tên không hợp lệ." },
        { status: 400 }
      );
    }

    // Save to JSON file
    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "subscribers.json");

    let subscribers: Array<{ name: string; email: string; date: string }> = [];
    try {
      await fs.mkdir(dataDir, { recursive: true });
      const existing = await fs.readFile(filePath, "utf-8");
      subscribers = JSON.parse(existing);
    } catch {
      /* file doesn't exist yet */
    }

    // Check duplicate
    if (subscribers.some((s) => s.email === email)) {
      return NextResponse.json(
        { error: "Email này đã được đăng ký." },
        { status: 409 }
      );
    }

    const newSubscriber = {
      name: name || "",
      email,
      date: new Date().toISOString(),
    };
    subscribers.push(newSubscriber);

    await fs.writeFile(filePath, JSON.stringify(subscribers, null, 2));

    // Forward to webhook (fire and forget)
    try {
      fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSubscriber),
      }).catch(() => {
        /* webhook failure is non-critical */
      });
    } catch {
      /* ignored */
    }

    return NextResponse.json(
      { message: "Đăng ký thành công! Cảm ơn bạn." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Đã xảy ra lỗi. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
