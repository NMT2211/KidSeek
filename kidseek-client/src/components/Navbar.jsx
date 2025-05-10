export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div className="text-blue-600 font-bold text-xl">KidSeek</div>
      <button className="text-gray-600 focus:outline-none">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>
  );
}