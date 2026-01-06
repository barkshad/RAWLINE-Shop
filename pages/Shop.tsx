
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/firebase";
import { imageUrl } from "../services/cloudinary";
import Reveal from "../components/Reveal";
import { ProductData } from "../types";
import { Filter, SlidersHorizontal, ChevronDown } from "lucide-react";

export default function Shop() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        <div className="w-12 h-12 border border-raw-200 border-t-accent-clay animate-spin rounded-full"></div>
        <span className="text-[10px] tracking-[0.5em] uppercase text-raw-400 font-bold font-mono">Syncing Catalog...</span>
      </div>
    </div>
  );

  return (
    <div className="bg-background pt-32 pb-32">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        
        {/* Editorial Header */}
        <header className="mb-20">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-raw-200">
              <div className="max-w-2xl">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 uppercase">The Catalog.</h1>
                <p className="editorial-text text-lg text-raw-500 font-light italic font-serif leading-relaxed">
                  Every entry in this index is a deliberate solution to a problem of form. We do not release seasonal trends; we release structural updates to the human wardrobe.
                </p>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-raw-400 uppercase tracking-widest bg-white px-4 py-2 border border-raw-100 rounded-full">
                <span className="w-2 h-2 bg-accent-clay rounded-full animate-pulse"></span>
                {products.length} Items Documented
              </div>
            </div>
          </Reveal>
        </header>

        {/* Layout based on Beyond Retro Reference (Sidebar + Grid) */}
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Subtle Filters Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-32 space-y-12">
              <Reveal delay={200}>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 text-raw-900 border-b border-raw-100 pb-2 flex items-center justify-between">
                    Taxonomy <ChevronDown className="w-3 h-3" />
                  </h4>
                  <ul className="space-y-3">
                    {["All Assets", "Outer Shells", "Foundation Layers", "Structural Knitwear", "Accessories"].map(cat => (
                      <li key={cat}>
                        <button className="text-xs uppercase tracking-widest text-raw-400 hover:text-accent-clay transition-colors duration-300">
                          {cat}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-16">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 text-raw-900 border-b border-raw-100 pb-2">
                    Material Focus
                  </h4>
                  <ul className="space-y-3">
                    {["Raw Wool", "Organic Twill", "Recycled Fiber"].map(mat => (
                      <li key={mat} className="flex items-center gap-3">
                        <div className="w-3 h-3 border border-raw-200"></div>
                        <span className="text-[10px] uppercase tracking-widest text-raw-400">{mat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
              {products.map((p, idx) => (
                <Reveal key={p.id} delay={idx % 3 * 100}>
                  <Link to={`/product/${p.id}`} className="group block">
                    <div className="relative aspect-[3/4] overflow-hidden bg-raw-100 mb-6 group-hover:shadow-2xl transition-all duration-700 ease-out">
                      <img 
                        src={imageUrl(p.imageIds[0], 800)} 
                        alt={p.name}
                        className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                      />
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <span className="bg-white/90 backdrop-blur text-[8px] font-bold uppercase tracking-[0.2em] px-3 py-1 text-raw-900 shadow-sm">
                          Spec Sheet
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold tracking-tight uppercase group-hover:text-accent-clay transition-colors">{p.name}</h3>
                        <span className="text-sm font-mono text-accent-clay font-bold">${p.price}</span>
                      </div>
                      <p className="text-[10px] text-raw-400 font-mono tracking-widest uppercase mb-4">
                        Asset_Ref: {p.id?.slice(-6).toUpperCase()}
                      </p>
                      <p className="text-sm text-raw-500 font-light leading-relaxed font-serif italic line-clamp-2">
                        {p.description}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
