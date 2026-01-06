import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../services/firebase";
import { imageUrl } from "../services/cloudinary";
import Reveal from "../components/Reveal";
import { ProductData } from "../types";

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductData | null>(null);

  useEffect(() => {
    if (id) {
      getProduct(id).then(setProduct);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xs tracking-widest uppercase animate-pulse">
        Fetching Asset...
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <Reveal>
        <div className="grid md:grid-cols-2 min-h-screen">
          {/* Image Section - Left (Sticky) */}
          <div className="bg-[#eae8e4] h-[60vh] md:h-screen md:sticky md:top-0 relative overflow-hidden group">
            <img 
              src={imageUrl(product.imageIds?.[0])} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
             <Link to="/shop" className="absolute top-8 left-8 text-xs font-bold tracking-[0.2em] uppercase bg-white/80 backdrop-blur px-4 py-2 hover:bg-black hover:text-white transition-colors">
              ← Index
            </Link>
          </div>
          
          {/* Content Section - Right (Scrollable) */}
          <div className="p-8 md:p-24 flex flex-col justify-center bg-[#f5f4f2]">
            <div className="mb-2">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Case Study</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-900 mb-8 leading-[0.9]">
              {product.name}
            </h1>

            <div className="prose prose-lg text-gray-600 font-light leading-loose mb-12">
              <p>{product.description}</p>
              <p>
                This piece exists to solve a specific problem. It was designed with the intent of reduction—removing the unnecessary to highlight the essential form.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 border-t border-b border-gray-300 py-8 mb-12">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">Fabric</h4>
                <p className="text-sm text-gray-600 font-serif italic">100% Organic Content</p>
                <p className="text-sm text-gray-500 mt-1">Sourced for texture and longevity.</p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">Intent</h4>
                <p className="text-sm text-gray-600">Daily Utility</p>
                <p className="text-sm text-gray-500 mt-1">Designed to fade beautifully over time.</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-mono text-gray-900">${product.price}</span>
              <button className="bg-gray-900 text-white px-12 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-700 transition-colors">
                Acquire
              </button>
            </div>
            
            <p className="mt-8 text-xs text-gray-400 text-center uppercase tracking-widest">
              Limited production run.
            </p>
          </div>
        </div>
      </Reveal>
    </main>
  );
}