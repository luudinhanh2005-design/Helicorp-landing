"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2, User, Phone, Home, CreditCard, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useStore } from "@/hooks/useStore";
import { formatPrice } from "@/data/products";
import { useToast } from "./Toast";

export default function CartDrawer() {
  const {
    state,
    setCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  } = useStore();

  const { showToast } = useToast();
  
  // Checkout Form States
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "BankTransfer">("COD");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<{ orderId: string } | null>(null);

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      showToast("Vui lòng nhập họ tên nhận hàng.", "error");
      return;
    }
    if (!phone.trim() || phone.length < 9) {
      showToast("Vui lòng nhập số điện thoại hợp lệ.", "error");
      return;
    }
    if (!address.trim()) {
      showToast("Vui lòng nhập địa chỉ nhận hàng.", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          address,
          paymentMethod,
          items: state.cart,
          total: cartTotal,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setOrderSuccess({ orderId: data.orderId });
        showToast(`🎉 Hành vi: Người dùng đặt hàng thành công. Mã: ${data.orderId}`, "success");
      } else {
        showToast(data.error || "Có lỗi xảy ra.", "error");
      }
    } catch {
      showToast("Không thể kết nối đến máy chủ.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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
                  <button
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full bg-accent text-accent-foreground py-4 rounded-2xl font-bold text-lg hover:bg-accent-hover transition"
                  >
                    Thanh toán
                  </button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!isSubmitting && !orderSuccess) setIsCheckoutOpen(false);
              }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl bg-background border border-border shadow-2xl z-10 max-h-[90vh] flex flex-col"
            >
              {/* Close button if not submitting/completed */}
              {!isSubmitting && !orderSuccess && (
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-muted/80 hover:bg-muted text-muted-foreground transition z-20"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {orderSuccess ? (
                /* Success Screen */
                <div className="p-6 overflow-y-auto flex flex-col items-center text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <CheckCircle className="w-12 h-12 text-emerald-500 mb-3" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold">Đặt Hàng Thành Công!</h3>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Cảm ơn bạn đã lựa chọn hệ sinh thái thông minh HeLiCorp.
                  </p>

                  <div className="mt-4 p-3.5 bg-muted/50 rounded-2xl w-full border border-border text-left space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mã đơn hàng:</span>
                      <strong className="text-accent">{orderSuccess.orderId}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tổng thanh toán:</span>
                      <strong className="text-foreground">{formatPrice(cartTotal)}</strong>
                    </div>
                  </div>

                  {paymentMethod === "BankTransfer" ? (
                    <div className="mt-4 flex flex-col items-center w-full">
                      <p className="text-[11px] font-semibold text-muted-foreground mb-2">
                        Quét mã QR bằng ứng dụng Ngân hàng của bạn:
                      </p>
                      
                      <div className="p-3 bg-white rounded-xl shadow-md border border-gray-200">
                        {/* Real VietQR image representation */}
                        <img
                          src={`https://img.vietqr.io/image/MB-190203040506-compact2.png?amount=${cartTotal}&addInfo=Thanh%20toan%20don%20hang%20${orderSuccess.orderId}&accountName=HELI%20CORP`}
                          alt="VietQR MB Bank HELI CORP"
                          className="w-40 h-40 object-contain block"
                        />
                      </div>
                      
                      <div className="mt-3 text-[11px] text-left space-y-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 p-3.5 rounded-xl border border-amber-500/20 w-full">
                        <p><strong>Ngân hàng:</strong> MB Bank (Ngoại Thương Quân Đội)</p>
                        <p><strong>Số tài khoản:</strong> 190203040506</p>
                        <p><strong>Chủ tài khoản:</strong> HELI CORP</p>
                        <p><strong>Nội dung CK:</strong> Thanh toan don hang {orderSuccess.orderId}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 p-3.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] rounded-xl border border-emerald-500/20 w-full text-left">
                      <p>Phương thức: <strong>Thanh toán khi nhận hàng (COD)</strong>.</p>
                      <p className="mt-1">Nhân viên CSKH của HeLiCorp sẽ sớm liên hệ với bạn qua số điện thoại <strong>{phone}</strong> để xác nhận địa chỉ giao hàng.</p>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      clearCart();
                      setOrderSuccess(null);
                      setIsCheckoutOpen(false);
                      setCartOpen(false);
                      // Reset fields
                      setName("");
                      setPhone("");
                      setAddress("");
                    }}
                    className="mt-6 w-full bg-accent text-accent-foreground py-3.5 rounded-xl font-bold text-sm hover:bg-accent-hover transition shadow-md shadow-accent/15"
                  >
                    Hoàn thành & Tiếp tục mua sắm
                  </button>
                </div>
              ) : (
                /* Checkout Form */
                <form onSubmit={handleCheckoutSubmit} className="flex flex-col h-full overflow-y-auto">
                  <div className="p-6 md:p-8 flex-1">
                    <h3 className="text-xl font-bold">Thông tin nhận hàng</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Vui lòng cung cấp chính xác thông tin để chúng tôi vận chuyển.
                    </p>

                    <div className="mt-5 space-y-3.5">
                      {/* Name input */}
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Họ và tên</label>
                        <div className="mt-1 relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nguyễn Văn A"
                            className="w-full bg-muted/50 border border-border focus:border-accent focus:ring-1 focus:ring-accent rounded-xl pl-10 pr-4 py-2.5 text-xs transition outline-none"
                          />
                        </div>
                      </div>

                      {/* Phone input */}
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Số điện thoại</label>
                        <div className="mt-1 relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="0987654321"
                            className="w-full bg-muted/50 border border-border focus:border-accent focus:ring-1 focus:ring-accent rounded-xl pl-10 pr-4 py-2.5 text-xs transition outline-none"
                          />
                        </div>
                      </div>

                      {/* Address input */}
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Địa chỉ nhận hàng</label>
                        <div className="mt-1 relative">
                          <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                            type="text"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Số nhà, tên đường, phường/xã..."
                            className="w-full bg-muted/50 border border-border focus:border-accent focus:ring-1 focus:ring-accent rounded-xl pl-10 pr-4 py-2.5 text-xs transition outline-none"
                          />
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Phương thức thanh toán</label>
                        <div className="mt-1.5 grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setPaymentMethod("COD")}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition ${
                              paymentMethod === "COD"
                                ? "border-accent bg-accent/5 text-accent font-semibold"
                                : "border-border hover:bg-muted text-muted-foreground"
                            }`}
                          >
                            <span className="text-xs">COD</span>
                            <span className="text-[9px] opacity-75 mt-0.5">Khi nhận hàng</span>
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => setPaymentMethod("BankTransfer")}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition ${
                              paymentMethod === "BankTransfer"
                                ? "border-accent bg-accent/5 text-accent font-semibold"
                                : "border-border hover:bg-muted text-muted-foreground"
                            }`}
                          >
                            <CreditCard className="w-3.5 h-3.5 mb-0.5 text-current" />
                            <span className="text-xs">Chuyển khoản</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-border p-6 bg-muted/20 space-y-3.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Tổng thanh toán:</span>
                      <span className="text-lg font-bold text-accent">
                        {formatPrice(cartTotal)}
                      </span>
                    </div>

                    <div className="flex gap-2.5">
                      <button
                        type="button"
                        onClick={() => setIsCheckoutOpen(false)}
                        className="flex-1 border border-border py-2.5 rounded-xl hover:bg-muted font-semibold text-xs transition text-center"
                      >
                        Quay lại
                      </button>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-accent text-accent-foreground py-2.5 rounded-xl hover:bg-accent-hover font-bold text-xs transition flex items-center justify-center gap-1.5"
                      >
                        {isSubmitting ? (
                          <div className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                        ) : (
                          "Xác nhận"
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
