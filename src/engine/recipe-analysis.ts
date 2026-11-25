
import {
  findIngredient,
  type Ingredient,
} from './ingredients'

export type RecipeIngredientInput = {
  name: string
  amount: string
}

export type ParsedIngredient = {
  originalName: string
  quantity: number
  unit: string
  ingredient: Ingredient | undefined
}

export function parseIngredientAmount(
  amount: string
): { quantity: number; unit: string } {
  const normalized = amount.trim().replace(',', '.')

  const match = normalized.match(
    /^(\d+(?:\.\d+)?)\s*(.*)$/
  )

  if (!match) {
    return {
      quantity: 1,
      unit: 'portion',
    }
  }

  return {
    quantity: Number(match[1]),
    unit: match[2].trim().toLowerCase() || 'portion',
  }
}

export function parseRecipeIngredients(
  inputs: RecipeIngredientInput[]
): ParsedIngredient[] {
  return inputs.map((item) => {
    const parsed = parseIngredientAmount(item.amount)

    return {
      originalName: item.name,
      quantity: parsed.quantity,
      unit: parsed.unit,
      ingredient: findIngredient(item.name),
    }
  })
}

function getIngredientWeight(item: ParsedIngredient): number {
  const { quantity, unit } = item

  const conversions: Record<string, number> = {
    ml: 1,
    cl: 10,
    l: 1000,
    dash: 1,
    dashes: 1,
    trait: 1,
    traits: 1,
    goutte: 0.05,
    gouttes: 0.05,
    drop: 0.05,
    drops: 0.05,
    cuillère: 5,
    cuillere: 5,
    'cuillère à café': 5,
    'cuillère à soupe': 15,
    tsp: 5,
    tbsp: 15,
    feuille: 0.5,
    feuilles: 0.5,
    branche: 1,
    branches: 1,
    tranche: 2,
    tranches: 2,
    quartier: 5,
    quartiers: 5,
    pièce: 10,
    pieces: 10,
    portions: 10,
    portion: 10,
  }

  return quantity * (conversions[unit] ?? 1)
}

import {
  analyzeBalance,
  calculateBalanceScore,
  generateBalanceSuggestions,
  type BalanceAnalysis,
  type BalanceProfile,
} from './balance'

export type RecipeBalanceResult = BalanceAnalysis & {
  unknownIngredients: string[]
}

export function analyzeWeightedRecipe(
  inputs: RecipeIngredientInput[]
): RecipeBalanceResult {
  const parsed = parseRecipeIngredients(inputs)

  const recognized = parsed.filter(
    (item) => item.ingredient !== undefined
  )

  const unknownIngredients = parsed
    .filter((item) => item.ingredient === undefined)
    .map((item) => item.originalName)

  const totalWeight = recognized.reduce(
    (sum, item) => sum + getIngredientWeight(item),
    0
  )

  const profile: BalanceProfile = {
    acidity: 0,
    sweetness: 0,
    bitterness: 0,
    body: 0,
    intensity: 0,
  }

  if (totalWeight > 0) {
    const keys: (keyof BalanceProfile)[] = [
      'acidity',
      'sweetness',
      'bitterness',
      'body',
      'intensity',
    ]

    for (const item of recognized) {
      const ingredient = item.ingredient!
      const weight = getIngredientWeight(item) / totalWeight

      for (const key of keys) {
        profile[key] += ingredient.taste[key] * weight
      }
    }
  }

  const score = calculateBalanceScore(profile)
  const { strengths, weaknesses } = analyzeBalance(profile)
  const suggestions = generateBalanceSuggestions(profile)

  return {
    score,
    profile,
    strengths,
    weaknesses,
    suggestions,
    unknownIngredients,
  }
}
