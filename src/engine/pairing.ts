
import {
  findIngredient,
  type Ingredient,
} from './ingredients'

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

export function compareIngredients(
  ingredientA: Ingredient,
  ingredientB: Ingredient
): PairingResult {
  const sharedAromas = ingredientA.aromas.filter(
    aroma => ingredientB.aromas.includes(aroma)
  )

  const sharedTags = ingredientA.pairingTags.filter(
    tag => ingredientB.pairingTags.includes(tag)
  )

  const tasteKeys = [
    'acidity',
    'sweetness',
    'bitterness',
    'body',
    'intensity',
  ] as const

  const differences = tasteKeys.map(
    key => Math.abs(
      ingredientA.taste[key] - ingredientB.taste[key]
    )
  )

  const complementarity =
    Math.abs(
      ingredientA.taste.acidity -
      ingredientB.taste.sweetness
    ) <= 1.5 ||
    Math.abs(
      ingredientA.taste.bitterness -
      ingredientB.taste.sweetness
    ) <= 1.5

  const contrast = differences.some(
    difference => difference >= 2
  )

  const type: PairingType[] = []

  if (sharedAromas.length > 0) {
    type.push('shared_aromas')
  }

  if (complementarity) {
    type.push('complementarity')
  }

  if (contrast) {
    type.push('contrast')
  }

  const score = Math.min(
    100,
    Math.round(
      30 +
      sharedAromas.length * 12 +
      sharedTags.length * 10 +
      (complementarity ? 15 : 0) +
      (contrast ? 5 : 0)
    )
  )

  const explanation = sharedAromas.length > 0
    ? `Ces ingrédients partagent des notes aromatiques : ${sharedAromas.join(', ')}.`
    : complementarity
      ? 'Leurs profils gustatifs présentent une complémentarité intéressante.'
      : 'Cette association mérite une expérimentation en dégustation.'

  return {
    ingredientA: ingredientA.name,
    ingredientB: ingredientB.name,
    score,
    type,
    sharedAromas,
    sharedTags,
    explanation,
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
          `Affinités gustatives : ${comparison.sharedTags.join(', ')}`
        )
      }

      if (comparison.type.includes('complementarity')) {
        reasons.push('Complémentarité des profils gustatifs')
      }

      if (comparison.type.includes('contrast')) {
        reasons.push('Contraste gustatif intéressant')
      }

      return {
        ingredient: candidate,
        score: comparison.score,
        reasons,
      }
    })
    .filter(item => item.reasons.length > 0)
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

  const result = compareIngredients(ingredientA, ingredientB)

  const explanations: string[] = []

  if (result.sharedAromas.length > 0) {
    explanations.push(
      `Les deux ingrédients partagent des notes de ${result.sharedAromas.join(', ')}. Cette proximité crée une continuité aromatique.`
    )
  }

  if (result.type.includes('complementarity')) {
    explanations.push(
      'Leurs caractéristiques gustatives peuvent se compléter et contribuer à un profil plus harmonieux.'
    )
  }

  if (result.type.includes('contrast')) {
    explanations.push(
      'Le contraste entre leurs profils peut apporter du relief et de la complexité.'
    )
  }

  if (explanations.length === 0) {
    explanations.push(
      'Cette association ne présente pas de compatibilité évidente dans la base actuelle. Une dégustation comparative permettra de la valider.'
    )
  }

  return {
    ...result,
    explanation: explanations.join(' '),
  }
}
