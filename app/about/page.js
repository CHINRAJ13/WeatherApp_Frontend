'use client'

import Image from "next/image";
import Layout from '../../components/Layout';

export default function Home() {
    return (
        <Layout>
            <div className="max-w-3xl mx-auto p-8 bg-white/25 rounded-lg shadow-lg mt-10 backdrop-blur-md">
                <h1 className="text-4xl font-extrabold mb-6 text-white border-b-4 border-blue-400 pb-2">
                    About This Weather App
                </h1>
                <p className="mb-4 text-white text-lg leading-relaxed drop-shadow-md">
                    This app displays current weather information using real-time location or searched cities.
                </p>
                <p className="mb-3 text-white text-base drop-shadow-md">
                    <strong className="font-semibold">Frontend:</strong>{' '}
                    <span className="text-blue-300">Built with Next.js and Tailwind CSS.</span>
                </p>
                <p className="mb-3 text-white text-base drop-shadow-md">
                    <strong className="font-semibold">Backend:</strong>{' '}
                    <span className="text-blue-300">Node.js + Express.js server that connects to the weather API.</span>
                </p>
                <p className="mb-3 text-white text-base drop-shadow-md">
                    <strong className="font-semibold">API Used:</strong>{' '}
                    <a
                        className="text-blue-300 underline hover:text-blue-500 transition-colors duration-200"
                        href="https://openweathermap.org/api"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        OpenWeatherMap API
                    </a>
                    .
                </p>
                <p className="mb-3 text-white text-base drop-shadow-md">
                    <strong className="font-semibold">How it works:</strong>{' '}
                    The frontend requests location/city, the backend fetches data from the API, and returns it to display.
                </p>
            </div>
        </Layout>
    );
}
