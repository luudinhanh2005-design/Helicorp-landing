export interface Product {
  id: string;
  name: string;
  image: string;
  desc: string;
  price: number;
  category: string;
}

export const products: Product[] = [
  {
    id: "petkit-feeder",
    name: "PETKIT Smart Feeder",
    image: "/feeder.webp",
    desc: "Máy cho ăn tự động điều khiển bằng App, lên lịch bữa ăn chính xác cho thú cưng.",
    price: 2990000,
    category: "Feeding",
  },
  {
    id: "petree-litter",
    name: "PETREE Litter Box",
    image: "/litter.webp",
    desc: "Máy vệ sinh mèo tự động khử mùi, tự dọn dẹp sau mỗi lần sử dụng.",
    price: 8990000,
    category: "Cleaning",
  },
  {
    id: "petkit-fountain",
    name: "PETKIT Water Fountain",
    image: "/fountain.webp",
    desc: "Máy lọc nước tuần hoàn cho thú cưng luôn có nguồn nước sạch và tươi mát.",
    price: 1490000,
    category: "Hydration",
  },
  {
    id: "neakasa-grooming",
    name: "NEAKASA Grooming Kit",
    image: "/grooming.webp",
    desc: "Bộ chăm sóc lông và móng chuyên nghiệp tại nhà, an toàn và hiệu quả.",
    price: 1990000,
    category: "Grooming",
  },
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}
