import { useEffect, useState } from "react";
import { useGame } from "./context/GameContext";
import { useTheme } from "./context/ThemeContext.jsx";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import StatsCard from "./components/StatsCard";
import GameGrid from "./components/GameGrid";
import ProfileCard from "./components/ProfileCard";
import games from "./data/games";

// Data statis -> cukup dihitung sekali di luar komponen
const CATEGORIES = ["All", "Action", "RPG", "Adventure", "Sandbox", "Simulation"];

const TOTAL_PLAYED = games.filter((game) => game.played).length;

const AVERAGE_RATING = games.length
  ? (games.reduce((sum, game) => sum + game.rating, 0) / games.length).toFixed(1)
  : "0.0";

function App() {
  const { darkMode } = useTheme();
  const { wishlist } = useGame();

  const [sidebarOpen, setSidebarOpen] = useState(() =>
    window.matchMedia("(min-width: 769px)").matches
  );
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 769px)");
    const handleViewportChange = (event) => setSidebarOpen(event.matches);

    desktopQuery.addEventListener("change", handleViewportChange);
    return () => desktopQuery.removeEventListener("change", handleViewportChange);
  }, []);

  const keyword = search.trim().toLowerCase();

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(keyword);
    const matchesCategory = category === "All" || game.genre === category;

    return matchesSearch && matchesCategory;
  });

  const wishlistGames = games.filter((game) => wishlist.includes(game.id));

  // Kelas yang mengikuti tema (sebelumnya hard-coded untuk dark mode saja)
  const subtleText = darkMode ? "text-dark-text" : "text-gray-600";
  const mutedText = darkMode ? "text-dark-muted" : "text-gray-500";
  const fieldClass = darkMode
    ? "text-[#f1f5f9] bg-dark-card border-[#29364d] placeholder-dark-muted"
    : "text-gray-900 bg-white border-gray-300 placeholder-gray-400";
  const footerBorder = darkMode ? "border-dark-border" : "border-gray-300";

  return (
    <div
      id="home"
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-[#121212] text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Tutup menu navigasi"
          className="fixed inset-0 z-40 hidden bg-black/60 md:block"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        isOpen={sidebarOpen}
        onNavigate={() => {
          if (window.matchMedia("(max-width: 768px)").matches) {
            setSidebarOpen(false);
          }
        }}
      />

      <main
        className={`max-w-7xl px-[34px] transition-[margin] duration-300 2xl:px-[22px] md:px-[14px] ${
          sidebarOpen ? "ml-[250px] 2xl:ml-[220px] md:ml-0" : "ml-0"
        }`}
      >
        <Navbar
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((open) => !open)}
        />

        <section className="flex items-center justify-between gap-5 my-7 p-[34px] border border-[#37336f] rounded-[18px] bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end overflow-hidden sm:p-4 sm:flex-col sm:justify-start">
          <div>
            <p className="text-[#c4b5fd] text-[10px] font-bold tracking-[2px]">
              YOUR PERSONAL GAME LIBRARY
            </p>
            <h1 className="m-[12px_0] text-[clamp(24px,3vw,36px)] tracking-[-1px] text-white">
              Welcome back, Daffa!
            </h1>
            <p className="text-[#cbd5e1] text-xs leading-[1.7]">
              Kelola koleksi game dan temukan petualangan berikutnya.
            </p>
          </div>

          <div className="text-[clamp(48px,7vw,90px)] sm:text-[38px] flex-shrink-0">
            🎮    
          </div>
        </section>

        <section className="grid grid-cols-4 gap-4 mb-[38px] 2xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 sm:gap-2">
          <StatsCard icon="🎮" label="Total Games" value={games.length} color="#302b68" />
          <StatsCard icon="✓" label="Played" value={TOTAL_PLAYED} color="#174d40" />
          <StatsCard icon="♡" label="Wishlist" value={wishlist.length} color="#542640" />
          <StatsCard icon="★" label="Average Rating" value={AVERAGE_RATING} color="#59441e" />
        </section>

        <section className="pb-8" id="library">
          <div className="flex items-center justify-between gap-4 mb-[22px] flex-wrap">
            <div>
              <h2 className="m-0 mb-2 text-2xl">Game Library</h2>
              <p className={`m-0 text-xs ${subtleText}`}>
                Jelajahi semua koleksi game kamu.
              </p>
            </div>

            <span className="text-[#818cf8] text-xs">
              {filteredGames.length} games
            </span>
          </div>

          <div className="flex gap-3 mb-6 sm:flex-col">
            <input
              type="search"
              placeholder="Cari judul game..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Cari judul game"
              className={`flex-1 min-h-[44px] px-[14px] border rounded-lg focus:outline-none focus:border-[#818cf8] sm:w-full ${fieldClass}`}
            />

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              aria-label="Filter genre game"
              className={`min-w-[145px] min-h-[44px] px-[14px] border rounded-lg focus:outline-none focus:border-[#818cf8] sm:w-full ${fieldClass}`}
            >
              {CATEGORIES.map((item) => (
                <option
                  key={item}
                  value={item}
                  className={darkMode ? "bg-dark-card" : "bg-white"}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>

          <GameGrid games={filteredGames} />
        </section>

        <section className="pb-8" id="wishlist">
          <div className="flex items-center justify-between gap-4 mb-[22px] flex-wrap">
            <div>
              <h2 className="m-0 mb-2 text-2xl">Wishlist</h2>
              <p className={`m-0 text-xs ${subtleText}`}>
                Game yang ingin kamu mainkan berikutnya.
              </p>
            </div>

            <span className="text-[#818cf8] text-xs">
              {wishlistGames.length} games
            </span>
          </div>

          <GameGrid
            games={wishlistGames}
            emptyTitle="Wishlist masih kosong"
            emptyMessage="Tekan tombol ♡ pada kartu game untuk menyimpannya di sini."
          />
        </section>

        <section className="pb-8" id="profile">
          <h2 className="m-0 mb-[22px] text-2xl">Profile</h2>
          <ProfileCard
            name="Daffa"
            totalGames={games.length}
            playedGames={TOTAL_PLAYED}
            wishlistCount={wishlist.length}
          />
        </section>

        <footer
          className={`py-6 border-t text-xs text-center ${footerBorder} ${mutedText}`}
        >
          GameHub © 2026 · Your games, your collection.
        </footer>
      </main>
    </div>
  );
}

export default App;