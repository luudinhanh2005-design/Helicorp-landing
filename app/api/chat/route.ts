import { NextResponse } from "next/server";

const productKnowledge: Record<string, string> = {
  "petkit smart feeder": "PETKIT Smart Feeder là máy cho ăn tự động thông minh, điều khiển qua App, lên lịch bữa ăn chính xác, dung tích 3L. Giá: 2.990.000₫.",
  "petree litter box": "PETREE Litter Box là máy vệ sinh mèo tự động, tự dọn dẹp sau 5 phút, có hệ thống khử mùi tiên tiến. Giá: 8.990.000₫.",
  "petkit water fountain": "PETKIT Water Fountain là máy lọc nước tuần hoàn 3 lớp lọc, siêu yên tĩnh, khuyến khích thú cưng uống nhiều nước hơn. Giá: 1.490.000₫.",
  "neakasa grooming": "NEAKASA Grooming Kit bao gồm máy hút lông + 5 đầu cắt tỉa chuyên nghiệp, công suất hút 13000Pa, an toàn cho thú cưng. Giá: 1.990.000₫.",
};

function getAIResponse(message: string): string {
  const lower = message.toLowerCase().trim();

  // Greetings
  if (lower.match(/^(hi|hello|xin chào|chào|hey)/)) {
    return "Xin chào! 👋 Tôi là trợ lý ảo của HeLiCorp. Tôi có thể giúp bạn tìm hiểu về các sản phẩm công nghệ chăm sóc thú cưng. Bạn muốn biết về sản phẩm nào?";
  }

  // Product queries
  for (const [key, value] of Object.entries(productKnowledge)) {
    if (lower.includes(key.split(" ")[0]) || lower.includes(key)) {
      return value;
    }
  }

  // Pricing questions
  if (lower.includes("giá") || lower.includes("bao nhiêu") || lower.includes("price")) {
    return "📋 Bảng giá sản phẩm:\n• PETKIT Smart Feeder: 2.990.000₫\n• PETREE Litter Box: 8.990.000₫\n• PETKIT Water Fountain: 1.490.000₫\n• NEAKASA Grooming Kit: 1.990.000₫\n\nBạn muốn tìm hiểu thêm về sản phẩm nào?";
  }

  // Shipping
  if (lower.includes("giao hàng") || lower.includes("ship") || lower.includes("vận chuyển")) {
    return "🚚 HeLiCorp hỗ trợ giao hàng toàn quốc:\n• Nội thành HCM/HN: 1-2 ngày\n• Tỉnh thành khác: 3-5 ngày\n• Miễn phí giao hàng cho đơn từ 2.000.000₫";
  }

  // Warranty
  if (lower.includes("bảo hành") || lower.includes("warranty")) {
    return "🛡️ Chính sách bảo hành HeLiCorp:\n• Bảo hành chính hãng 12 tháng\n• Đổi mới trong 7 ngày nếu lỗi từ nhà sản xuất\n• Hỗ trợ kỹ thuật 24/7";
  }

  // Brand info
  if (lower.includes("helicorp") || lower.includes("công ty") || lower.includes("about")) {
    return "🏢 HeLiCorp là nhà phân phối chính hãng các thương hiệu công nghệ thú cưng hàng đầu thế giới tại Việt Nam, bao gồm PETKIT, PETREE, NEAKASA, HELIPET và MAX CLEAN. Chúng tôi cam kết mang đến giải pháp chăm sóc thú cưng thông minh nhất.";
  }

  // Contact
  if (lower.includes("liên hệ") || lower.includes("contact") || lower.includes("hotline")) {
    return "📞 Liên hệ HeLiCorp:\n• Hotline: 1900-xxxx\n• Email: support@helicorp.vn\n• Facebook: fb.com/helicorp\nHoặc bạn có thể đăng ký nhận tin ở cuối trang!";
  }

  // Default
  return "Cảm ơn bạn đã quan tâm! 😊 Tôi có thể giúp bạn tìm hiểu về:\n• Sản phẩm (Feeder, Litter Box, Water Fountain, Grooming Kit)\n• Bảng giá\n• Giao hàng & Bảo hành\n• Thông tin HeLiCorp\n\nHãy hỏi tôi bất cứ điều gì!";
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Simulate slight delay for realism
    await new Promise((resolve) => setTimeout(resolve, 500));

    const reply = getAIResponse(message);

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
