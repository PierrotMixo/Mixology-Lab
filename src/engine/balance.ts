
import type { Ingredient } from './ingredients'

export type BalanceProfile = {
  acidity: number
  sweetness: number
  bitterness: number
  body: number
  intensity: number
}

export type BalanceAnalysis = {
  score: number
  profile: BalanceProfile
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
}

const clamp = (value: number, min = 0, max = 5): number => {
  if (!Number.isFinite(value)) return min
  return Math.max(min, Math.min(max, value))
}

const emptyProfile = (): BalanceProfile => ({
  acidity: 0,
  sweetness: 0,
  bitterness: 0,
  body: 0,
  intensity: 0,
})

/**
 * Calcule le profil sensoriel moyen des ingrédients.
 * Les quantités sont facultatives : sans elles, chaque ingrédient
 * possède le même poids dans le calcul.
 */
export function calculateBalanceProfile(
  ingredients: Ingredient[],
  ingredientWeights?: number[]
): BalanceProfile {
  if (ingredients.length === 0) return emptyProfile()

  const weights = ingredients.map((_, index) => {
    const weight = ingredientWeights?.[index] ?? 1
    return Number.isFinite(weight) && weight > 0 ? weight : 0
  })

  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)

  if (totalWeight === 0) return emptyProfile()

  const average = (key: keyof Ingredient['taste']): number => {
    const weightedTotal = ingredients.reduce(
      (sum, ingredient, index) =>
        sum + clamp(ingredient.taste[key]) * weights[index],
      0
    )

    return clamp(weightedTotal / totalWeight)
  }

  return {
    acidity: average('acidity'),
    sweetness: average('sweetness'),
    bitterness: average('bitterness'),
    body: average('body'),
    intensity: average('intensity'),
  }
}

/**
 * Évalue la proximité du profil avec un équilibre sensoriel général.
 * Le score est indicatif et ne remplace pas une dégustation.
 */
export function calculateBalanceScore(
  profile: BalanceProfile
): number {
  const target: BalanceProfile = {
    acidity: 2.5,
    sweetness: 2.5,
    bitterness: 1.5,
    body: 2.5,
    intensity: 3,
  }

  const weights: BalanceProfile = {
    acidity: 25,
    sweetness: 25,
    bitterness: 15,
    body: 15,
    intensity: 20,
  }

  const keys = Object.keys(target) as (keyof BalanceProfile)[]

  const penalty = keys.reduce((total, key) => {
    const difference = Math.abs(
      clamp(profile[key]) - target[key]
    )

    return total + (difference / 5) * weights[key]
  }, 0)

  return Math.round(clamp(100 - penalty, 0, 100))
}

export function analyzeBalance(
  profile: BalanceProfile
): Pick<BalanceAnalysis, 'strengths' | 'weaknesses'> {
  const strengths: string[] = []
  const weaknesses: string[] = []

  const acidity = clamp(profile.acidity)
  const sweetness = clamp(profile.sweetness)
  const bitterness = clamp(profile.bitterness)
  const body = clamp(profile.body)
  const intensity = clamp(profile.intensity)

  if (acidity >= 3 && acidity <= 4) {
    strengths.push('Belle présence acidulée')
  } else if (acidity > 4) {
    weaknesses.push('Acidité potentiellement trop dominante')
  } else if (acidity < 1.5) {
    weaknesses.push('Manque de fraîcheur et de tension')
  }

  if (sweetness >= 2 && sweetness <= 3.5) {
    strengths.push('Sucre relativement bien dosé')
  } else if (sweetness > 3.5) {
    weaknesses.push('Risque de sucrosité excessive')
  } else if (sweetness < 1) {
    weaknesses.push('Faible rondeur sucrée')
  }

  if (bitterness >= 1 && bitterness <= 2.5) {
    strengths.push('Amertume structurante')
  } else if (bitterness > 3.5) {
    weaknesses.push('Amertume potentiellement trop marquée')
  }

  if (body >= 2 && body <= 4) {
    strengths.push('Corps et texture équilibrés')
  } else if (body < 1.5) {
    weaknesses.push('Manque de matière en bouche')
  } else if (body > 4) {
    weaknesses.push('Texture potentiellement trop lourde')
  }

  if (intensity >= 2.5 && intensity <= 4) {
    strengths.push('Intensité aromatique intéressante')
  } else if (intensity < 1.5) {
    weaknesses.push('Intensité aromatique trop discrète')
  } else if (intensity > 4.5) {
    weaknesses.push('Intensité aromatique potentiellement excessive')
  }

  return { strengths, weaknesses }
}

export function generateBalanceSuggestions(
  profile: BalanceProfile
): string[] {
  const suggestions: string[] = []

  const acidity = clamp(profile.acidity)
  const sweetness = clamp(profile.sweetness)
  const bitterness = clamp(profile.bitterness)
  const body = clamp(profile.body)
  const intensity = clamp(profile.intensity)

  if (acidity > 4) {
    suggestions.push(
      'Réduire légèrement les ingrédients acides ou augmenter la rondeur sucrée.'
    )
  } else if (acidity < 1.5) {
    suggestions.push(
      'Ajouter une touche d’agrume ou de verjus pour apporter de la tension.'
    )
  }

  if (sweetness > 3.5) {
    suggestions.push(
      'Réduire le sirop ou choisir un modificateur moins sucré.'
    )
  } else if (sweetness < 1) {
    suggestions.push(
      'Ajouter une petite quantité de sirop ou de liqueur pour arrondir le profil.'
    )
  }

  if (bitterness > 3.5) {
    suggestions.push(
      'Diminuer les bitters ou les ingrédients fortement amers.'
    )
  } else if (bitterness < 0.5) {
    suggestions.push(
      'Introduire une légère touche amère pour apporter de la profondeur.'
    )
  }

  if (body < 1.5) {
    suggestions.push(
      'Apporter davantage de texture avec un ingrédient adapté : blanc d’œuf, aquafaba ou sirop.'
    )
  } else if (body > 4) {
    suggestions.push(
      'Alléger la texture en réduisant les ingrédients épais ou sirupeux.'
    )
  }

  if (intensity < 1.5) {
    suggestions.push(
      'Renforcer la signature aromatique avec un ingrédient plus expressif.'
    )
  } else if (intensity > 4.5) {
    suggestions.push(
      'Simplifier la composition pour laisser respirer les arômes principaux.'
    )
  }

  if (suggestions.length === 0) {
    suggestions.push(
      'Le profil sensoriel semble cohérent. Effectuer une dégustation pour confirmer l’équilibre.'
    )
  }

  return suggestions
}

/**
 * Analyse complète d'une recette.
 * ingredientWeights est facultatif et doit suivre le même ordre
 * que le tableau ingredients.
 */
export function analyzeRecipeBalance(
  ingredients: Ingredient[],
  ingredientWeights?: number[]
): BalanceAnalysis {
  const profile = calculateBalanceProfile(
    ingredients,
    ingredientWeights
  )

  const score = calculateBalanceScore(profile)
  const { strengths, weaknesses } = analyzeBalance(profile)
  const suggestions = generateBalanceSuggestions(profile)

  return {
    score,
    profile,
    strengths,
    weaknesses,
    suggestions,
  }
}
