import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const WEBHOOK_URL = process.env.WEBHOOK_URL || "https://webhook.site/797424c7-1370-4372-8858-d35ba09faede";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, address, paymentMethod, items, total } = body;

    // Server-side validation
    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Họ và tên là bắt buộc." }, { status: 400 });
    }
    if (!phone || typeof phone !== "string" || phone.length < 9) {
      return NextResponse.json({ error: "Số điện thoại không hợp lệ." }, { status: 400 });
    }
    if (!address || typeof address !== "string") {
      return NextResponse.json({ error: "Địa chỉ nhận hàng là bắt buộc." }, { status: 400 });
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Giỏ hàng trống." }, { status: 400 });
    }

    const orderId = `HL-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder = {
      orderId,
      name,
      phone,
      address,
      paymentMethod,
      items: items.map((i: any) => ({
        id: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
      })),
      total,
      date: new Date().toISOString(),
    };

    // Save to JSON file
    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "orders.json");

    let orders: Array<typeof newOrder> = [];
    try {
      await fs.mkdir(dataDir, { recursive: true });
      const existing = await fs.readFile(filePath, "utf-8");
      orders = JSON.parse(existing);
    } catch {
      /* file doesn't exist yet */
    }

    orders.push(newOrder);
    await fs.writeFile(filePath, JSON.stringify(orders, null, 2));

    // Forward to webhook (fire and forget)
    try {
      fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "checkout_completed",
          data: newOrder,
        }),
      }).catch(() => {
        /* webhook failure is non-critical */
      });
    } catch {
      /* ignored */
    }

    return NextResponse.json(
      { message: "Đặt hàng thành công!", orderId },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Đã xảy ra lỗi khi xử lý thanh toán. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
