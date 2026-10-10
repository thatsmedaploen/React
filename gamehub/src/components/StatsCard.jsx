import { useTheme } from "../context/ThemeContext.jsx";

function StatsCard({ icon, label, value, color }) {
  const { darkMode } = useTheme();

  const surface = darkMode
    ? "bg-dark-card border-dark-border"
    : "bg-white border-gray-200";
  const labelText = darkMode ? "text-dark-text" : "text-gray-600";

  return (
    <div className={`flex items-center gap-[13px] p-5 border rounded-[14px] ${surface}`}>
      <div
        className="flex-shrink-0 flex items-center justify-center w-[43px] h-[43px] rounded-lg text-[21px] text-white"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>

      <div>
        <p className={`m-0 mb-2 text-[11px] ${labelText}`}>{label}</p>
        <h2 className="m-0 text-2xl">{value}</h2>
      </div>
    </div>
  );
}

export default StatsCard;