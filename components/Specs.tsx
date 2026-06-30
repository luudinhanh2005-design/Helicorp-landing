"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Globe, Users, Handshake, Headset } from "lucide-react";

function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));

      if (progress >= 1) clearInterval(timer);
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  {
    icon: Globe,
    value: 10,
    suffix: "+",
    label: "Global Brands",
    desc: "Thương hiệu quốc tế uy tín",
  },
  {
    icon: Users,
    value: 50,
    suffix: "K+",
    label: "Customers",
    desc: "Khách hàng tin tưởng sử dụng",
  },
  {
    icon: Handshake,
    value: 100,
    suffix: "+",
    label: "Partners",
    desc: "Đối tác phân phối trên cả nước",
  },
  {
    icon: Headset,
    value: 24,
    suffix: "/7",
    label: "Support",
    desc: "Hỗ trợ kỹ thuật mọi lúc",
  },
];

export default function Specs() {
  return (
    <section id="specs" className="py-24 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Why Choose Us
          </p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">
            Why Choose HeLiCorp
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Con số nói lên tất cả — HeLiCorp là đối tác đáng tin cậy cho mọi
            nhu cầu chăm sóc thú cưng.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8 text-center transition-all hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5"
            >
              <div className="mx-auto w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition">
                <stat.icon className="w-7 h-7 text-accent" />
              </div>

              <h3 className="text-4xl md:text-5xl font-bold text-accent">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                />
              </h3>

              <p className="mt-2 font-semibold text-lg">{stat.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}