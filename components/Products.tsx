"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Heart, ShoppingCart, Eye, X, Check } from "lucide-react";
import { products, formatPrice } from "@/data/products";
import { useStore } from "@/hooks/useStore";
import { useToast } from "./Toast";
import { useState } from "react";

export default function Products() {
  const { addToCart, toggleFavorite, isFavorite, addRecentlyViewed } =
    useStore();
  const { showToast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null);

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
              onQuickView={() => {
                setSelectedProduct(item);
                showToast(`🔍 Hành vi: Người dùng đã click xem nhanh sản phẩm ${item.name}`, "info");
              }}
            />
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Content Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative max-w-2xl w-full overflow-hidden rounded-3xl bg-background border border-border shadow-2xl z-10 grid md:grid-cols-2 max-h-[90vh] overflow-y-auto md:overflow-visible"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground transition z-20"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Column: Image */}
              <div className="bg-muted/30 p-8 flex items-center justify-center relative min-h-[220px] md:min-h-full">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  width={400}
                  height={400}
                  className="w-auto h-40 md:h-56 object-contain rounded-2xl"
                />
              </div>

              {/* Right Column: Info */}
              <div className="p-6 md:p-8 flex flex-col justify-between h-full">
                <div>
                  <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">
                    {selectedProduct.category}
                  </span>
                  
                  <h3 className="mt-4 text-2xl font-bold">{selectedProduct.name}</h3>
                  
                  <p className="mt-2 text-2xl font-extrabold text-accent">
                    {formatPrice(selectedProduct.price)}
                  </p>
                  
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    {selectedProduct.desc}
                  </p>

                  {selectedProduct.features && (
                    <div className="mt-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Tính năng nổi bật:</h4>
                      <ul className="mt-2 space-y-2">
                        {selectedProduct.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex gap-3">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      addToCart(selectedProduct);
                      showToast(`✅ Đã thêm ${selectedProduct.name} vào giỏ hàng!`, "success");
                    }}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-accent text-accent-foreground py-3.5 font-semibold text-sm hover:bg-accent-hover transition shadow-lg shadow-accent/20"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Thêm vào giỏ
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      toggleFavorite(selectedProduct.id);
                      showToast(
                        isFavorite(selectedProduct.id)
                          ? `💔 Đã bỏ yêu thích ${selectedProduct.name}`
                          : `❤️ Đã thêm ${selectedProduct.name} vào yêu thích!`,
                        "info"
                      );
                    }}
                    className="w-12 flex items-center justify-center rounded-xl border border-border hover:bg-muted transition"
                    aria-label="Toggle favorite"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isFavorite(selectedProduct.id)
                          ? "fill-red-500 text-red-500"
                          : "text-muted-foreground"
                      }`}
                    />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

interface ProductCardProps {
  item: (typeof products)[0];
  index: number;
  isFav: boolean;
  onAddToCart: () => void;
  onToggleFavorite: () => void;
  onView: () => void;
  onQuickView: () => void;
}

function ProductCard({
  item,
  index,
  isFav,
  onAddToCart,
  onToggleFavorite,
  onView,
  onQuickView,
}: ProductCardProps) {
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
          className={`h-48 w-auto object-contain rounded-2xl transition-all duration-500 group-hover:scale-105 ${
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
          onClick={onQuickView}
          className="w-12 flex items-center justify-center rounded-xl border border-border hover:bg-muted transition"
          aria-label="Quick view"
        >
          <Eye className="w-4 h-4 text-muted-foreground" />
        </motion.button>
      </div>
    </motion.div>
  );
}