import React, { useState } from "react";
import { Link } from "react-router-dom";

const MockCartItems = [
  {
    id: 1,
    name: "Classic Leather Jacket",
    price: 350,
    quantity: 1,
    image: "/assets/images/products/product1.png",
  },
  {
    id: 2,
    name: "Sleek Black Watch",
    price: 120,
    quantity: 2,
    image: "/assets/images/products/product2.png",
  },
];

const CheckoutPage: React.FC = () => {
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const subtotal = MockCartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shippingCost = shippingMethod === "express" ? 25 : 0;
  const total = subtotal + shippingCost;

  return (
    <div className="container mx-auto px-4 py-12 dark:text-white">
      {/* CART PAGE PATH + PAGE TITLE */}
      <div className="mb-8">
        <nav className="flex text-sm text-dark-60 dark:text-gray-400 mb-4">
          <Link
            to="/cart"
            className="hover:text-secondary transition-colors text-dark-12 dark:text-white/60"
          >
            Cart
          </Link>
          <span className="mx-2">/</span>
          <span className="text-secondary font-medium">Checkout</span>
        </nav>

        <h1 className="text-4xl font-bold">Checkout</h1>
      </div>

      {/* FROM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT COLUMN: FORMS */}
        <div className="lg:col-span-8 space-y-10">
          {/* SHIPPING INFORMATION */}
          <section className="bg-white dark:bg-dark-12 p-8 rounded-3xl border dark:border-dark-15 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center text-sm">
                1
              </span>
              Shipping Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-60 dark:text-gray-400">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full px-4 py-3 rounded-xl border dark:border-dark-15 dark:bg-dark-10 focus:ring-2 focus:ring-secondary outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-60 dark:text-gray-400">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full px-4 py-3 rounded-xl border dark:border-dark-15 dark:bg-dark-10 focus:ring-2 focus:ring-secondary outline-none transition-all"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-dark-60 dark:text-gray-400">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl border dark:border-dark-15 dark:bg-dark-10 focus:ring-2 focus:ring-secondary outline-none transition-all"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-dark-60 dark:text-gray-400">
                  Street Address
                </label>
                <input
                  type="text"
                  placeholder="123 Luxury Ave"
                  className="w-full px-4 py-3 rounded-xl border dark:border-dark-15 dark:bg-dark-10 focus:ring-2 focus:ring-secondary outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-60 dark:text-gray-400">
                  City
                </label>
                <input
                  type="text"
                  placeholder="Milan"
                  className="w-full px-4 py-3 rounded-xl border dark:border-dark-15 dark:bg-dark-10 focus:ring-2 focus:ring-secondary outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-60 dark:text-gray-400">
                  Postal Code
                </label>
                <input
                  type="text"
                  placeholder="20121"
                  className="w-full px-4 py-3 rounded-xl border dark:border-dark-15 dark:bg-dark-10 focus:ring-2 focus:ring-secondary outline-none transition-all"
                />
              </div>
            </div>
          </section>

          {/* Shipping Method */}
          <section className="bg-white dark:bg-dark-12 p-8 rounded-3xl border dark:border-dark-15 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center text-sm">
                2
              </span>
              Shipping Method
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label
                className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  shippingMethod === "standard"
                    ? "border-secondary bg-secondary/5"
                    : "border-gray-100 dark:border-dark-15 hover:border-secondary/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === "standard"}
                    onChange={() => setShippingMethod("standard")}
                    className="accent-secondary w-5 h-5"
                  />
                  <div>
                    <p className="font-bold">Standard Shipping</p>
                    <p className="text-sm text-dark-60 dark:text-gray-400">
                      3-5 business days
                    </p>
                  </div>
                </div>
                <span className="font-bold">Free</span>
              </label>
              <label
                className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  shippingMethod === "express"
                    ? "border-secondary bg-secondary/5"
                    : "border-gray-100 dark:border-dark-15 hover:border-secondary/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === "express"}
                    onChange={() => setShippingMethod("express")}
                    className="accent-secondary w-5 h-5"
                  />
                  <div>
                    <p className="font-bold">Express Shipping</p>
                    <p className="text-sm text-dark-60 dark:text-gray-400">
                      1-2 business days
                    </p>
                  </div>
                </div>
                <span className="font-bold">$25</span>
              </label>
            </div>
          </section>

          {/* Payment Method */}
          <section className="bg-white dark:bg-dark-12 p-8 rounded-3xl border dark:border-dark-15 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center text-sm">
                3
              </span>
              Payment Method
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`flex-1 py-3 rounded-xl border-2 font-medium transition-all ${
                    paymentMethod === "card"
                      ? "border-secondary bg-secondary/5 text-secondary"
                      : "border-gray-100 dark:border-dark-15 hover:border-secondary/30"
                  }`}
                >
                  Credit Card
                </button>
                <button
                  onClick={() => setPaymentMethod("paypal")}
                  className={`flex-1 py-3 rounded-xl border-2 font-medium transition-all ${
                    paymentMethod === "paypal"
                      ? "border-secondary bg-secondary/5 text-secondary"
                      : "border-gray-100 dark:border-dark-15 hover:border-secondary/30"
                  }`}
                >
                  PayPal
                </button>
              </div>

              {paymentMethod === "card" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-dark-60 dark:text-gray-400">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      className="w-full px-4 py-3 rounded-xl border dark:border-dark-15 dark:bg-dark-10 focus:ring-2 focus:ring-secondary outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-dark-60 dark:text-gray-400">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 rounded-xl border dark:border-dark-15 dark:bg-dark-10 focus:ring-2 focus:ring-secondary outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-dark-60 dark:text-gray-400">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3 rounded-xl border dark:border-dark-15 dark:bg-dark-10 focus:ring-2 focus:ring-secondary outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === "paypal" && (
                <div className="p-8 border-2 border-dashed border-gray-200 dark:border-dark-15 rounded-2xl text-center">
                  <p className="text-dark-60 dark:text-gray-400 mb-4">
                    You will be redirected to PayPal to complete your purchase
                    securely.
                  </p>
                  <button className="bg-[#0070ba] text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity">
                    Proceed with PayPal
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
          <div className="bg-white dark:bg-dark-12 p-8 rounded-3xl border dark:border-dark-15 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
              {MockCartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-50 dark:bg-dark-10 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grow">
                    <h4 className="font-semibold text-sm line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-xs text-dark-60 dark:text-gray-400">
                      Qty: {item.quantity}
                    </p>
                    <p className="font-bold text-sm">
                      ${item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t dark:border-dark-15 space-y-4">
              <div className="flex justify-between text-dark-60 dark:text-gray-400">
                <span>Subtotal</span>
                <span className="font-semibold text-dark-12 dark:text-white">
                  ${subtotal}
                </span>
              </div>
              <div className="flex justify-between text-dark-60 dark:text-gray-400">
                <span>Shipping</span>
                <span
                  className={`font-semibold ${
                    shippingCost === 0
                      ? "text-green-500"
                      : "text-dark-12 dark:text-white"
                  }`}
                >
                  {shippingCost === 0 ? "Free" : `$${shippingCost}`}
                </span>
              </div>

              <div className="py-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo Code"
                    className="grow px-4 py-2 rounded-lg border dark:border-dark-15 dark:bg-dark-10 text-sm focus:ring-1 focus:ring-secondary outline-none"
                  />
                  <button className="bg-dark-12 dark:bg-white dark:text-dark-12 text-white px-4 py-2 rounded-lg text-sm font-bold hover:opacity-80 transition-opacity">
                    Apply
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t dark:border-dark-15 flex justify-between items-center text-xl font-bold">
                <span>Total</span>
                <span className="text-2xl text-secondary">${total}</span>
              </div>

              <button className="w-full bg-secondary text-white py-4 rounded-2xl font-bold text-lg mt-6 shadow-lg shadow-secondary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                Complete Order
              </button>
              <p className="text-[10px] text-center text-dark-60 dark:text-gray-500 mt-4 leading-relaxed">
                By clicking "Complete Order", you agree to our Terms of Service
                and Privacy Policy. Secure SSL encrypted payment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
