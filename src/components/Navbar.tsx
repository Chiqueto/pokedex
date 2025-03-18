const Navbar = () => {
    return (
        <header className="flex justify-between px-2 items-center text-2xl h-14 w-[100%] bg-amber-400 text-white">
            <p className="font-impact text-2xl">Pokemon API</p>
            <nav>
                <ul className="flex gap-2 font-navigation text-lg">
                    <li><a className="hover:underline" href="/pokedex">Pokedex</a></li>
                    <li><a className="hover:underline" href="/meutime">Monte seu time</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;