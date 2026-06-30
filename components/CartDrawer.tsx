"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import { useStore } from "@/hooks/useStore";
import { formatPrice } from "@/data/products";

export default function CartDrawer() {
  const {
    state,
    setCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
  } = useStore();

  return (
    <AnimatePresence>
      {state.isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 z-[90] w-full max-w-md bg-background border-l border-border shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-accent" />
                <h2 className="text-xl font-bold">
                  Giỏ hàng{" "}
                  <span className="text-muted-foreground text-base font-normal">
                    ({cartCount})
                  </span>
                </h2>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 rounded-full hover:bg-muted transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {state.cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
                  <p className="text-lg font-medium text-muted-foreground">
                    Giỏ hàng trống
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Hãy thêm sản phẩm bạn yêu thích!
                  </p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="mt-6 bg-accent text-accent-foreground px-6 py-2.5 rounded-full hover:bg-accent-hover transition text-sm font-medium"
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {state.cart.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="flex gap-4 rounded-2xl bg-muted/50 p-4"
                    >
                      <div className="w-20 h-20 rounded-xl bg-background flex-shrink-0 overflow-hidden">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-accent font-bold text-sm mt-1">
                          {formatPrice(item.product.price)}
                        </p>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, -1)
                              }
                              className="w-7 h-7 rounded-full bg-background border border-border flex items-center justify-center hover:bg-muted transition"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-bold w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, 1)
                              }
                              className="w-7 h-7 rounded-full bg-background border border-border flex items-center justify-center hover:bg-muted transition"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-1.5 rounded-full text-red-400 hover:bg-red-500/10 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Recently Viewed */}
                  {state.recentlyViewed.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-border">
                      <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                        Đã xem gần đây
                      </h3>
                      <div className="flex gap-3 overflow-x-auto pb-2">
                        {state.recentlyViewed.slice(0, 4).map((product) => (
                          <div
                            key={product.id}
                            className="w-16 h-16 rounded-xl bg-background border border-border flex-shrink-0 overflow-hidden"
                          >
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={64}
                              height={64}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {state.cart.length > 0 && (
              <div className="border-t border-border px-6 py-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tổng cộng:</span>
                  <span className="text-2xl font-bold text-accent">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <button className="w-full bg-accent text-accent-foreground py-4 rounded-2xl font-bold text-lg hover:bg-accent-hover transition">
                  Thanh toán
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
