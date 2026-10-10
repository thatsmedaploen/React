import { useTheme } from "../context/ThemeContext.jsx";

const NAV_ITEMS = [
  { href: "#home", label: "⌂ Home" },
  { href: "#library", label: "▦ Library" },
  { href: "#wishlist", label: "♡ Wishlist" },
  { href: "#profile", label: "♙ Profile" },
];

function Sidebar({ isOpen, onNavigate }) {
  const { darkMode } = useTheme();

  const surface = darkMode
    ? "bg-dark-bg border-dark-border"
    : "bg-white border-gray-300";
  const linkText = darkMode ? "text-dark-text" : "text-gray-600";
  const footerText = darkMode ? "text-dark-text" : "text-gray-600";
  const footerMuted = darkMode ? "text-dark-muted" : "text-gray-500";

  return (
    <aside
      id="primary-sidebar"
      aria-hidden={!isOpen}
      inert={!isOpen}
      className={`fixed top-0 left-0 z-50 h-screen w-[250px] flex-shrink-0 flex flex-col py-7 px-[18px] border-r shadow-2xl transition-transform duration-300 2xl:w-[220px] 2xl:py-5 2xl:px-[14px] md:w-[230px] ${surface} ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center gap-[10px] text-2xl font-black mb-12 sm:mb-[35px]">
        <span className="text-[27px]">🎮</span>
        <span>GameHub</span>
      </div>

      <nav className="grid gap-[10px] w-full" aria-label="Navigasi utama">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`px-[15px] py-[13px] rounded-lg text-sm transition-all duration-200 hover:bg-primary hover:text-white active:bg-primary active:text-white ${linkText}`}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className={`grid gap-[7px] mt-auto text-xs ${footerText}`}>
        <span>Personal Game Library</span>
        <small className={footerMuted}>Version 1.0</small>
      </div>
    </aside>
  );
}

export default Sidebar;