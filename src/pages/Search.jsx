// pages/Search.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMenu } from '../contexts/MenuContext';
import SearchResults from '../components/SearchResults';
import { IoMdSearch } from 'react-icons/io';
import placeholder from "../assets/placeholder.png";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const { searchItems } = useMenu();
  
  const results = query ? searchItems(query) : [];

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query });
    }
  };

  return (
    <div className="container py-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Search Menu</h1>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for dishes, soups, stews..."
            className="w-full p-4 pl-12 pr-4 rounded-xl border border-gray-300 focus:outline-none focus:border-primary"
          />
          <IoMdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
          >
            Search
          </button>
        </div>
      </form>

      {query && (
        <div>
          <p className="mb-4 text-gray-600">
            Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((item, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-lg transition">
                <img
                  src={item.image || placeholder}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded mb-3"
                />
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.category}</p>
                <p className="text-primary font-bold mt-2">
                  {item.sizes?.[0]?.price || item.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;