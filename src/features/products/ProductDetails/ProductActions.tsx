"use client";
import InquiryAction from "../components/ProductCard/ProductActions";
export default function ProductActions({ productId, productTitle }: { productId?: number; productTitle?: string }) { return <InquiryAction productId={productId} productTitle={productTitle} variant="detail" />; }
