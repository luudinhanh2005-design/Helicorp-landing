"use client";

import { motion } from "framer-motion";

const brands = ["PETKIT", "NEAKASA", "PETREE", "HELIPET", "MAX CLEAN"];

export default function Brands() {
  return (
    <section className="bg-background py-20 border-y border-border" id="features">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Trusted Partners
          </p>
          <h2 className="mt-3 text-4xl font-bold">
            Trusted Global Brands
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            HeLiCorp hợp tác cùng những thương hiệu công nghệ thú cưng hàng đầu
            thế giới.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
          {brands.map((brand, i) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
              }}
              className="rounded-2xl border border-border bg-card p-8 text-center font-bold text-lg shadow-sm transition cursor-default"
            >
              {brand}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}