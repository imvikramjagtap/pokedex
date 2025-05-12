import { gql, useQuery } from "@apollo/react-hooks";

const GET_POKEMON = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const useGetPokemonDetails = (name: string | undefined) => {
  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: { name },
    skip: !name,
  });

  return {
    loading,
    error,
    pokemon: data?.pokemon || null,
  };
};