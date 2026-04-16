import React from 'react';
import bgHero from "../../assets/hero-bg.png";
import { ChevronLeft, ChevronRight, LocateIcon } from 'lucide-react';


const Hero = () => {
  return (
    <div className="container px-8! h-50! md:h-68! text-white flex flex-col gap-2 items-center justify-center bg-top md:bg-center relative" style={{
      backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.48), rgba(0,0,0,0.6)), url(${bgHero})`,
      backgroundSize: "cover",
      // backgroundPosition: "top",
      backgroundRepeat: "no-repeat",
    }}>
      <div className="absolute top-1/2 left-1/2 w-[calc(100%+2rem)] mx-auto h-10 -translate-1/2 z-10 flex items-center justify-between pointer-events-none">
        <button className="pointer-events-auto cursor-pointer p-2.5 rounded-full bg-black/50 backdrop-blur-lg">
          <ChevronLeft size={18} className="text-white" />
        </button>
        <button className="pointer-events-auto cursor-pointer p-2.5 rounded-full bg-black/50 backdrop-blur-lg">
          <ChevronRight size={18} className="text-white" />
        </button>

      </div>
      <h1 className="text-center text-white tracking-wider text-2xl font-medium"> Welcome to FoodByAma </h1>
      <p className="text-sm text-center max-w-xs mx-auto">
        We believe that eating healthy doesn't have to be boring, and we're here to prove it!
      </p>
      <small className="flex items-center gap-1 bg-primary py-px px-2 rounded-full uppercase mt-1">
        <LocateIcon size={12} /> 
        Awka 
      </small>
    </div>
  )
}

export default Hero;