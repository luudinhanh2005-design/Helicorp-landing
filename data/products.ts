export interface Product {
  id: string;
  name: string;
  image: string;
  desc: string;
  price: number;
  category: string;
  features?: string[];
}

export const products: Product[] = [
  {
    id: "petkit-feeder",
    name: "PETKIT Smart Feeder",
    image: "/feeder.webp",
    desc: "Máy cho ăn tự động điều khiển bằng App, lên lịch bữa ăn chính xác cho thú cưng.",
    price: 2990000,
    category: "Feeding",
    features: [
      "Kết nối Wi-Fi 2.4GHz & Điều khiển từ xa qua App di động",
      "Dung lượng bình chứa 3L thiết kế khóa 3 lớp chống ẩm mốc",
      "Hệ thống chống kẹt hạt thông minh thích hợp nhiều cỡ hạt",
      "Hỗ trợ lắp pin dự phòng, hoạt động bình thường khi mất điện"
    ]
  },
  {
    id: "petree-litter",
    name: "PETREE Litter Box",
    image: "/litter.webp",
    desc: "Máy vệ sinh mèo tự động khử mùi, tự dọn dẹp sau mỗi lần sử dụng.",
    price: 8990000,
    category: "Cleaning",
    features: [
      "Hệ thống cảm biến hồng ngoại & cảm biến trọng lượng bảo vệ mèo",
      "Khử mùi hiệu quả bằng công nghệ Ozone và màng lọc carbon active",
      "Thể tích hộp chứa chất thải lớn lên tới 4L sử dụng tới 7 ngày",
      "Thiết kế hình cầu sang trọng, phù hợp cho mèo từ 1.5kg đến 10kg"
    ]
  },
  {
    id: "petkit-fountain",
    name: "PETKIT Water Fountain",
    image: "/fountain.webp",
    desc: "Máy lọc nước tuần hoàn cho thú cưng luôn có nguồn nước sạch và tươi mát.",
    price: 1490000,
    category: "Hydration",
    features: [
      "Hệ thống lọc tuần hoàn 3 lớp loại bỏ cặn bẩn, lông và kim loại nặng",
      "Thiết kế tách rời bình chứa nước giúp chống rò rỉ điện thông minh",
      "Vận hành siêu êm ái dưới 30dB, không ảnh hưởng giấc ngủ của bạn",
      "Đèn LED thông minh cảnh báo mực nước thấp và nhắc thay lõi lọc"
    ]
  },
  {
    id: "neakasa-grooming",
    name: "NEAKASA Grooming Kit",
    image: "/grooming.webp",
    desc: "Bộ chăm sóc lông và móng chuyên nghiệp tại nhà, an toàn và hiệu quả.",
    price: 1990000,
    category: "Grooming",
    features: [
      "Hút bụi lông trực tiếp khi đang chải, giữ nhà cửa luôn sạch sẽ",
      "Trang bị 5 đầu dụng cụ đi kèm đa năng cho các nhu cầu chải, tỉa, hút lông",
      "Lực hút mạnh mẽ lên tới 9000Pa hút sạch 99% tế bào chết và lông rụng",
      "Độ ồn thấp (dưới 52dB) với 3 mức tùy chỉnh, không làm thú cưng hoảng sợ"
    ]
  },
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

