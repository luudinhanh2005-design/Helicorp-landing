"use client";

import { useEffect, useRef } from "react";
import { useToast } from "./Toast";

export default function AnalyticsTracker() {
  const { showToast } = useToast();
  const milestones = useRef(new Set<number>());
  const showToastRef = useRef(showToast);
  showToastRef.current = showToast;

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const percent = Math.round((window.scrollY / scrollHeight) * 100);

      if (percent >= 50 && !milestones.current.has(50)) {
        milestones.current.add(50);
        showToastRef.current(
          "🔥 Bạn đã khám phá 50% trang! Tiếp tục cuộn để xem thêm sản phẩm.",
          "info"
        );
      }
      if (percent >= 95 && !milestones.current.has(100)) {
        milestones.current.add(100);
        showToastRef.current(
          "🎉 Bạn đã xem hết trang! Đăng ký ngay để nhận ưu đãi đặc biệt.",
          "success"
        );
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest("button");
      const link = target.closest("a");
      if (button || link) {
        const text =
          button?.textContent?.trim() || link?.textContent?.trim() || "";
        if (text) {
          console.log(
            `[Analytics] User interaction: "${text}" at ${new Date().toISOString()}`
          );
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
