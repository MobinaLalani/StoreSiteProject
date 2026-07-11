"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ShieldCheck } from "lucide-react";

export default function HeroImage() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Glow */}

      <div className="absolute h-[420px] w-[420px] rounded-full bg-red-100 blur-3xl" />

      {/* Floating Card Left */}

      <motion.div
        animate={{
          y: [-10, 10, -10],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="absolute left-0 top-16 z-20 hidden rounded-2xl border bg-white p-4 shadow-xl lg:block"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-yellow-100 p-2">
            <Star className="text-yellow-500" size={20} />
          </div>

          <div>
            <p className="text-xs text-gray-500">امتیاز کاربران</p>

            <h4 className="font-bold">4.9 / 5</h4>
          </div>
        </div>
      </motion.div>

      {/* Floating Card Right */}

      <motion.div
        animate={{
          y: [10, -10, 10],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="absolute bottom-16 right-0 z-20 hidden rounded-2xl border bg-white p-4 shadow-xl lg:block"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-green-100 p-2">
            <ShieldCheck className="text-green-500" size={20} />
          </div>

          <div>
            <p className="text-xs text-gray-500">ضمانت اصالت</p>

            <h4 className="font-bold">100%</h4>
          </div>
        </div>
      </motion.div>

      {/* Main Image */}

      <motion.div
        whileHover={{
          scale: 1.03,
        }}
        animate={{
          y: [-8, 8, -8],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="relative z-10"
      >
        <Image
          src="/images/hero-phone.png"
          alt="Hero Product"
          width={600}
          height={600}
          priority
          className="drop-shadow-[0_40px_50px_rgba(0,0,0,.18)]"
        />
      </motion.div>
    </div>
  );
}
