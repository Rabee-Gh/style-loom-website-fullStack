import { MainButton } from "@/components/common/MainButton/MainButton";
import React from "react";

const MockCartItems = [
  {
    id: 1,
    name: "Classic Leather Jacket",
    price: 350,
    quantity: 1,
    image: "/assets/images/dress/dress-3.webp",
  },
  {
    id: 2,
    name: "Sleek Black Watch",
    price: 120,
    quantity: 2,
    image: "/assets/images/dress/dress-2.webp",
  },
];

const CartPage: React.FC = () => {
  const subtotal = MockCartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div
      className="container mx-auto px-4 py-12 rounded-[22px]
      border-2 border-dashed border-brown-60/40
    bg-brown-90 dark:bg-dark-12 dark:text-white"
    >
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {MockCartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-6 p-6 border-2
              border-dashed border-brown-60/40 dark:border-dark-15
              rounded-2xl bg-brown-100 dark:bg-dark-10
              shadow-sm transition-hover hover:shadow-md"
            >
              <div
                className="w-24 h-24 bg-gray-100 dark:bg-dark-15
              rounded-xl overflow-hidden shrink-0"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grow">
                <h3 className="text-xl font-semibold mb-1">{item.name}</h3>
                <p className="text-dark-60 dark:text-gray-400">
                  Qty: {item.quantity}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">
                  ${item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div
          className="lg:col-span-1 border-2 border-dashed border-brown-60/40 dark:border-dark-15
        rounded-3xl p-8 bg-brown-100 dark:bg-dark-10 h-fit shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-dark-60 dark:text-gray-400">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between text-dark-60 dark:text-gray-400">
              <span>Shipping</span>
              <span className="text-green-500 font-medium">Free</span>
            </div>
            <div
              className="border-2 border-dashed border-brown-60/40 dark:border-dark-15
            bg-brown-90 dark:bg-dark-12 rounded-[8px] py-4 px-2
            flex flex-row justify-between items-center text-2xl font-bold"
            >
              <span>Total</span>
              <span>${subtotal}</span>
            </div>
          </div>
          <MainButton
            cartCheckoutButton={true}
            to="/checkout"
            label="Checkout Now"
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
