export type DrinkType = 'cocktail' | 'mocktail'
export type Recipe = {
  id: string
  name: string
  type: DrinkType
  category: string
  profile: string[]
  strength: string
  ingredients: { name: string; amount: string }[]
  method: string[]
  glass: string
  garnish: string
  notes: string
  original: boolean
}