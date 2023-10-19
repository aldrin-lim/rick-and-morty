// hooks/useCharacters.ts
import { useQuery } from "@apollo/client"
import gql from "graphql-tag"

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

interface CharacterInfo {
  count: number
  pages: number
  next: number | null
  prev: number | null
}

interface CharacterResult {
  id: string
  name: string
  species: string
  image: string
  origin: {
    name: string
  }
  location: {
    name: string
  }
}

interface CharactersData {
  characters: {
    info: CharacterInfo
    results: CharacterResult[]
  }
}

interface FilterCharacter {
  name?: string
  status?: string
  species?: string
  type?: string
  gender?: string
}

interface CharactersVars {
  page?: number
  filter?: FilterCharacter
}

export const useCharacters = (page?: number, filter?: FilterCharacter) => {
  const { loading, error, data } = useQuery<CharactersData, CharactersVars>(
    GET_CHARACTERS,
    {
      variables: { page, filter },
    },
  )

  return { loading, error, charcters: data?.characters }
}
