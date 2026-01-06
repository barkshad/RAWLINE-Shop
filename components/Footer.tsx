
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="px-6 md:px-12 py-32 bg-white border-t border-raw-100">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-start gap-20">
        <div className="flex flex-col gap-10 max-w-lg">
          <h2 className="text-3xl font-bold tracking-[0.4em] uppercase text-raw-900">RAWLINE.</h2>
          <p className="editorial-text text-sm text-raw-500 font-light leading-relaxed italic font-serif">
            A quiet rebellion against the disposable. We document the search for substance in a world of noise. Built with intentional restraint.
          </p>
          <div className="flex gap-8 border-t border-raw-50 pt-8">
            <Link to="/about" className="text-[10px] uppercase tracking-widest text-accent-clay font-bold hover:text-raw-900 transition-colors">Founder Story</Link>
            <Link to="/shop" className="text-[10px] uppercase tracking-widest text-accent-clay font-bold hover:text-raw-900 transition-colors">Catalog Entry</Link>
          </div>
        </div>

        <div className="flex flex-col gap-12 md:text-right w-full md:w-auto">
          <div className="grid grid-cols-2 md:flex flex-col gap-6">
            <span className="text-[10px] uppercase tracking-[0.4em] text-raw-900 font-bold mb-2 md:block">Navigation</span>
            <Link to="/" className="text-xs uppercase tracking-widest text-raw-400 hover:text-accent-clay transition-colors">Home</Link>
            <Link to="/shop" className="text-xs uppercase tracking-widest text-raw-400 hover:text-accent-clay transition-colors">Shop</Link>
            <Link to="/about" className="text-xs uppercase tracking-widest text-raw-400 hover:text-accent-clay transition-colors">Story</Link>
            <Link to="/admin" className="text-xs uppercase tracking-widest text-raw-400/20 hover:text-accent-clay transition-colors">Admin</Link>
          </div>
          <div className="pt-12 border-t border-raw-50 flex flex-col items-end gap-2">
            <p className="text-[10px] uppercase tracking-[0.4em] text-raw-300 font-mono">
              © 2024 RAWLINE_PROTOCOL.
            </p>
            <p className="text-[8px] uppercase tracking-[0.4em] text-raw-200 font-mono">
              System_Status: Stable_V1.2
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
