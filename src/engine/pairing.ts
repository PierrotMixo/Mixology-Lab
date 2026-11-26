
import {
  findIngredient,
  type Ingredient,
} from './ingredients'

import {
  findAroma,
} from './aromas'

export type PairingType =
  | 'complementarity'
  | 'contrast'
  | 'shared_aromas'

export type PairingResult = {
  ingredientA: string
  ingredientB: string
  score: number
  type: PairingType[]
  sharedAromas: string[]
  sharedTags: string[]
  explanation: string
}

export type PairingSuggestion = {
  ingredient: Ingredient
  score: number
  reasons: string[]
}

function unique(values: string[]): string[] {
  return [...new Set(values)]
}

function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value))
}

function getAromaAffinity(
  ingredientA: Ingredient,
  ingredientB: Ingredient
): number {
  const aromasA = ingredientA.aromas.map(aroma => aroma.toLowerCase())
  const aromasB = ingredientB.aromas.map(aroma => aroma.toLowerCase())

  const shared = aromasA.filter(aroma => aromasB.includes(aroma))

  const familyA = unique(
    aromasA
      .map(aroma => findAroma(aroma)?.family)
      .filter((family): family is NonNullable<typeof family> => Boolean(family))
  )

  const familyB = unique(
    aromasB
      .map(aroma => findAroma(aroma)?.family)
      .filter((family): family is NonNullable<typeof family> => Boolean(family))
  )

  const sharedFamilies = familyA.filter(family => familyB.includes(family))

  return Math.min(
    30,
    shared.length * 10 + sharedFamilies.length * 5
  )
}

function getTasteComplementarity(
  ingredientA: Ingredient,
  ingredientB: Ingredient
): number {
  const a = ingredientA.taste
  const b = ingredientB.taste

  let score = 0

  // L'acidité peut équilibrer une forte sucrosité.
  if (a.acidity >= 3 && b.sweetness >= 3) score += 12
  if (b.acidity >= 3 && a.sweetness >= 3) score += 12

  // L'amertume peut être adoucie par la sucrosité.
  if (a.bitterness >= 3 && b.sweetness >= 2) score += 8
  if (b.bitterness >= 3 && a.sweetness >= 2) score += 8

  // Une différence de corps peut apporter de la structure.
  if (Math.abs(a.body - b.body) >= 2) score += 5

  // Une intensité très élevée peut dominer un ingrédient délicat.
  const intensityDifference = Math.abs(a.intensity - b.intensity)

  if (intensityDifference <= 1) score += 5
  else if (intensityDifference >= 4) score -= 8

  return score
}

function getContrastScore(
  ingredientA: Ingredient,
  ingredientB: Ingredient
): number {
  const a = ingredientA.taste
  const b = ingredientB.taste

  let score = 0

  if (Math.abs(a.acidity - b.sweetness) >= 2) score += 4
  if (Math.abs(a.bitterness - b.sweetness) >= 2) score += 4
  if (Math.abs(a.body - b.body) >= 2) score += 3

  return score
}

export function compareIngredients(
  ingredientA: Ingredient,
  ingredientB: Ingredient
): PairingResult {
  const sharedAromas = unique(
    ingredientA.aromas.filter(aroma =>
      ingredientB.aromas.some(
        other => other.toLowerCase() === aroma.toLowerCase()
      )
    )
  )

  const sharedTags = unique(
    ingredientA.pairingTags.filter(tag =>
      ingredientB.pairingTags.some(
        other => other.toLowerCase() === tag.toLowerCase()
      )
    )
  )

  const aromaScore = getAromaAffinity(ingredientA, ingredientB)
  const tasteScore = getTasteComplementarity(ingredientA, ingredientB)
  const contrastScore = getContrastScore(ingredientA, ingredientB)

  const complementarity = tasteScore >= 12
  const contrast = contrastScore >= 7

  const type: PairingType[] = []

  if (sharedAromas.length > 0 || aromaScore > 0) {
    type.push('shared_aromas')
  }

  if (complementarity) {
    type.push('complementarity')
  }

  if (contrast) {
    type.push('contrast')
  }

  const score = clamp(
    Math.round(
      25 +
      aromaScore +
      sharedTags.length * 5 +
      tasteScore +
      contrastScore
    )
  )

  const explanationParts: string[] = []

  if (sharedAromas.length > 0) {
    explanationParts.push(
      `Notes aromatiques communes : ${sharedAromas.join(', ')}.`
    )
  }

  if (complementarity) {
    explanationParts.push(
      'Les profils gustatifs présentent une complémentarité intéressante.'
    )
  }

  if (contrast) {
    explanationParts.push(
      'Le contraste peut apporter du relief à l’association.'
    )
  }

  if (explanationParts.length === 0) {
    explanationParts.push(
      'Aucune affinité forte n’a été identifiée dans la base actuelle. Une dégustation permettra de valider cette association.'
    )
  }

  return {
    ingredientA: ingredientA.name,
    ingredientB: ingredientB.name,
    score,
    type,
    sharedAromas,
    sharedTags,
    explanation: explanationParts.join(' '),
  }
}

export function suggestPairings(
  ingredientName: string,
  candidates: Ingredient[],
  limit = 5
): PairingSuggestion[] {
  const source = findIngredient(ingredientName)

  if (!source) return []

  return candidates
    .filter(candidate => candidate.id !== source.id)
    .map(candidate => {
      const comparison = compareIngredients(source, candidate)

      const reasons: string[] = []

      if (comparison.sharedAromas.length > 0) {
        reasons.push(
          `Arômes communs : ${comparison.sharedAromas.join(', ')}`
        )
      }

      if (comparison.sharedTags.length > 0) {
        reasons.push(
          `Affinités : ${comparison.sharedTags.join(', ')}`
        )
      }

      if (comparison.type.includes('complementarity')) {
        reasons.push('Complémentarité gustative')
      }

      if (comparison.type.includes('contrast')) {
        reasons.push('Contraste gustatif')
      }

      return {
        ingredient: candidate,
        score: comparison.score,
        reasons,
      }
    })
    .filter(item => item.score >= 35 && item.reasons.length > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.max(0, limit))
}

export function explainPairing(
  ingredientAName: string,
  ingredientBName: string
): PairingResult | null {
  const ingredientA = findIngredient(ingredientAName)
  const ingredientB = findIngredient(ingredientBName)

  if (!ingredientA || !ingredientB) {
    return null
  }

  return compareIngredients(ingredientA, ingredientB)
}
