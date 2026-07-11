"use client";

import { motion } from "framer-motion";

import Container from "../ui/Container";

export default function Footer() {
  return (
    <motion.footer
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      viewport={{
        once: true,
      }}
      className="mt-24 border-t bg-white"
    >
      <Container>
        <div className="flex h-40 items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">NextShop</h3>

            <p className="mt-3 text-gray-500">Modern Ecommerce Experience</p>
          </div>

          <div className="text-gray-500">© 2026 NextShop</div>
        </div>
      </Container>
    </motion.footer>
  );
}
