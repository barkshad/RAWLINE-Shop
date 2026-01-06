
import React from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";

export default function Home() {
  return (
    <div className="bg-background pt-32 md:pt-48 pb-20">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <Reveal>
          <div className="max-w-4xl">
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-accent-clay mb-6 block font-bold">
              [ RAWLINE / MANIFESTO 001 ]
            </span>
            <h1 className="text-6xl md:text-[9rem] font-bold tracking-tighter leading-[0.8] mb-16 text-raw-900">
              IDEAS <br />
              IN THEIR <br />
              <span className="text-accent-moss">FIRST FORM.</span>
            </h1>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 mb-32">
          <div className="lg:col-span-7">
            <Reveal delay={200}>
              <div className="editorial-text text-xl md:text-3xl font-light text-raw-900 space-y-12">
                <p>
                  Most modern garments are born from a desire for speed. They are designed to be consumed, discarded, and forgotten. At RAWLINE, we operate in the opposite direction.
                </p>
                <p>
                  We are interested in the signal, not the noise. We believe the first line drawn on a sketchpad is often the most honest. It contains the raw intent of the creator before the demands of mass-market appeal begin to erode its substance.
                </p>
              </div>
            </Reveal>
          </div>
          
          <div className="lg:col-span-5 flex flex-col justify-end">
            <Reveal delay={400}>
              <div className="p-8 border border-raw-200 bg-white">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-accent-clay font-mono">Core Principles</h3>
                <ul className="space-y-4 text-sm editorial-text text-raw-500 italic font-serif">
                  <li>— The rejection of artificial urgency.</li>
                  <li>— The celebration of visible construction.</li>
                  <li>— The pursuit of structural permanence.</li>
                  <li>— The documentation of intentional living.</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={600}>
          <div className="flex flex-col items-center justify-center py-20 border-y border-raw-200 text-center">
            <p className="text-lg md:text-2xl font-serif italic text-raw-500 max-w-2xl mb-12">
              "We build what is necessary, then we stop."
            </p>
            <Link 
              to="/shop" 
              className="px-12 py-5 bg-raw-900 text-white text-xs font-bold uppercase tracking-[0.4em] hover:bg-accent-clay transition-all duration-700 shadow-xl"
            >
              Examine The Collection
            </Link>
          </div>
        </Reveal>
      </div>
      
      {/* Visual Break */}
      <div className="h-screen w-full mt-32 relative overflow-hidden">
        <img 
          src="https://picsum.photos/seed/rawline/1920/1080" 
          className="w-full h-full object-cover grayscale opacity-20" 
          alt="Atmospheric texture" 
        />
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <p className="text-[10px] md:text-xs font-mono tracking-[0.8em] uppercase text-raw-400 text-center max-w-lg">
            Documenting the sacred transition from concept to tangible artifact.
          </p>
        </div>
      </div>
    </div>
  );
}
