'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';

export default function History() {
  const [history, setHistory] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setHistory(storedHistory);
  }, []);

  const handleClick = (city) => {
    router.push(`/weather/${city}`);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-8 bg-white/25 rounded-lg shadow-md mt-12 backdrop-blur-md">
        <h1 className="text-4xl font-semibold mb-8 text-white">Search History</h1>
        {history.length === 0 ? (
          <p className="text-gray-300 text-center italic text-lg">No previous searches.</p>
        ) : (
          <ul className="space-y-4">
            {[...history].reverse().map((item, index) => {
              const cityName = typeof item === 'string' ? item : item.city;
              return (
                <li key={index}>
                  <button
                    onClick={() => handleClick(cityName)}
                    className="w-full text-left text-blue-700 bg-blue-100 hover:bg-blue-200 underline px-6 py-3 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    {cityName}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

    </Layout>
  );
}
