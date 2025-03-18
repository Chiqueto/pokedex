const Navbar = () => {
    return (
        <header className="flex justify-between px-2 md:px-12 items-center text-2xl h-14 w-[100%] bg-amber-400 text-white">
            <p className="font-impact text-2xl">Pokemon API</p>
            <nav>
                <ul className="flex gap-2 font-navigation text-lg">
                    <li className="hover:underline hover:scale-105 transform transition-all duration-200 font-bold"><a href="/pokedex">Pokedex</a></li>
                    <li className="hover:underline hover:scale-105 transform transition-all duration-200 font-bold"><a href="/meutime">Monte seu time</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;