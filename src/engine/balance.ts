
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

const clamp = (value: number, min = 0, max = 5) =>
  Math.max(min, Math.min(max, value))

export function calculateBalanceProfile(
  ingredients: Ingredient[]
): BalanceProfile {
  if (ingredients.length === 0) {
    return {
      acidity: 0,
      sweetness: 0,
      bitterness: 0,
      body: 0,
      intensity: 0,
    }
  }

  const total = ingredients.length

  const average = (key: keyof Ingredient['taste']) =>
    ingredients.reduce(
      (sum, ingredient) => sum + ingredient.taste[key],
      0
    ) / total

  return {
    acidity: clamp(average('acidity')),
    sweetness: clamp(average('sweetness')),
    bitterness: clamp(average('bitterness')),
    body: clamp(average('body')),
    intensity: clamp(average('intensity')),
  }
}

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
    const difference = Math.abs(profile[key] - target[key])
    return total + (difference / 5) * weights[key]
  }, 0)

  return Math.round(clamp(100 - penalty, 0, 100))
}

export function analyzeBalance(
  profile: BalanceProfile
): Pick<BalanceAnalysis, 'strengths' | 'weaknesses'> {
  const strengths: string[] = []
  const weaknesses: string[] = []

  if (profile.acidity >= 3 && profile.acidity <= 4) {
    strengths.push('Belle présence acidulée')
  } else if (profile.acidity > 4) {
    weaknesses.push('Acidité potentiellement trop dominante')
  } else if (profile.acidity < 1.5) {
    weaknesses.push('Manque de fraîcheur et de tension')
  }

  if (profile.sweetness >= 2 && profile.sweetness <= 3.5) {
    strengths.push('Sucre relativement bien dosé')
  } else if (profile.sweetness > 3.5) {
    weaknesses.push('Risque de sucrosité excessive')
  } else if (profile.sweetness < 1) {
    weaknesses.push('Faible rondeur sucrée')
  }

  if (profile.bitterness >= 1 && profile.bitterness <= 2.5) {
    strengths.push('Amertume structurante')
  } else if (profile.bitterness > 3.5) {
    weaknesses.push('Amertume potentiellement trop marquée')
  }

  if (profile.body >= 2 && profile.body <= 4) {
    strengths.push('Corps et texture équilibrés')
  } else if (profile.body < 1.5) {
    weaknesses.push('Manque de matière en bouche')
  } else if (profile.body > 4) {
    weaknesses.push('Texture potentiellement trop lourde')
  }

  if (profile.intensity >= 2.5 && profile.intensity <= 4) {
    strengths.push('Intensité aromatique intéressante')
  } else if (profile.intensity < 1.5) {
    weaknesses.push('Intensité aromatique trop discrète')
  } else if (profile.intensity > 4.5) {
    weaknesses.push('Intensité aromatique potentiellement excessive')
  }

  return { strengths, weaknesses }
}

export function generateBalanceSuggestions(
  profile: BalanceProfile
): string[] {
  const suggestions: string[] = []

  if (profile.acidity > 4) {
    suggestions.push(
      'Réduire légèrement les ingrédients acides ou augmenter la rondeur sucrée.'
    )
  } else if (profile.acidity < 1.5) {
    suggestions.push(
      'Ajouter une touche d’agrume ou de verjus pour apporter de la tension.'
    )
  }

  if (profile.sweetness > 3.5) {
    suggestions.push(
      'Réduire le sirop ou choisir un modificateur moins sucré.'
    )
  } else if (profile.sweetness < 1) {
    suggestions.push(
      'Ajouter une petite quantité de sirop ou de liqueur pour arrondir le profil.'
    )
  }

  if (profile.bitterness > 3.5) {
    suggestions.push(
      'Diminuer les bitters ou les ingrédients fortement amers.'
    )
  } else if (profile.bitterness < 0.5) {
    suggestions.push(
      'Introduire une légère touche amère pour apporter de la profondeur.'
    )
  }

  if (profile.body < 1.5) {
    suggestions.push(
      'Apporter davantage de texture avec un ingrédient adapté : blanc d’œuf, aquafaba ou sirop.'
    )
  } else if (profile.body > 4) {
    suggestions.push(
      'Alléger la texture en réduisant les ingrédients épais ou sirupeux.'
    )
  }

  if (profile.intensity < 1.5) {
    suggestions.push(
      'Renforcer la signature aromatique avec un ingrédient plus expressif.'
    )
  } else if (profile.intensity > 4.5) {
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

export function analyzeRecipeBalance(
  ingredients: Ingredient[]
): BalanceAnalysis {
  const profile = calculateBalanceProfile(ingredients)

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
