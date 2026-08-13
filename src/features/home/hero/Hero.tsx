"use client";

import { motion } from "framer-motion";
import Container from "../../../components/ui/Container";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import type { Product } from "@/src/types/product";

export default function Hero({ products, categoryCount }: { products: Product[]; categoryCount: number }) {
  return <section className="relative overflow-hidden bg-[#f8fafc] pb-10 pt-5 sm:pb-16 sm:pt-10 lg:pb-24 lg:pt-14">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(239,68,68,.13),transparent_30%),radial-gradient(circle_at_85%_75%,rgba(59,130,246,.10),transparent_28%)]" />
    <div className="absolute inset-0 opacity-[.035]" style={{ backgroundImage: "linear-gradient(#0f172a 1px,transparent 1px),linear-gradient(90deg,#0f172a 1px,transparent 1px)", backgroundSize: "40px 40px" }}/>
    <Container>
      <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_.92fr] lg:gap-14">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}><HeroContent productCount={products.length} categoryCount={categoryCount}/></motion.div>
        <motion.div initial={{ opacity: 0, scale: .96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: .65, delay: .1 }}><HeroImage products={products}/></motion.div>
      </div>
    </Container>
  </section>;
}
