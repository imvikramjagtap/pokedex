import type React from 'react';

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
    <Dialog
      open={!!pokemonName}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      classes={{ paper: classes.dialogPaper }}
    >
      <DialogTitle>
        <div className={classes.dialogTitleContainer}>
          {loading ? (
            'Loading...'
          ) : (
            <span className={classes.titleText}>
              {pokemon?.name}{' '}
              <span className={classes.pokemonNumber}>#{pokemon?.number}</span>
            </span>
          )}
          <IconButton className={classes.closeButton} onClick={handleClose}>
            <CircleX color='#161616' />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {loading ? (
          <div className={classes.loadingContainer}>
            <div className={classes.progressBar}></div>
            <p className={classes.loadingText}>Loading Pokémon data...</p>
          </div>
        ) : error ? (
          <div className={classes.errorContainer}>
            <div className={classes.errorIcon}>!</div>
            <div className={classes.errorText}>
              Error loading Pokémon details
            </div>
          </div>
        ) : pokemon ? (
          <div className={classes.detailsContainer}>
            <div className={classes.imageContainer}>
              <div className={classes.imageWrapper}>
                <img
                  src={pokemon.image || '/placeholder.svg'}
                  alt={pokemon.name}
                  className={classes.detailImage}
                />
              </div>
              <div className={classes.typeBadges}>
                {pokemon.types.map((type: string) => (
                  <div key={type} className={classes.typeChip}>
                    {type}
                  </div>
                ))}
              </div>
            </div>
            <div className={classes.infoContainer}>
              <div className={classes.infoSection}>
                <div className={classes.detailHeading}>Classification</div>
                <p className={classes.classificationText}>
                  {pokemon.classification}
                </p>
              </div>

              <div className={classes.statsCards}>
                <div className={classes.statsCard}>
                  <div className={classes.statsCardTitle}>Height</div>
                  <div className={classes.statsCardContent}>
                    <div className={classes.statItem}>
                      <span className={classes.statLabel}>Min:</span>
                      <span className={classes.statValue}>
                        {pokemon.height.minimum}
                      </span>
                    </div>
                    <div className={classes.statItem}>
                      <span className={classes.statLabel}>Max:</span>
                      <span className={classes.statValue}>
                        {pokemon.height.maximum}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={classes.statsCard}>
                  <div className={classes.statsCardTitle}>Weight</div>
                  <div className={classes.statsCardContent}>
                    <div className={classes.statItem}>
                      <span className={classes.statLabel}>Min:</span>
                      <span className={classes.statValue}>
                        {pokemon.weight.minimum}
                      </span>
                    </div>
                    <div className={classes.statItem}>
                      <span className={classes.statLabel}>Max:</span>
                      <span className={classes.statValue}>
                        {pokemon.weight.maximum}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={classes.infoSection}>
                <div className={classes.detailHeading}>Battle Stats</div>
                <div className={classes.battleStats}>
                  <div className={classes.battleStat}>
                    <div className={classes.battleStatLabel}>Max CP</div>
                    <div className={classes.battleStatValue}>
                      {pokemon.maxCP}
                    </div>
                  </div>
                  <div className={classes.battleStat}>
                    <div className={classes.battleStatLabel}>Max HP</div>
                    <div className={classes.battleStatValue}>
                      {pokemon.maxHP}
                    </div>
                  </div>
                  <div className={classes.battleStat}>
                    <div className={classes.battleStatLabel}>Flee Rate</div>
                    <div className={classes.battleStatValue}>
                      {pokemon.fleeRate}
                    </div>
                  </div>
                </div>
              </div>

              <div className={classes.infoSection}>
                <div className={classes.detailHeading}>Weaknesses</div>
                <div className={classes.chipContainer}>
                  {pokemon.weaknesses.map((w: string) => (
                    <div key={w} className={classes.weaknessChip}>
                      {w}
                    </div>
                  ))}
                </div>
              </div>

              <div className={classes.infoSection}>
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
          </div>
        ) : (
          <div className={classes.notFound}>No Pokémon found</div>
        )}
      </DialogContent>
    </Dialog>
  );
};

const useStyles = createUseStyles(
  {
    dialogPaper: {
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow:
        '0 12px 28px rgba(0, 0, 0, 0.15), 0 8px 10px rgba(0, 0, 0, 0.12)',
      '&:hover': {
        boxShadow:
          '0 14px 32px rgba(0, 0, 0, 0.18), 0 10px 16px rgba(0, 0, 0, 0.14)',
      },
      transition: 'box-shadow 0.3s ease',
    },
    dialogTitleContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px 8px 8px 24px',
      borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    },
    titleText: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#212121',
      textTransform: 'capitalize',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    pokemonNumber: {
      fontSize: '1.1rem',
      color: '#757575',
      fontWeight: 500,
    },
    closeButton: {
      color: '#616161',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        color: '#212121',
      },
      transition: 'all 0.2s ease',
    },
    dialogContent: {
      padding: '24px',
      backgroundColor: '#fafafa',
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 0',
      gap: '16px',
    },
    loadingText: {
      color: '#757575',
      fontSize: '1rem',
      marginTop: '16px',
    },
    progressBar: {
      height: '4px',
      width: '70%',
      borderRadius: '2px',
      overflow: 'hidden',
      position: 'relative',
      backgroundColor: 'rgba(33, 150, 243, 0.1)',
      '&:after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '30%',
        background: 'linear-gradient(90deg, #2196f3, #21cbf3)',
        animation: '$loading 1.5s infinite ease-in-out',
        borderRadius: '2px',
      },
    },
    '@keyframes loading': {
      '0%': { left: '-30%' },
      '100%': { left: '100%' },
    },
    errorContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 0',
      gap: '16px',
    },
    errorIcon: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      backgroundColor: '#ffcdd2',
      color: '#b71c1c',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      fontWeight: 'bold',
    },
    errorText: {
      color: '#d32f2f',
      fontWeight: 500,
      fontSize: '1rem',
    },
    detailsContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: '32px',
    },
    imageContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      flex: '1 1 300px',
      minWidth: '280px',
    },
    imageWrapper: {
      backgroundColor: '#f5f5f5',
      borderRadius: '16px',
      padding: '24px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      position: 'relative',
      overflow: 'hidden',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
      },
      '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          'radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
        opacity: 0.6,
      },
    },
    detailImage: {
      width: '100%',
      maxHeight: '280px',
      objectFit: 'contain',
      position: 'relative',
      zIndex: 2,
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'scale(1.05)',
      },
    },
    typeBadges: {
      display: 'flex',
      justifyContent: 'center',
      gap: '12px',
      flexWrap: 'wrap',
    },
    infoContainer: {
      flex: '1 1 400px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    },
    infoSection: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '16px 20px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      },
    },
    detailHeading: {
      fontSize: '1.1rem',
      fontWeight: 600,
      color: '#424242',
      marginBottom: '12px',
      borderBottom: '2px solid #f0f0f0',
      paddingBottom: '8px',
      position: 'relative',
      '&:after': {
        content: '""',
        position: 'absolute',
        bottom: '-2px',
        left: 0,
        width: '60px',
        height: '2px',
        backgroundColor: '#2196f3',
      },
    },
    classificationText: {
      fontSize: '1rem',
      color: '#424242',
      margin: '8px 0',
    },
    statsCards: {
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap',
    },
    statsCard: {
      flex: '1 1 calc(50% - 8px)',
      minWidth: '140px',
      backgroundColor: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      },
    },
    statsCardTitle: {
      backgroundColor: '#e3f2fd',
      color: '#1976d2',
      padding: '8px 12px',
      fontSize: '0.9rem',
      fontWeight: 600,
      textAlign: 'center',
    },
    statsCardContent: {
      padding: '12px',
    },
    statItem: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '4px 0',
    },
    statLabel: {
      color: '#757575',
      fontSize: '0.9rem',
    },
    statValue: {
      color: '#212121',
      fontWeight: 500,
      fontSize: '0.9rem',
    },
    battleStats: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
    },
    battleStat: {
      flex: '1 1 calc(33.33% - 8px)',
      minWidth: '80px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      padding: '12px',
      textAlign: 'center',
      transition: 'transform 0.2s ease, background-color 0.2s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        backgroundColor: '#e8f5e9',
      },
    },
    battleStatLabel: {
      fontSize: '0.8rem',
      color: '#616161',
      marginBottom: '4px',
    },
    battleStatValue: {
      fontSize: '1.1rem',
      fontWeight: 600,
      color: '#2e7d32',
    },
    typeChip: {
      backgroundColor: '#e8f5e9',
      color: '#2e7d32',
      fontWeight: 500,
      fontSize: '0.85rem',
      borderRadius: '20px',
      padding: '6px 16px',
      display: 'inline-block',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      },
    },
    weaknessChip: {
      backgroundColor: '#ffebee',
      color: '#c62828',
      fontWeight: 500,
      fontSize: '0.85rem',
      borderRadius: '20px',
      padding: '6px 16px',
      display: 'inline-block',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      },
    },
    resistanceChip: {
      backgroundColor: '#e3f2fd',
      color: '#1565c0',
      fontWeight: 500,
      fontSize: '0.85rem',
      borderRadius: '20px',
      padding: '6px 16px',
      display: 'inline-block',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      },
    },
    chipContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
    },
    notFound: {
      textAlign: 'center',
      padding: '40px',
      color: '#757575',
      fontSize: '1.1rem',
    },
  },
  { name: 'PokemonDetailsDialog' }
);
