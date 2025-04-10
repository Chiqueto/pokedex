import Loading from '@/components/Loading';
import PokeCard from '@/components/PokeCard';
import PokemonDetails from '@/components/PokemonDetails';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';
import { Pokemon } from '@/types/Pokemon';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Generation {
    id: number;
    name: string;
    main_region: {
        name: string;
    };
    pokemon_species: { name: string, url: string }[];
    version_groups: { name: string }[];
}

const GenerationDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [generation, setGeneration] = useState<Generation | null>(null);
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>()


    useEffect(() => {
        const fetchGenerationData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://pokeapi.co/api/v2/generation/${id}/`);
                if (!response.ok) throw new Error('Erro ao buscar dados da geração');
                const data: Generation = await response.json();
                setGeneration(data);

                const promises = data.pokemon_species.map((species) => {
                    const id = species.url.split('/').filter(Boolean).pop();
                    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json());
                });

                const detailedPokemons = await Promise.all(promises);
                detailedPokemons.sort((a, b) => a.id - b.id);
                setPokemons(detailedPokemons);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchGenerationData();
    }, [id]);


    if (!generation && loading) return <Loading loading color="red" size={100} />;
    if (!generation) return <div className="text-center mt-20 text-xl">Geração não encontrada.</div>;

    return (
        <Drawer>

            <div className="min-h-screen bg-white px-4 py-10 flex flex-col items-center gap-6">
                <h1 className="text-center text-3xl font-impact text-base-red mb-6">{generation.name.replace('-', ' ')}</h1>
                <p className="text-lg">
                    <strong>Região Principal:</strong> {generation.main_region.name}
                </p>
                <p className="text-lg">
                    <strong>Jogos Principais:</strong> {generation.version_groups.map((vg) => vg.name).join(', ')}
                </p>
                <p className="text-lg">
                    <strong>Número de Pokémon Introduzidos:</strong> {generation.pokemon_species.length}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-screen-xl">
                    {pokemons.map((pokemon) => (
                        <DrawerTrigger>
                            <PokeCard
                                key={pokemon.id}
                                pokemon={pokemon}
                                setSelectedPokemon={() => { setSelectedPokemon(pokemon) }}
                            />
                        </DrawerTrigger>
                    ))}
                </ul>
                {selectedPokemon &&
                    <PokemonDetails selectedPokemon={selectedPokemon} />
                }
                {loading && <Loading loading color="red" size={100} />}

            </div>
        </Drawer>
    );
};

export default GenerationDetails;
