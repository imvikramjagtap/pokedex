import { useState } from 'react';
import { type Pokemon, useGetPokemons } from '../../hooks/useGetPokemons';
import { useNavigate, useParams } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { PokemonDetailsDialog } from '../PokemonView';
import { Search } from 'lucide-react';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Filter pokemons based on search term
  const filteredPokemons = pokemons.filter(
    (pkmn) =>
      pkmn.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkmn.number.includes(searchTerm)
  );

  const params = useParams();
  const pokemonName = params.pokemonName || '';

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h1 className={classes.title}>Pokédex</h1>
        <p className={classes.subtitle}>Discover and explore Pokémon</p>
      </div>

      <div className={classes.searchContainer}>
        <div className={classes.searchInputWrapper}>
          <Search size={20} className={classes.searchIcon} />
          <input
            type="text"
            placeholder="Search Pokémon by name or number"
            className={classes.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className={classes.clearButton}
              onClick={() => setSearchTerm('')}
            >
              ×
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className={classes.loadingContainer}>
          <div className={classes.loadingSpinner}></div>
          <div className={classes.loading}>Loading Pokémon...</div>
        </div>
      ) : (
        <>
          {filteredPokemons.length === 0 ? (
            <div className={classes.noResults}>
              <div className={classes.noResultsIcon}>?</div>
              <div className={classes.noResultsText}>
                No Pokémon found matching your search
              </div>
              <button
                className={classes.resetButton}
                onClick={() => setSearchTerm('')}
              >
                Reset Search
              </button>
            </div>
          ) : (
            <>
              <div className={classes.resultsCount}>
                Found{' '}
                <span className={classes.countHighlight}>
                  {filteredPokemons.length}
                </span>{' '}
                Pokémon
              </div>
              <div className={classes.pokemonGrid}>
                {filteredPokemons.map((pkmn: Pokemon) => (
                  <div
                    key={pkmn.id}
                    className={classes.pokemonCard}
                    onClick={() => navigate(`/pokemon/${pkmn.name}`)}
                  >
                    <div className={classes.cardInner}>
                      <div className={classes.imageContainer}>
                        <img
                          src={pkmn.image || '/placeholder.svg'}
                          alt={pkmn.name}
                          className={classes.pokemonImage}
                        />
                      </div>
                      <div className={classes.pokemonInfo}>
                        <p className={classes.pokemonNumber}>#{pkmn.number}</p>
                        <h3 className={classes.pokemonName}>{pkmn.name}</h3>
                        <div className={classes.pokemonTypes}>
                          {pkmn.types.map((type) => (
                            <span key={type} className={classes.pokemonType}>
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
      <PokemonDetailsDialog pokemonName={pokemonName} />
    </div>
  );
};

const useStyles = createUseStyles(
  {
    '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
    '@keyframes fadeIn': {
      '0%': { opacity: 0, transform: 'translateY(10px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' },
    },
    '@keyframes pulse': {
      '0%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.05)' },
      '100%': { transform: 'scale(1)' },
    },
    root: {
      width: '100%',
      padding: '32px',
      boxSizing: 'border-box',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px',
      animation: '$fadeIn 0.6s ease-out',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 700,
      margin: '0 0 8px 0',
      color: '#212529',
      letterSpacing: '-0.5px',
    },
    subtitle: {
      fontSize: '1.1rem',
      color: '#6c757d',
      margin: 0,
      fontWeight: 400,
    },
    searchContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '32px',
      animation: '$fadeIn 0.8s ease-out',
    },
    searchInputWrapper: {
      position: 'relative',
      width: '100%',
      maxWidth: '600px',
      display: 'flex',
      alignItems: 'center',
    },
    searchIcon: {
      position: 'absolute',
      left: '16px',
      color: '#adb5bd',
      pointerEvents: 'none',
    },
    searchInput: {
      width: '100%',
      color: '#212529',
      padding: '14px 20px 14px 46px',
      fontSize: '1rem',
      borderRadius: '30px',
      border: '1px solid #dee2e6',
      boxShadow: '0 4px 6px rgba(0,0,0,0.04)',
      transition: 'all 0.3s ease',
      backgroundColor: 'white',
      '&:focus': {
        outline: 'none',
        borderColor: '#4dabf7',
        boxShadow: '0 4px 10px rgba(77, 171, 247, 0.2)',
      },
      '&::placeholder': {
        color: '#adb5bd',
      },
    },
    clearButton: {
      position: 'absolute',
      right: '16px',
      background: 'none',
      border: 'none',
      fontSize: '20px',
      color: '#adb5bd',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: '#f1f3f5',
        color: '#495057',
      },
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 0',
      animation: '$fadeIn 0.5s ease-out',
    },
    loadingSpinner: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      border: '3px solid rgba(0,0,0,0.1)',
      borderTopColor: '#4dabf7',
      animation: '$spin 1s linear infinite',
      marginBottom: '16px',
    },
    loading: {
      fontSize: '1.1rem',
      color: '#6c757d',
      fontWeight: 500,
    },
    noResults: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 0',
      animation: '$fadeIn 0.5s ease-out',
    },
    noResultsIcon: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: '#f1f3f5',
      color: '#adb5bd',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '32px',
      fontWeight: 'bold',
      marginBottom: '16px',
    },
    noResultsText: {
      fontSize: '1.2rem',
      color: '#495057',
      marginBottom: '24px',
      textAlign: 'center',
    },
    resetButton: {
      backgroundColor: '#4dabf7',
      color: 'white',
      border: 'none',
      borderRadius: '20px',
      padding: '10px 20px',
      fontSize: '0.9rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      boxShadow: '0 2px 4px rgba(77, 171, 247, 0.2)',
      '&:hover': {
        backgroundColor: '#339af0',
        boxShadow: '0 4px 8px rgba(77, 171, 247, 0.3)',
      },
    },
    resultsCount: {
      textAlign: 'center',
      fontSize: '1rem',
      color: '#6c757d',
      marginBottom: '24px',
      animation: '$fadeIn 0.5s ease-out',
    },
    countHighlight: {
      fontWeight: 600,
      color: '#4dabf7',
    },
    pokemonGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '24px',
      justifyContent: 'center',
      animation: '$fadeIn 0.5s ease-out',
    },
    pokemonCard: {
      borderRadius: '16px',
     
      overflow: 'hidden',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      '&:hover': {
        transform: 'translateY(-8px)',
        '& $cardInner': {
          boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
        },
        '& $pokemonImage': {
          transform: 'scale(1.08)',
        },
      },
    },
    cardInner: {
      backgroundColor: 'white',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.06)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'box-shadow 0.3s ease',
    },
    imageContainer: {
      backgroundColor: '#f8f9fa',
      border:'1px solid white',
      borderRadius: '16px',
      borderBottom: 'none',
      borderBottomRightRadius: '0px',
      borderBottomLeftRadius: '0px',
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      position: 'relative',
      height: '200px',
      '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          'radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(248,249,250,0) 70%)',
        opacity: 0.6,
      },
    },
    pokemonImage: {
      maxWidth: '100%',
      maxHeight: '180px',
      objectFit: 'contain',
      transition: 'transform 0.4s ease',
      position: 'relative',
      zIndex: 2,
    },
    pokemonInfo: {
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
    pokemonName: {
      margin: '8px 0 16px 0',
      fontSize: '1.4rem',
      fontWeight: 600,
      color: '#212529',
      textTransform: 'capitalize',
    },
    pokemonNumber: {
      color: '#adb5bd',
      fontSize: '0.9rem',
      fontWeight: 500,
      margin: 0,
    },
    pokemonTypes: {
      display: 'flex',
      gap: '8px',
      marginTop: 'auto',
    },
    pokemonType: {
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: 600,
      color: '#212529',
      backgroundColor: '#e9ecef',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      transition: 'all 0.2s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      },
    },
  },
  { name: 'PokemonList' }
);
