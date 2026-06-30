"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "./Toast";

export default function Newsletter() {
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (name && name.length > 100) {
      newErrors.name = "Tên không được quá 100 ký tự.";
    }

    if (!email.trim()) {
      newErrors.email = "Vui lòng nhập email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email không hợp lệ.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (res.ok) {
        showToast(data.message || "Đăng ký thành công!", "success");
        setName("");
        setEmail("");
        setErrors({});
      } else {
        showToast(data.error || "Đã xảy ra lỗi.", "error");
      }
    } catch {
      showToast("Không thể kết nối server. Vui lòng thử lại.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 dark:from-emerald-900 dark:via-teal-900 dark:to-cyan-950" />

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-2xl text-center px-6"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">
          Newsletter
        </p>

        <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">
          Stay Updated
        </h2>

        <p className="mt-5 text-emerald-100 text-lg">
          Đăng ký để nhận thông tin sớm nhất về các sản phẩm mới và ưu đãi đặc
          biệt từ HeLiCorp.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-4"
          noValidate
        >
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Tên của bạn (tùy chọn)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl px-5 py-4 bg-white/15 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 outline-none focus:ring-2 focus:ring-white/40 transition"
                id="newsletter-name"
              />
              {errors.name && (
                <p className="mt-1 text-left text-xs text-red-200">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="flex-1">
              <input
                type="email"
                placeholder="Email của bạn *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full rounded-xl px-5 py-4 bg-white/15 backdrop-blur-sm border text-white placeholder:text-white/60 outline-none focus:ring-2 focus:ring-white/40 transition ${
                  errors.email ? "border-red-300" : "border-white/20"
                }`}
                id="newsletter-email"
                required
              />
              {errors.email && (
                <p className="mt-1 text-left text-xs text-red-200">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full md:w-auto rounded-xl bg-white text-emerald-700 font-bold px-10 py-4 hover:bg-emerald-50 transition disabled:opacity-60 disabled:cursor-not-allowed text-base"
            id="newsletter-submit"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                Đang gửi...
              </span>
            ) : (
              "Đăng ký nhận tin"
            )}
          </motion.button>
        </form>

        <p className="mt-4 text-xs text-emerald-200/70">
          Chúng tôi tôn trọng quyền riêng tư của bạn. Hủy đăng ký bất cứ lúc
          nào.
        </p>
      </motion.div>
    </section>
  );
}