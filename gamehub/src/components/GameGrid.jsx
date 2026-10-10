import GameCard from "./GameCard";
import { useTheme } from "../context/ThemeContext.jsx";

function GameGrid({
  games,
  emptyTitle = "No Games Found",
  emptyMessage = "Try searching for a different game or check again later.",
}) {
  const { darkMode } = useTheme();

  if (games.length === 0) {
    const surface = darkMode
      ? "bg-dark-card border-[#35425a]"
      : "bg-white border-gray-300";
    const messageText = darkMode ? "text-dark-text" : "text-gray-600";

    return (
      <div className={`p-[60px_20px] text-center border border-dashed rounded-[14px] ${surface}`}>
        <h3>{emptyTitle}</h3>
        <p className={`text-xs ${messageText}`}>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-[18px] 2xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}

export default GameGrid;