"use client";

import { motion } from "framer-motion";
import { ShoppingCart, User, Search } from "lucide-react";

import Container from "../ui/Container";

export default function Header() {
  return (
    <motion.header
      initial={{
        opacity: 0,
        y: -25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="border-b bg-white"
    >
      <Container>
        <div className="flex h-20 items-center justify-between">
          <h1 className="text-3xl font-black text-red-500">NextShop</h1>

          <div className="flex w-full max-w-xl items-center rounded-xl border bg-gray-50 px-4">
            <Search size={20} className="text-gray-500" />

            <input
              placeholder="جستجوی محصولات..."
              className="h-12 w-full bg-transparent px-3 outline-none"
            />
          </div>

          <div className="flex items-center gap-5">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <User />
            </motion.button>
          </div>
        </div>
      </Container>
    </motion.header>
  );
}
