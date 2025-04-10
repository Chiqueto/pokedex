import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="fixed top-0 w-full z-50 bg-base-red text-white shadow-lg transition-all duration-300">
            <div className="max-w-7xl mx-auto relative flex items-center justify-between h-16 px-4 md:px-8">

                {/* Botão de Menu Mobile */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden p-2 text-white focus:outline-none z-10"
                >
                    {menuOpen ? <XIcon size={28} /> : <MenuIcon size={28} />}
                </button>

                {/* Título centralizado */}
                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-impact">
                    Pokedex
                </h1>

                {/* Menu Desktop à direita */}
                <nav className="hidden md:block">
                    <ul className="flex flex-row gap-4 text-lg">
                        <li>
                            <Link to="/" className="hover:text-gray-200 transition">Pokedex</Link>
                        </li>
                        <li>
                            <Link to="/generations" className="hover:text-gray-200 transition">Gerações</Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Menu Mobile */}
            {menuOpen && (
                <nav className="md:hidden bg-base-red border-t border-white">
                    <ul className="flex flex-col gap-4 p-4 text-lg">
                        <li><Link to="/" onClick={toggleMenu} className="hover:text-gray-200 transition">Pokedex</Link></li>
                        <li><Link to="/generations" onClick={toggleMenu} className="hover:text-gray-200 transition">Gerações</Link></li>
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Navbar;
