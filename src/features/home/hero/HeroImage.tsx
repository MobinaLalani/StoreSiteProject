"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ShieldCheck, Truck, CreditCard } from "lucide-react";

import FloatingProduct from "./FloatingProduct";
import FloatingCard from "./FloatingCard";

import heroPic from "@/public/Image/products/sarsim.png";

const product1 = "/Image/products/batterycannectorcabel.png";
const product2 = "/Image/products/cableshoe.png";
const product3 = "/Image/products/gire.png";
const product4 = "/Image/products/giresoosmari.png";

export default function HeroImage() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Glow */}
      <div className="absolute h-[420px] w-[420px] rounded-full bg-red-100 blur-3xl" />

      {/* Floating Products */}
      {/* Floating Products */}

      <FloatingProduct
        image={product1}
        className="-left-24 top-24"
        duration={6}
        delay={0}
        rotate={8}
  
      />

      <FloatingProduct
        image={product2}
        className="right-8 -top-10"
        duration={7}
        delay={0.8}
        rotate={10}
       
      />

      <FloatingProduct
        image={product3}
        className="-left-2 bottom-4"
        duration={5.5}
        delay={1.4}
        rotate={6}
        
      />

      <FloatingProduct
        image={product4}
        className="right-[-60px] bottom-28"
        duration={6.8}
        delay={2}
        rotate={12}
       
      />

      {/* Floating Cards */}
      {/* 
      <FloatingCard
        icon={Star}
        title="امتیاز کاربران"
        value="4.9 / 5"
        className="-left-8 top-32"
        iconBg="bg-yellow-100"
        iconColor="text-yellow-500"
        duration={5}
      />

      <FloatingCard
        icon={ShieldCheck}
        title="ضمانت اصالت"
        value="100%"
        className="-right-4 top-40"
        iconBg="bg-green-100"
        iconColor="text-green-500"
        duration={6}
      />

      <FloatingCard
        icon={Truck}
        title="ارسال سریع"
        value="۲۴ ساعته"
        className="-left-4 bottom-28"
        iconBg="bg-blue-100"
        iconColor="text-blue-500"
        duration={5.5}
      />

      <FloatingCard
        icon={CreditCard}
        title="پرداخت امن"
        value="آنلاین"
        className="-right-6 bottom-20"
        iconBg="bg-purple-100"
        iconColor="text-purple-500"
        duration={6.5}
      /> */}

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
        className="relative z-20"
      >
        <Image
          src={heroPic}
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
