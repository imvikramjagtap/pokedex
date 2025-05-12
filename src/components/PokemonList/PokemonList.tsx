import React from 'react';
import { createUseStyles } from 'react-jss';
import { Pokemon, useGetPokemons } from '../../hooks/useGetPokemons';


export const PokemonList: React.FC = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();

  return (
    <div className={classes.root}>
      {loading ? (
        <div className={classes.loading}>Loading Pokémon...</div>
      ) : (
        <div className={classes.pokemonGrid}>
          {pokemons.map((pkmn: Pokemon) => (
            <div key={pkmn.id} className={classes.pokemonCard}>
              <img
                src={pkmn.image}
                alt={pkmn.name}
                className={classes.pokemonImage}
              />
              <div className={classes.pokemonInfo}>
                <h3 className={classes.pokemonName}>{pkmn.name}</h3>
                <p className={classes.pokemonNumber}>#{pkmn.number}</p>
                <div className={classes.pokemonTypes}>
                  {pkmn.types.map((type) => (
                    <span
                      key={type}
                      className={`${classes.pokemonType}`}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      padding: '32px',
      boxSizing: 'border-box',
      backgroundColor: '#f5f5f5',
    },
    loading: {
      textAlign: 'center',
      fontSize: '1.5rem',
      color: '#888',
      padding: '20px',
    },
    pokemonGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px',
      justifyContent: 'center',
    },
    pokemonCard: {
      backgroundColor: 'white',
      padding: '2px',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer'
      },
    },
    pokemonImage: {
      width: '100%',
      height: '250px',
      objectFit: 'fill',
      backgroundColor: '#f0f0f0',
    },
    pokemonInfo: {
      padding: '15px',
      textAlign: 'center',
    },
    pokemonName: {
      margin: '0 0 10px 0',
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#333',
    },
    pokemonNumber: {
      color: '#888',
      marginBottom: '10px',
    },
    pokemonTypes: {
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
    },
    pokemonType: {
      padding: '5px 10px',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: 'bold',
      color: 'black',
      textTransform: 'uppercase',
    },
  },
  { name: 'PokemonList' }
);
