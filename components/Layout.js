import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function Layout({ children }) {
    const router = useRouter();
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1740&q=80')`,
      }}
    >
      <div className="bg-black/60 min-h-screen text-white">
        <div className="flex justify-between items-center mx-7 pt-5 pb-3 border-b border-white/20">
          <h1 className="text-3xl font-bold hover:cursor-pointer" onClick={() => router.push('/')}>Weather App</h1>
          <nav className="flex gap-6 text-lg">
            <Link className="hover:underline" href="/">Home</Link>
            <Link className="hover:underline" href="/history">History</Link>
            <Link className="hover:underline" href="/about">About</Link>
          </nav>
        </div>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
