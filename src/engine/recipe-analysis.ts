
import {
  findIngredient,
  type Ingredient,
} from './ingredients'

import {
  analyzeBalance,
  calculateBalanceScore,
  generateBalanceSuggestions,
  type BalanceAnalysis,
  type BalanceProfile,
} from './balance'

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

export type RecipeBalanceResult = BalanceAnalysis & {
  unknownIngredients: string[]
  recognizedIngredients: number
  totalIngredients: number
  confidence: number
}

const UNIT_CONVERSIONS: Record<string, number> = {
  ml: 1,
  millilitre: 1,
  millilitres: 1,
  cl: 10,
  centilitre: 10,
  centilitres: 10,
  l: 1000,
  litre: 1000,
  litres: 1000,
  oz: 29.5735,
  ounce: 29.5735,
  ounces: 29.5735,

  dash: 0.8,
  dashes: 0.8,
  trait: 0.8,
  traits: 0.8,

  goutte: 0.05,
  gouttes: 0.05,
  drop: 0.05,
  drops: 0.05,

  cuillère: 5,
  cuillere: 5,
  'cuillère à café': 5,
  'cuillere a cafe': 5,
  'cuillère à soupe': 15,
  'cuillere a soupe': 15,
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
  portion: 10,
  portions: 10,
}

function normalizeUnit(unit: string): string {
  return unit
    .trim()
    .toLowerCase()
    .replace(/\./g, '')
    .replace(/\s+/g, ' ')
}

export function parseIngredientAmount(
  amount: string
): { quantity: number; unit: string } {
  const normalized = amount.trim().replace(',', '.')

  const fraction = normalized.match(
    /^(\d+)\s*\/\s*(\d+)\s*(.*)$/
  )

  if (fraction) {
    const denominator = Number(fraction[2])

    return {
      quantity: denominator === 0
        ? 1
        : Number(fraction[1]) / denominator,
      unit: normalizeUnit(fraction[3]) || 'portion',
    }
  }

  const mixedFraction = normalized.match(
    /^(\d+)\s+(\d+)\s*\/\s*(\d+)\s*(.*)$/
  )

  if (mixedFraction) {
    const denominator = Number(mixedFraction[3])

    return {
      quantity: denominator === 0
        ? 1
        : Number(mixedFraction[1]) +
          Number(mixedFraction[2]) / denominator,
      unit: normalizeUnit(mixedFraction[4]) || 'portion',
    }
  }

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
    unit: normalizeUnit(match[2]) || 'portion',
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
  const conversion = UNIT_CONVERSIONS[item.unit] ?? 1

  return Math.max(0, item.quantity * conversion)
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

      const weight =
        getIngredientWeight(item) / totalWeight

      for (const key of keys) {
        profile[key] += ingredient.taste[key] * weight
      }
    }
  }

  const score = calculateBalanceScore(profile)
  const { strengths, weaknesses } = analyzeBalance(profile)
  const suggestions = generateBalanceSuggestions(profile)

  const confidence = parsed.length === 0
    ? 0
    : Math.round((recognized.length / parsed.length) * 100)

  return {
    score,
    profile,
    strengths,
    weaknesses,
    suggestions,
    unknownIngredients,
    recognizedIngredients: recognized.length,
    totalIngredients: parsed.length,
    confidence,
  }
}
