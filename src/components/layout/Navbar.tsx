"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Smartphone,
  Laptop,
  Watch,
  Headphones,
  Camera,
  Gamepad2,
  ShoppingBasket,
  Menu,
} from "lucide-react";

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

const categories = [
  {
    title: "موبایل",
    icon: Smartphone,
    items: ["آیفون", "سامسونگ", "شیائومی", "پوکو"],
  },
  {
    title: "لپ تاپ",
    icon: Laptop,
    items: ["Asus", "Lenovo", "HP", "Dell"],
  },
  {
    title: "ساعت",
    icon: Watch,
    items: ["Apple", "Samsung", "Amazfit"],
  },
  {
    title: "هدفون",
    icon: Headphones,
    items: ["Sony", "JBL", "Anker", "Apple"],
  },
  {
    title: "دوربین",
    icon: Camera,
    items: ["Canon", "Nikon", "Sony"],
  },
  {
    title: "گیمینگ",
    icon: Gamepad2,
    items: ["PS5", "Xbox", "Nintendo"],
  },
  {
    title: "سوپرمارکت",
    icon: ShoppingBasket,
    items: ["مواد غذایی", "نوشیدنی", "تنقلات"],
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(categories[0]);

  return (
    <nav className="relative border-b bg-white">
      <Container>
        <div className="flex h-14 items-center gap-10">
          {/* Category Button */}
          <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 font-semibold text-red-600 transition hover:bg-red-100">
              <Menu size={18} />
              دسته بندی ها
              <ChevronDown
                size={18}
                className={`transition ${open ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                    scale: 0.98,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    scale: 0.98,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="absolute right-0 top-14 z-50 flex h-[420px] w-[700px] overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl"
                >
                  {/* Left */}
                  <div className="w-64 border-l bg-gray-50">
                    {categories.map((category) => {
                      const Icon = category.icon;

                      return (
                        <button
                          key={category.title}
                          onMouseEnter={() => setActive(category)}
                          className={`flex w-full items-center gap-3 px-5 py-4 text-right transition ${
                            active.title === category.title
                              ? "bg-white font-bold text-red-600"
                              : "hover:bg-white"
                          }`}
                        >
                          <Icon size={20} />
                          {category.title}
                        </button>
                      );
                    })}
                  </div>

                  {/* Right */}
                  <motion.div
                    key={active.title}
                    initial={{
                      opacity: 0,
                      x: 20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="flex-1 p-8"
                  >
                    <h3 className="mb-6 text-xl font-bold">{active.title}</h3>

                    <div className="grid grid-cols-2 gap-4">
                      {active.items.map((item) => (
                        <motion.div
                          key={item}
                          whileHover={{
                            x: -5,
                          }}
                          className="cursor-pointer rounded-xl bg-gray-50 p-4 transition hover:bg-red-50 hover:text-red-600"
                        >
                          {item}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Normal Links */}
          <ul className="flex items-center gap-8">
            {links.map((item) => (
              <motion.li
                key={item}
                whileHover={{
                  y: -3,
                  color: "#ef4444",
                }}
                transition={{
                  duration: 0.5,
                }}
                className="cursor-pointer text-sm font-medium"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </nav>
  );
}
