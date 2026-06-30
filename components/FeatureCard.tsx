"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

interface Props {
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
}

export default function FeatureCard({
  title,
  description,
  image,
  reverse = false,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="py-20 overflow-hidden"
    >
      <div
        className={`mx-auto grid max-w-7xl items-center gap-12 px-6 md:gap-16 md:grid-cols-2 ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Image */}
        <motion.div
          style={{ y: imageY }}
          initial={{ x: reverse ? 80 : -80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative rounded-3xl bg-muted overflow-hidden shadow-xl aspect-square w-full"
        >
          {/* Skeleton placeholder */}
          {!imageLoaded && (
            <div className="skeleton absolute inset-0 rounded-2xl" />
          )}
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={`object-cover transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Decorative accent */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl pointer-events-none" />
        </motion.div>

        {/* Text */}
        <motion.div
          style={{ y: textY }}
          initial={{ x: reverse ? -80 : 80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Smart Pet Technology
          </p>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold leading-tight">
            {title}
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {description}
          </p>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(5, 150, 105, 0.25)" }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 rounded-full bg-accent px-7 py-3.5 text-accent-foreground font-semibold transition hover:bg-accent-hover"
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}