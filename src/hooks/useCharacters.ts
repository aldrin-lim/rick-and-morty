import { useQuery } from "@apollo/client"
import gql from "graphql-tag"
import {
  CharactersData,
  CharactersVars,
  FilterCharacter,
} from "../types/character"

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        species
        image
        gender
        origin {
          name
        }
        location {
          name
        }
      }
    }
  }
`

export const useCharacters = (page?: number, filter?: FilterCharacter) => {
  const { loading, error, data } = useQuery<CharactersData, CharactersVars>(
    GET_CHARACTERS,
    {
      variables: { page, filter },
    },
  )

  return { loading, error, data }
}
