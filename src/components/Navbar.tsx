import { MenuIcon } from "lucide-react";

const Navbar = () => {
    return (
        <header className="flex relative justify-center px-2 md:px-12 items-center text-2xl h-16 w-[100%] bg-base-red text-white">
            <MenuIcon size={32} className="absolute left-2" />
            <p className="font-impact text-3xl flex-1 items-center text-center">Pokedex</p>
            {/* <nav>
                <ul className="flex gap-2 font-navigation text-lg">
                    <li className="hover:underline hover:scale-105 transform transition-all duration-200 font-bold"><a href="/pokedex">Pokedex</a></li>
                    <li className="hover:underline hover:scale-105 transform transition-all duration-200 font-bold"><a href="/meutime">Monte seu time</a></li>
                </ul>
            </nav> */}
        </header>
    );
}

export default Navbar;