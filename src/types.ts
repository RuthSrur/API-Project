export interface Location {
  name: string
  url: string
}

export interface Character {
  id: number
  name: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
  type: string
  gender: string
  origin: Location
  location: Location
  image: string
  episode: string[]
  url: string
  created: string
}
