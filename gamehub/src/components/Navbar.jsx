import { useTheme } from "../context/ThemeContext.jsx";
import { useGame } from "../context/GameContext.jsx";

function Navbar({ sidebarOpen, onToggleSidebar }) {
  const { darkMode, toggleTheme } = useTheme();
  const { wishlist } = useGame();

  const border = darkMode ? "border-dark-border" : "border-gray-300";
  const iconButton = darkMode
    ? "text-dark-text hover:bg-dark-card hover:text-white"
    : "text-gray-600 hover:bg-gray-200 hover:text-gray-900";
  const mutedText = darkMode ? "text-dark-text" : "text-gray-600";

  return (
    <header
      className={`min-h-[78px] flex items-center justify-between gap-4 border-b sm:min-h-[65px] ${border}`}
    >
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label={sidebarOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          aria-expanded={sidebarOpen}
          aria-controls="primary-sidebar"
          onClick={onToggleSidebar}
          className={`flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#818cf8] ${border} ${iconButton}`}
        >
          <span className="h-0.5 w-5 rounded bg-current" />
          <span className="h-0.5 w-5 rounded bg-current" />
          <span className="h-0.5 w-5 rounded bg-current" />
        </button>
        <p className={`text-xs ${mutedText}`}>Dashboard / Home</p>
      </div>

      <div className="flex items-center gap-3 text-xs">
        {/* Badge hanya muncul kalau wishlist tidak kosong */}
        {wishlist.length > 0 && (
          <a
            href="#wishlist"
            className="px-[10px] py-[5px] rounded-full bg-[#3b1931] text-[#f9a8d4] font-semibold"
          >
            ♥ {wishlist.length}
          </a>
        )}

        <button
          type="button"
          onClick={toggleTheme}
          aria-pressed={darkMode}
          aria-label={darkMode ? "Ganti ke tema terang" : "Ganti ke tema gelap"}
          className={`flex h-9 w-9 items-center justify-center rounded-lg border text-base transition-colors ${border} ${iconButton}`}
        >
          {darkMode ? "☀" : "☾"}
        </button>

        <div className="flex items-center justify-center w-[35px] h-[35px] rounded-full bg-primary font-bold text-white">
          D
        </div>
        <span>Daffa</span>
      </div>
    </header>
  );
}

export default Navbar;