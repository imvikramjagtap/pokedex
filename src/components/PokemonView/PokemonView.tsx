import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@material-ui/core';
import { CircleX } from 'lucide-react';
import { useGetPokemonDetails } from '../../hooks/useGetPokemon';

type PokemonDetailsDialogProps = {
  pokemonName: string;
};

export const PokemonDetailsDialog: React.FC<PokemonDetailsDialogProps> = ({
  pokemonName,
}) => {
  const navigate = useNavigate();
  const { pokemon, loading, error } = useGetPokemonDetails(pokemonName);

  const handleClose = () => {
    navigate('/pokemon');
  };

  const classes = useStyles();

  if (!pokemonName) return null;

  return (
    <Dialog open={!!pokemonName} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <div className={classes.dialogTitleContainer}>
          {loading ? 'Loading...' : `${pokemon?.name} #${pokemon?.number}`}
          <IconButton className={classes.blackText} onClick={handleClose}>
            <CircleX color="#141414" />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        {loading ? (
          <div className={classes.progressBar}></div>
        ) : error ? (
          <div className={classes.errorText}>Error loading Pokémon details</div>
        ) : pokemon ? (
          <div className={classes.detailsContainer}>
            <div className={classes.imageContainer}>
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className={classes.detailImage}
              />
            </div>
            <div className={classes.infoContainer}>
              <div className={classes.detailHeading}>Classification</div>
              <p className={classes.blackText}>{pokemon.classification}</p>

              <div className={classes.detailHeading}>Types</div>
              <div className={classes.chipContainer}>
                {pokemon.types.map((type: string) => (
                  <div key={type} className={classes.typeChip}>
                    {type}
                  </div>
                ))}
              </div>

              <div className={classes.statsRow}>
                <div className={classes.statsColumn}>
                  <div className={classes.detailHeading}>Height</div>
                  <p className={classes.blackText}>
                    Min: {pokemon.height.minimum}
                  </p>
                  <p className={classes.blackText}>
                    Max: {pokemon.height.maximum}
                  </p>
                </div>
                <div className={classes.statsColumn}>
                  <div className={classes.detailHeading}>Weight</div>
                  <p className={classes.blackText}>
                    Min: {pokemon.weight.minimum}
                  </p>
                  <p className={classes.blackText}>
                    Max: {pokemon.weight.maximum}
                  </p>
                </div>
              </div>

              <div className={classes.detailHeading}>Battle Stats</div>
              <p className={classes.blackText}>Max CP: {pokemon.maxCP}</p>
              <p className={classes.blackText}>Max HP: {pokemon.maxHP}</p>
              <p className={classes.blackText}>Flee Rate: {pokemon.fleeRate}</p>

              <div className={classes.detailHeading}>Weaknesses</div>
              <div className={classes.chipContainer}>
                {pokemon.weaknesses.map((w: string) => (
                  <div key={w} className={classes.weaknessChip}>
                    {w}
                  </div>
                ))}
              </div>

              <div className={classes.detailHeading}>Resistances</div>
              <div className={classes.chipContainer}>
                {pokemon.resistant.map((r: string) => (
                  <div key={r} className={classes.resistanceChip}>
                    {r}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>No Pokémon found</div>
        )}
      </DialogContent>
    </Dialog>
  );
};

const useStyles = createUseStyles(
  {
    dialogTitleContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#000',
    },
    progressBar: {
      height: '4px',
      width: '100%',
      background: 'linear-gradient(to right, #2196f3, #21cbf3)',
      animation: '$loading 1.5s infinite',
    },
    '@keyframes loading': {
      '0%': { transform: 'translateX(-100%)' },
      '50%': { transform: 'translateX(0%)' },
      '100%': { transform: 'translateX(100%)' },
    },
    errorText: {
      color: 'red',
      fontWeight: 'bold',
      marginBottom: '16px',
    },
    detailsContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: '32px',
      padding: '16px 0',
    },
    imageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f4f4f4',
      borderRadius: '12px',
      padding: '20px',
      flex: '1 1 300px',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    },
    infoContainer: {
      flex: '1 1 400px',
      color: '#333',
    },
    detailImage: {
      width: '100%',
      maxHeight: '280px',
      objectFit: 'contain',
    },
    detailHeading: {
      marginTop: '20px',
      marginBottom: '8px',
      fontSize: '1.1rem',
      fontWeight: 600,
      color: '#111',
      borderBottom: '1px solid #ddd',
      paddingBottom: '4px',
    },
    typeChip: {
      backgroundColor: '#e0f2f1',
      color: '#004d40',
      fontWeight: 500,
      fontSize: '0.85rem',
      borderRadius: '16px',
      padding: '4px 12px',
      margin: '4px 6px 4px 0',
      display: 'inline-block',
    },
    weaknessChip: {
      backgroundColor: '#ffcdd2',
      color: '#b71c1c',
      fontWeight: 500,
      fontSize: '0.85rem',
      borderRadius: '16px',
      padding: '4px 12px',
      margin: '4px 6px 4px 0',
      display: 'inline-block',
    },
    resistanceChip: {
      backgroundColor: '#bbdefb',
      color: '#000000',
      fontWeight: 500,
      fontSize: '0.85rem',
      borderRadius: '16px',
      padding: '4px 12px',
      margin: '4px 6px 4px 0',
      display: 'inline-block',
    },
    chipContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginBottom: '16px',
    },
    statsRow: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: '24px',
      marginBottom: '20px',
    },
    statsColumn: {
      flex: '1 1 160px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '12px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      color: '#222',
    },
    blackText: {
      color: '#141414', // or 'black'
      fontSize: '16px',
      fontWeight: 500,
    },
  },
  { name: 'PokemonDetailsDialog' }
);
