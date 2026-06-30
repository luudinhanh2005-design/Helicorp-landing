import FeatureCard from "./FeatureCard";

export default function Features() {
  return (
    <>
      <FeatureCard
        title="Smart Feeding"
        description="Lên lịch cho ăn tự động, điều khiển từ xa qua ứng dụng và đảm bảo thú cưng luôn được cung cấp bữa ăn đúng giờ."
        image="/feeder.webp"
      />

      <FeatureCard
        title="Automatic Cleaning"
        description="Máy vệ sinh mèo tự động giúp giữ khay cát sạch sẽ, giảm mùi và tiết kiệm thời gian cho người nuôi."
        image="/litter.webp"
        reverse
      />

      <FeatureCard
        title="Fresh Water Anytime"
        description="Máy lọc nước tuần hoàn khuyến khích thú cưng uống nhiều nước hơn với nguồn nước luôn sạch."
        image="/fountain.webp"
      />

      <FeatureCard
        title="Professional Grooming"
        description="Chăm sóc lông và móng ngay tại nhà với thiết bị hút lông và cắt tỉa an toàn."
        image="/grooming.webp"
        reverse
      />
    </>
  );
}