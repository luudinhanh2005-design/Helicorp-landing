"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
      style={{ background: "linear-gradient(135deg, var(--hero-gradient-from) 0%, var(--hero-gradient-to) 100%)" }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/10 dark:bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400/10 dark:bg-teal-400/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl w-full grid md:grid-cols-2 gap-10 items-center pt-20"
      >
        {/* Text content */}
        <motion.div style={{ y: textY }}>
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-accent"
          >
            Smart Pet Ecosystem
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="mt-4 text-5xl md:text-7xl font-black leading-[1.1] tracking-tight"
          >
            Smart Life
            <br />
            For Every
            <span className="text-accent"> Pet</span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed"
          >
            HeLiCorp mang đến hệ sinh thái công nghệ giúp chăm sóc thú cưng
            thông minh, tiện lợi và hiện đại hơn mỗi ngày.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="mt-8 flex flex-wrap gap-4"
          >
            <motion.a
              href="#products"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(5, 150, 105, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-accent text-accent-foreground px-8 py-4 rounded-full font-semibold text-base transition"
            >
              Explore Products
            </motion.a>

            <motion.a
              href="#features"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-border hover:border-accent px-8 py-4 rounded-full font-semibold text-base transition"
            >
              Learn More
            </motion.a>
          </motion.div>

          {/* Stats mini */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="mt-12 flex gap-8"
          >
            {[
              { value: "10+", label: "Brands" },
              { value: "50K+", label: "Customers" },
              { value: "24/7", label: "Support" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-accent">{stat.value}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Hero image with parallax */}
        <motion.div
          style={{ y: imageY }}
          className="relative flex items-center justify-center"
        >
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="relative z-10"
          >
            <Image
              src="/hero.png"
              alt="HeLiCorp Smart Pet Tech"
              width={600}
              height={600}
              priority
              className="w-full max-w-lg mx-auto drop-shadow-2xl rounded-3xl"
            />
          </motion.div>

          {/* Glowing ring behind image */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[80%] h-[80%] rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/10 dark:from-emerald-500/10 dark:to-teal-500/5 blur-2xl" />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
}