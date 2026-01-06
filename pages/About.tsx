
import React from "react";
import Reveal from "../components/Reveal";

export default function About() {
  return (
    <div className="bg-background pt-48 pb-40">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal>
          <header className="mb-32">
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-accent-clay mb-6 block font-bold">
              [ THE ARCHIVE / STORY ]
            </span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-12 uppercase leading-[0.9] text-raw-900">
              SUBSTANCE <br />
              OVER <span className="text-accent-moss">SURFACE.</span>
            </h1>
            <div className="w-32 h-1 bg-accent-clay"></div>
          </header>

          <article className="editorial-text text-xl md:text-2xl text-raw-900 font-light space-y-16">
            <p className="first-letter:text-8xl first-letter:font-bold first-letter:mr-4 first-letter:float-left first-letter:leading-[0.7] first-letter:text-accent-clay first-letter:uppercase">
              RAWLINE was founded on a simple realization: the fashion industry has lost its mind. We are living in an era of unprecedented noise—artificial urgency, algorithmic trends, and the relentless pressure to consume more, faster, and cheaper.
            </p>
            
            <p>
              I created this space as a sanctuary from that chaos. It began as a frustration with the fragility of modern clothing and ended as a documentation of intentional creation. We are not interested in the polished facade of empty products. We are interested in the "raw stage" of creation—the moment when an idea is at its most potent and least refined.
            </p>

            <blockquote className="border-l-8 border-accent-sand pl-12 py-6 my-20 italic font-serif text-3xl text-raw-500 leading-relaxed">
              "We don't sell clothes. We sell structural solutions for the human experience. If a product doesn't have a reason to exist beyond vanity, we don't build it."
            </blockquote>

            <p>
              Our process is visible by design. We show the seams because they are the honest evidence of work. We honor the texture of raw wool and organic cotton because they represent a connection to the material world that fast fashion has tried to erase.
            </p>

            <p>
              When you buy a piece from RAWLINE, you aren't just acquiring a garment. You are participating in a quiet rebellion against the disposable. You are choosing to own less, but to own things that actually mean something.
            </p>

            <div className="pt-32 border-t border-raw-200 flex flex-col items-end">
              <span className="font-serif italic text-2xl text-accent-clay">— The RAWLINE Protocol</span>
              <span className="text-[10px] font-mono tracking-widest mt-4 uppercase text-raw-400">FOUNDED 2024 / SYSTEM V.1.0</span>
            </div>
          </article>
        </Reveal>
      </div>
    </div>
  );
}
