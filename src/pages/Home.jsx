import React from 'react';
import Hero from "../components/home/Hero.jsx";
import Categories from '../components/home/Categories.jsx';
import ItemGrid from '../components/home/ItemGrid.jsx';

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <ItemGrid />
    </>
  )
}

export default Home;