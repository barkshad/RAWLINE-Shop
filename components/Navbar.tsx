
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 px-6 md:px-12 py-8 flex justify-between items-center ${
      isScrolled ? "bg-white/80 backdrop-blur-lg py-5 shadow-sm border-b border-raw-100" : "bg-transparent"
    }`}>
      <Link to="/" className="text-2xl font-bold tracking-[0.5em] uppercase text-raw-900 hover:text-accent-clay transition-all duration-500">
        RAW<span className="text-accent-clay">LINE</span>
      </Link>
      
      <div className="flex gap-8 md:gap-16 items-center">
        {[
          { label: "Manifesto", path: "/" },
          { label: "Catalog", path: "/shop" },
          { label: "Essay", path: "/about" }
        ].map((item) => (
          <Link 
            key={item.path}
            to={item.path} 
            className={`text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold transition-all duration-500 hover:text-accent-clay relative group ${
              pathname === item.path ? "text-accent-clay" : "text-raw-900 opacity-60 hover:opacity-100"
            }`}
          >
            {item.label}
            <span className={`absolute -bottom-2 left-0 w-0 h-px bg-accent-clay transition-all duration-500 group-hover:w-full ${
              pathname === item.path ? "w-full" : ""
            }`}></span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
