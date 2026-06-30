"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { products, formatPrice } from "@/data/products";
import { useStore } from "@/hooks/useStore";
import { useToast } from "./Toast";
import { useState } from "react";

export default function Products() {
  const { addToCart, toggleFavorite, isFavorite, addRecentlyViewed } =
    useStore();
  const { showToast } = useToast();

  return (
    <section id="products" className="bg-muted/50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Our Products
          </p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">
            Featured Products
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Những sản phẩm nổi bật đang được phân phối bởi HeLiCorp.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((item, i) => (
            <ProductCard
              key={item.id}
              item={item}
              index={i}
              isFav={isFavorite(item.id)}
              onAddToCart={() => {
                addToCart(item);
                showToast(
                  `✅ Đã thêm ${item.name} vào giỏ hàng!`,
                  "success"
                );
              }}
              onToggleFavorite={() => {
                toggleFavorite(item.id);
                showToast(
                  isFavorite(item.id)
                    ? `💔 Đã bỏ yêu thích ${item.name}`
                    : `❤️ Đã thêm ${item.name} vào yêu thích!`,
                  "info"
                );
              }}
              onView={() => addRecentlyViewed(item)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  item,
  index,
  isFav,
  onAddToCart,
  onToggleFavorite,
  onView,
}: {
  item: (typeof products)[0];
  index: number;
  isFav: boolean;
  onAddToCart: () => void;
  onToggleFavorite: () => void;
  onView: () => void;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onViewportEnter={onView}
      className="group relative rounded-3xl bg-card border border-border p-6 shadow-sm transition-shadow hover:shadow-2xl"
    >
      {/* Favorite button */}
      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={onToggleFavorite}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-sm hover:bg-muted transition"
        aria-label="Toggle favorite"
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            isFav
              ? "fill-red-500 text-red-500"
              : "text-muted-foreground"
          }`}
        />
      </motion.button>

      {/* Image */}
      <div className="relative h-52 flex items-center justify-center">
        {!imageLoaded && (
          <div className="skeleton w-40 h-40 rounded-xl" />
        )}
        <Image
          src={item.image}
          alt={item.name}
          width={400}
          height={400}
          className={`h-48 w-auto object-contain transition-all duration-500 group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* Category badge */}
      <span className="inline-block mt-4 text-xs font-medium uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">
        {item.category}
      </span>

      <h3 className="mt-3 text-lg font-bold">{item.name}</h3>

      <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
        {item.desc}
      </p>

      <p className="mt-3 text-xl font-bold text-accent">
        {formatPrice(item.price)}
      </p>

      {/* Actions */}
      <div className="mt-4 flex gap-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onAddToCart}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-accent text-accent-foreground py-3 font-semibold text-sm hover:bg-accent-hover transition"
        >
          <ShoppingCart className="w-4 h-4" />
          Thêm vào giỏ
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-12 flex items-center justify-center rounded-xl border border-border hover:bg-muted transition"
          aria-label="Quick view"
        >
          <Eye className="w-4 h-4 text-muted-foreground" />
        </motion.button>
      </div>
    </motion.div>
  );
}