
export interface CharacterInfo {
  count: number
  pages: number
  next: number | null
  prev: number | null
}

export interface CharacterResult {
  id: string
  name: string
  species: string
  image: string
  gender: string
  origin: {
    name: string
  }
  location: {
    name: string
  }
}

export interface CharactersData {
  characters?: {
    info: CharacterInfo
    results: CharacterResult[]
  }
}

export interface FilterCharacter {
  name?: string
  status?: string
  species?: string
  type?: string
  gender?: string
}

export interface CharactersVars {
  page?: number
  filter?: FilterCharacter
}