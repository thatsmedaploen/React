import { useTheme } from "../context/ThemeContext.jsx";

function ProfileCard({ name, totalGames, playedGames, wishlistCount }) {
  const { darkMode } = useTheme();

  const progress = totalGames ? Math.round((playedGames / totalGames) * 100) : 0;

  const surface = darkMode
    ? "bg-dark-card border-dark-border"
    : "bg-white border-gray-200";
  const mutedText = darkMode ? "text-dark-text" : "text-gray-600";
  const track = darkMode ? "bg-[#1e293b]" : "bg-gray-200";

  let statusMessage = "Belum ada game yang dimainkan. Mulai dari koleksi kamu!";
  if (progress === 100) {
    statusMessage = "Semua game di koleksi sudah kamu mainkan. Keren!";
  } else if (playedGames > 0) {
    statusMessage = `${totalGames - playedGames} game lagi menunggu untuk dimainkan.`;
  }

  return (
    <div className={`flex items-center gap-5 p-[22px] border rounded-[14px] sm:flex-col sm:items-start ${surface}`}>
      <div className="flex-shrink-0 flex items-center justify-center w-[64px] h-[64px] rounded-full bg-primary text-2xl font-bold text-white">
        {name.charAt(0)}
      </div>

      <div className="flex-1 w-full">
        <h3 className="m-0 text-lg">{name}</h3>
        <p className={`my-1 text-xs ${mutedText}`}>
          {playedGames} dari {totalGames} game dimainkan · {wishlistCount} di wishlist
        </p>

        <div
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progres game yang sudah dimainkan"
          className={`h-2 mt-3 rounded-full overflow-hidden ${track}`}
        >
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className={`mt-3 mb-0 text-xs ${mutedText}`}>{statusMessage}</p>
      </div>
    </div>
  );
}

export default ProfileCard;