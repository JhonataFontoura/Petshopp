import { useTheme } from "../context/ThemeContext";
import { IconPaw, IconSun, IconMoon } from "./Icons";

export default function Navbar({ activeSection }) {
  const { isDark, toggleTheme } = useTheme();

  const links = [
    { id: "dashboard", label: "Dashboard" },
    { id: "produtos", label: "Produtos" },
    { id: "vendas", label: "Vendas" },
  ];

  return (
    <header className="navbar" role="banner">
      <div className="navbar__inner">
        <a href="#dashboard" className="navbar__brand">
          <div className="navbar__logo" aria-hidden="true">
            <IconPaw size={22} strokeWidth={2.5} />
          </div>
          <div>
            <div className="navbar__title">Petshopp</div>
            <div className="navbar__subtitle">Gestão inteligente</div>
          </div>
        </a>

        <div className="navbar__actions">
          <nav className="navbar__nav" aria-label="Navegação principal">
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`navbar__link ${activeSection === link.id ? "navbar__link--active" : ""}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
            title={isDark ? "Modo claro" : "Modo escuro"}
          >
            {isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
