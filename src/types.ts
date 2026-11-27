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

export type RecipeStructure =
  | 'sour'
  | 'spirit-forward'
  | 'highball'
  | 'collins'
  | 'fizz'
  | 'spritz'
  | 'tiki'
  | 'smash'
  | 'creamy'
  | 'non-alcoholic-signature'

export type PreparationTechnique =
  | 'shake'
  | 'stir'
  | 'build'
  | 'blend'
  | 'roll'
  | 'muddle'
  | 'throw'

export type RecipeIngredientRole =
  | 'base'
  | 'acid'
  | 'sweet'
  | 'modifier'
  | 'diluent'
  | 'garnish'

export type DataConfidence =
  | 'confirmed'
  | 'estimated'
  | 'unknown'

export type RecipeValidationStatus =
  | 'valid'
  | 'needs-review'
  | 'rejected'

export type ExpertRecipe = Recipe & {
  technical: {
    structure: RecipeStructure
    technique: PreparationTechnique
    validation: RecipeValidationStatus
  }
}