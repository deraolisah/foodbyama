import React from 'react';
import bgHero from "../assets/hero-bg.png";

const Hero = () => {
  return (
    <div className="container px-8! h-60! md:h-80! text-white flex flex-col items-center justify-center" style={{
      backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${bgHero})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      <h1 className="text-center text-white tracking-wider mb-1 text-2xl font-medium"> Welcome to FoodByAma </h1>
      <p className="text-xs text-center max-w-xs mx-auto">
        We believe that eating healthy doesn't have to be boring, and we're here to prove it!
      </p>
    </div>
  )
}

export default Hero;