import { useGame } from "../context/GameContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

function GameCard({ game }) {
  const { wishlist, toggleWishlist } = useGame();
  const { darkMode } = useTheme();

  const isWishlist = wishlist.includes(game.id);

  const surface = darkMode
    ? "bg-dark-card border-[#26334a]"
    : "bg-white border-gray-200";
  const metaText = darkMode ? "text-dark-text" : "text-gray-600";

  // Utility Tailwind menimpa warna dasar dari class .wishlist-button di index.css
  const wishlistColor = isWishlist
    ? darkMode
      ? "text-[#f9a8d4] border-[#7c315a] bg-[#3b1931] hover:bg-[#4a2040]"
      : "text-pink-700 border-pink-300 bg-pink-50 hover:bg-pink-100"
    : darkMode
      ? "text-[#cbd5e1] border-[#3a4660] bg-[#1a2438] hover:text-white hover:border-[#818cf8] hover:bg-[#252e4b]"
      : "text-gray-700 border-gray-300 bg-gray-100 hover:text-gray-900 hover:border-[#818cf8] hover:bg-indigo-50";

  return (
    <article
      className={`min-w-0 overflow-hidden border rounded-[13px] transition-all duration-200 hover:transform hover:-translate-y-1 hover:border-[#6d63f6] ${surface}`}
    >
      <img
        className="w-full h-40 object-cover bg-[#1e293b]"
        src={game.image}
        alt={game.title}
      />

      <div className="p-[15px]">
        <div className="flex justify-between items-start gap-2">
          <h3 className="m-0 text-sm leading-[1.5] break-words">{game.title}</h3>
          <span className="flex-shrink-0 text-accent-yellow text-xs">★ {game.rating}</span>
        </div>

        <p className={`my-2 text-xs ${metaText}`}>
          {game.genre} · {game.year}
        </p>

        {game.played ? (
          <span className="inline-block px-[9px] py-[6px] rounded-full text-[10px] font-semibold text-accent-green bg-accent-green-dark">✓ Played</span>
        ) : (
          <span className="inline-block px-[9px] py-[6px] rounded-full text-[10px] font-semibold text-accent-purple bg-accent-purple-dark">Not Played</span>
        )}

        <button
          type="button"
          aria-pressed={isWishlist}
          className={`wishlist-button ${wishlistColor}`}
          onClick={() => toggleWishlist(game.id)}
        >
          {isWishlist ? "♥ Remove from Wishlist" : "♡ Add to Wishlist"}
        </button>
      </div>
    </article>
  );
}

export default GameCard;