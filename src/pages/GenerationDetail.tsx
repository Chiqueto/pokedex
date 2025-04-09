import PokeCard from '@/components/PokeCard';
import { Pokemon } from '@/types/Pokemon';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Generation {
    id: number;
    name: string;
    main_region: {
        name: string;
    };
    pokemon_species: { name: string }[];
    version_groups: { name: string }[];
}

const GenerationDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [generation, setGeneration] = useState<Generation | null>(null);
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGenerationData = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/generation/${id}/`);
                if (!response.ok) throw new Error('Erro ao buscar dados da geração');
                const data: Generation = await response.json();
                setGeneration(data);

                // Buscar detalhes de cada Pokémon
                const promises = data.pokemon_species.map((species) =>
                    fetch(`https://pokeapi.co/api/v2/pokemon/${species.name}`).then((res) => res.json())
                );

                const detailedPokemons = await Promise.all(promises);
                setPokemons(detailedPokemons);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchGenerationData();
    }, [id]);

    if (loading) return <div className="text-center mt-10 text-xl">Carregando...</div>;
    if (!generation) return <div className="text-center mt-10 text-xl">Geração não encontrada.</div>;

    return (
        <div className="min-h-screen bg-white px-4 py-10 flex flex-col items-center gap-6">
            <h1 className="text-4xl font-bold text-red-600 capitalize">{generation.name.replace('-', ' ')}</h1>
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
                    <PokeCard
                        key={pokemon.id}
                        pokemon={pokemon}
                        setSelectedPokemon={() => { }}
                    />
                ))}
            </ul>
        </div>
    );
};

export default GenerationDetails;
