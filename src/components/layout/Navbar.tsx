"use client";

import { motion } from "framer-motion";

import Container from "../ui/Container";

const links = [
  "موبایل",
  "لپ تاپ",
  "ساعت",
  "هدفون",
  "دوربین",
  "گیمینگ",
  "سوپرمارکت",
];

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <Container>
        <ul className="flex h-14 items-center gap-8">
          {links.map((item) => (
            <motion.li
              key={item}
              whileHover={{
                y: -3,
                color: "#ef4444",
              }}
              transition={{
                duration: 0.2,
              }}
              className="cursor-pointer text-sm font-medium"
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
