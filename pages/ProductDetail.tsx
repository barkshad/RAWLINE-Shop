
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../services/firebase";
import { imageUrl } from "../services/cloudinary";
import Reveal from "../components/Reveal";
import { ProductData } from "../types";
import { ArrowLeft, Plus, Ruler, Box, ShieldCheck } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (id) getProduct(id).then(setProduct);
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center bg-background font-mono text-[10px] tracking-[0.5em] text-accent-clay animate-pulse">
      DECRYPTING_ASSET_DATA...
    </div>
  );

  return (
    <div className="bg-background">
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Left: Gallery (Sticky) */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-0 h-[80vh] lg:h-screen bg-raw-200 overflow-hidden relative">
          <img 
            src={imageUrl(product.imageIds[activeImage], 1600)} 
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-1000"
          />
          
          <div className="absolute bottom-12 left-12 flex gap-4">
            {product.imageIds.map((img, idx) => (
              <button 
                key={img}
                onClick={() => setActiveImage(idx)}
                className={`w-16 h-20 border-2 transition-all overflow-hidden ${
                  activeImage === idx ? "border-accent-clay scale-110 shadow-xl" : "border-white/20 opacity-40 grayscale"
                }`}
              >
                <img src={imageUrl(img, 400)} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <Link to="/shop" className="absolute top-12 left-12 px-6 py-3 bg-white/90 backdrop-blur text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-raw-900 hover:text-white transition-all shadow-sm flex items-center gap-2">
            <ArrowLeft className="w-3 h-3" /> Catalog Index
          </Link>
        </div>

        {/* Right: Info (Editorial Narrative) */}
        <div className="w-full lg:w-1/2 px-6 py-24 md:px-24 md:py-48 flex flex-col justify-start bg-white lg:bg-transparent">
          <Reveal>
            <div className="max-w-xl mx-auto lg:ml-0">
              <span className="text-[10px] font-mono tracking-[0.5em] text-accent-clay uppercase font-bold mb-6 block border-l-2 border-accent-clay pl-4">
                Object Report — {product.id?.slice(-8).toUpperCase()}
              </span>
              
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-12 uppercase leading-[0.85] text-raw-900">
                {product.name}
              </h1>

              <div className="editorial-text text-xl text-raw-600 font-light leading-relaxed mb-16 italic font-serif">
                <p>{product.description}</p>
              </div>

              <div className="space-y-16">
                
                {/* Philosophical Accordions */}
                <div className="border-t border-raw-100 pt-12">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-6 text-accent-moss flex items-center gap-2">
                    <Box className="w-3 h-3" /> The Philosophy
                  </h4>
                  <p className="text-sm editorial-text text-raw-500 font-light">
                    This garment exists because it needed to. It was not created to fill a shelf, but to solve a specific structural need in the daily lives of the intentional. It is designed to be worn for years, absorbing the stories of the wearer until it becomes more of a companion than an item of clothing.
                  </p>
                </div>

                <div className="border-t border-raw-100 pt-12">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-6 text-accent-moss flex items-center gap-2">
                    <Plus className="w-3 h-3" /> Construction Data
                  </h4>
                  <ul className="text-xs editorial-text text-raw-500 space-y-3 font-mono">
                    <li className="flex justify-between border-b border-raw-50 pb-2">
                      <span>Fiber:</span>
                      <span className="text-raw-900">100% Organic Origin</span>
                    </li>
                    <li className="flex justify-between border-b border-raw-50 pb-2">
                      <span>Weight:</span>
                      <span className="text-raw-900">Heavy Structure (340gsm)</span>
                    </li>
                    <li className="flex justify-between border-b border-raw-50 pb-2">
                      <span>Cycle:</span>
                      <span className="text-raw-900">Batch 001 — Limited</span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-12 pt-16 border-t border-raw-900/10">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-raw-400 uppercase tracking-widest mb-1 font-mono font-bold">Entry Value</span>
                    <span className="text-5xl font-bold font-mono tracking-tighter text-accent-clay leading-none">${product.price}</span>
                  </div>
                  
                  <button className="group relative flex-1 bg-raw-900 text-white py-8 px-12 text-xs uppercase tracking-[0.4em] font-bold overflow-hidden transition-all shadow-2xl">
                    <span className="relative z-10">Add To Archive</span>
                    <div className="absolute inset-0 bg-accent-clay translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out"></div>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-12 opacity-40 grayscale">
                  <div className="flex flex-col items-center gap-2 text-[8px] uppercase tracking-widest text-center">
                    <ShieldCheck className="w-4 h-4" /> Structural Warranty
                  </div>
                   <div className="flex flex-col items-center gap-2 text-[8px] uppercase tracking-widest text-center">
                    <Ruler className="w-4 h-4" /> Exact Sizing Data
                  </div>
                   <div className="flex flex-col items-center gap-2 text-[8px] uppercase tracking-widest text-center">
                    <Box className="w-4 h-4" /> Global Dispatch
                  </div>
                </div>

              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
