
import type { Recipe, DrinkType } from './types'

import {
  ingredients,
  findIngredient,
  normalizeIngredientName,
  type Ingredient,
} from './engine/ingredients'

import { compareIngredients } from './engine/pairing'

import {
  compareAromaProfiles,
  identifyIngredientAromas,
} from './engine/aromas'

import { analyzeWeightedRecipe } from './engine/recipe-analysis'

type RecipeRole = 'base' | 'modifier' | 'acid' | 'sweet'

const names = [
  'Verdant Signal',
  'Citrus Theory',
  'Botanical No. 5',
  'Bright Matter',
  'Afterglow',
  'Golden Hour',
  'Silent Garden',
  'Velvet Current',
  'Wild Harmony',
  'Amber Theory',
]

const profileKeywords: Record<string, string[]> = {
  agrume: ['agrumes', 'citron', 'orange', 'pamplemousse', 'yuzu'],
  agrumes: ['agrumes', 'citron', 'orange', 'pamplemousse', 'yuzu'],
  herbace: ['herbes', 'vegetal', 'basilic', 'menthe', 'romarin'],
  fruite: ['fruits', 'pomme', 'poire', 'framboise', 'fruits rouges'],
  floral: ['floral', 'fleurs', 'rose', 'sureau', 'jasmin'],
  epice: ['epices', 'gingembre', 'cannelle', 'poivre'],
  boise: ['bois', 'vanille', 'chene', 'fume'],
  gourmand: ['caramel', 'chocolat', 'cafe', 'vanille', 'amande'],
  sec: ['sec', 'mineral', 'herbes', 'agrumes'],
  equilibre: [],
  signature: [],
}

function includesRole(item: Ingredient, role: string): boolean {
  return item.roles.includes(role as Ingredient['roles'][number])
}

function isNonAlcoholic(item: Ingredient): boolean {
  return ![
    'spiritueux',
    'liqueurs',
    'vins_et_apéritifs',
    'bitters',
  ].includes(item.family)
}

function hasRole(items: Ingredient[], role: string): boolean {
  return items.some(item => includesRole(item, role))
}

function uniqueIngredients(items: Ingredient[]): Ingredient[] {
  return Array.from(
    new Map(items.map(item => [item.id, item])).values()
  )
}

function scoreIngredient(
  item: Ingredient,
  base: Ingredient | undefined,
  profile: string
): number {
  let score = 0

  const keywords =
    profileKeywords[normalizeIngredientName(profile)] ?? []

  const normalizedKeywords = keywords.map(normalizeIngredientName)
  const itemAromas = item.aromas.map(normalizeIngredientName)

  const profileMatches = itemAromas.filter(aroma =>
    normalizedKeywords.some(keyword =>
      aroma.includes(keyword) || keyword.includes(aroma)
    )
  )

  score += profileMatches.length * 4

  const descriptors = identifyIngredientAromas(item.aromas)

  const descriptorMatches = descriptors.filter(match =>
    normalizedKeywords.some(keyword =>
      normalizeIngredientName(match.descriptor.name).includes(keyword) ||
      match.descriptor.tags.some(tag =>
        normalizeIngredientName(tag).includes(keyword)
      )
    )
  )

  score += descriptorMatches.length * 3

  if (base && base.id !== item.id) {
    const pairing = compareIngredients(base, item)
    score += pairing.score * 0.25

    const aromaComparison = compareAromaProfiles(
      base.aromas,
      item.aromas
    )

    score += aromaComparison.similarity * 0.15
  }

  return score
}

function rankCandidates(
  candidates: Ingredient[],
  base: Ingredient | undefined,
  profile: string
): { item: Ingredient; score: number }[] {
  return candidates
    .map(item => ({
      item,
      score: scoreIngredient(item, base, profile),
    }))
    .sort((a, b) => b.score - a.score)
}

function choose(
  candidates: Ingredient[],
  base: Ingredient | undefined,
  profile: string,
  excludedIds: Set<string> = new Set()
): Ingredient | undefined {
  const available = rankCandidates(
    candidates.filter(item => !excludedIds.has(item.id)),
    base,
    profile
  )

  if (available.length === 0) return undefined

  const topCandidates = available.slice(
    0,
    Math.min(available.length, 8)
  )

  const weights = topCandidates.map((candidate, index) => {
    const positionWeight = 1 / Math.pow(index + 1, 1.5)
    const qualityWeight = Math.max(0.25, 1 + candidate.score / 20)

    return positionWeight * qualityWeight
  })

  const totalWeight = weights.reduce(
    (total, weight) => total + weight,
    0
  )

  let random = Math.random() * totalWeight

  for (let i = 0; i < topCandidates.length; i++) {
    random -= weights[i]

    if (random <= 0) {
      return topCandidates[i].item
    }
  }

  return topCandidates[0].item
}

function amountFor(
  item: Ingredient,
  role: RecipeRole,
  strength: string
): string {
  if (role === 'base') {
    if (strength === 'strong') return '60 ml'
    if (strength === 'light') return '40 ml'
    return '50 ml'
  }

  if (role === 'acid') return '20 ml'
  if (role === 'sweet') return '7,5 ml'

  if (
    item.family === 'herbes_et_épices' &&
    item.subfamily.toLowerCase().includes('herbe')
  ) {
    return '4 feuilles'
  }

  return '10 ml'
}

function getMethod(items: Ingredient[]): string[] {
  const hasHerbs = items.some(item =>
    item.family === 'herbes_et_épices'
  )

  const hasBubbles = items.some(item =>
    ['tonic', 'soda-water', 'ginger-beer'].includes(item.id)
  )

  const hasVermouth = items.some(item =>
    item.family === 'vins_et_apéritifs'
  )

  if (hasVermouth) {
    return [
      'Verser les ingrédients dans un verre à mélange.',
      'Ajouter de la glace et remuer pendant 20 à 25 secondes.',
      'Filtrer dans une verrerie préalablement rafraîchie.',
      'Finaliser avec la garniture.',
    ]
  }

  const method = [
    'Préparer et mesurer précisément chaque ingrédient.',
  ]

  if (hasHerbs) {
    method.push(
      'Exprimer délicatement les herbes pour libérer leurs arômes.'
    )
  }

  method.push(
    'Ajouter les ingrédients dans un shaker avec de la glace.',
    'Shaker vivement puis filtrer dans une verrerie adaptée.'
  )

  if (hasBubbles) {
    method.push(
      'Compléter avec la boisson gazeuse et mélanger délicatement.'
    )
  }

  method.push(
    'Finaliser avec la garniture et servir immédiatement.'
  )

  return method
}

function getGlass(items: Ingredient[]): string {
  if (items.some(item =>
    ['tonic', 'soda-water'].includes(item.id)
  )) {
    return 'Highball'
  }

  if (items.some(item =>
    item.roles.includes('base') &&
    item.family === 'spiritueux'
  )) {
    return 'Coupe'
  }

  return 'Highball'
}

function getIngredientRole(
  item: Ingredient,
  base: Ingredient | undefined,
  acid: Ingredient | undefined,
  sweet: Ingredient | undefined
): RecipeRole {
  if (item.id === base?.id) return 'base'
  if (item.id === acid?.id) return 'acid'
  if (item.id === sweet?.id) return 'sweet'

  return 'modifier'
}

function buildRecipe(
  type: DrinkType,
  profile: string,
  strength: string,
  seed: number,
  index: number,
  requested: Ingredient[],
  usedAcrossBatch: Set<string>
): Recipe {
  const pool = type === 'mocktail'
    ? ingredients.filter(isNonAlcoholic)
    : ingredients

  const compatibleRequested = uniqueIngredients(
    requested.filter(item =>
      pool.some(candidate => candidate.id === item.id)
    )
  )

  const bases = pool.filter(item =>
    includesRole(item, 'base') &&
    (type === 'mocktail'
      ? isNonAlcoholic(item) &&
        item.family !== 'produits_laitiers'
      : item.family === 'spiritueux')
  )

  const requestedBase = compatibleRequested.find(item =>
    includesRole(item, 'base') &&
    (type === 'mocktail'
      ? isNonAlcoholic(item)
      : item.family === 'spiritueux')
  )

  const base = requestedBase ??
    choose(bases, undefined, profile, usedAcrossBatch)

  const selected: Ingredient[] = uniqueIngredients([
    ...(base ? [base] : []),
    ...compatibleRequested,
  ])

  const modifiers = pool.filter(item =>
    !selected.some(selectedItem => selectedItem.id === item.id) &&
    (includesRole(item, 'modificateur') ||
      includesRole(item, 'aromatique')) &&
    !includesRole(item, 'base')
  )

  const acids = pool.filter(item =>
    !selected.some(selectedItem => selectedItem.id === item.id) &&
    includesRole(item, 'acidité')
  )

  const sweets = pool.filter(item =>
    !selected.some(selectedItem => selectedItem.id === item.id) &&
    includesRole(item, 'sucrant')
  )

  const acid = hasRole(selected, 'acidité')
    ? selected.find(item => includesRole(item, 'acidité'))
    : choose(
        acids,
        base,
        profile,
        new Set([
          ...usedAcrossBatch,
          ...selected.map(item => item.id),
        ])
      )

  if (acid && !selected.some(item => item.id === acid.id)) {
    selected.push(acid)
  }

  const sweet = hasRole(selected, 'sucrant')
    ? selected.find(item => includesRole(item, 'sucrant'))
    : choose(
        sweets,
        base,
        profile,
        new Set([
          ...usedAcrossBatch,
          ...selected.map(item => item.id),
        ])
      )

  if (sweet && !selected.some(item => item.id === sweet.id)) {
    selected.push(sweet)
  }

  if (
    !hasRole(selected, 'modificateur') &&
    !hasRole(selected, 'aromatique')
  ) {
    const modifier = choose(
      modifiers,
      base,
      profile,
      new Set([
        ...usedAcrossBatch,
        ...selected.map(item => item.id),
      ])
    )

    if (modifier) selected.push(modifier)
  }

  const finalIngredients = uniqueIngredients(selected)

  const requestedIds = new Set(
    compatibleRequested.map(item => item.id)
  )

  finalIngredients.forEach(item => {
    if (!requestedIds.has(item.id)) {
      usedAcrossBatch.add(item.id)
    }
  })

  const recipeIngredients = finalIngredients.map(item => {
    const role = getIngredientRole(item, base, acid, sweet)

    return {
      name: item.name,
      amount: amountFor(item, role, strength),
    }
  })

  const balance = analyzeWeightedRecipe(recipeIngredients)

  const aromas = [
    ...new Set(finalIngredients.flatMap(item => item.aromas)),
  ]

  const aromaMatches = identifyIngredientAromas(aromas)

  const aromaFamilies = [
    ...new Set(aromaMatches.map(match => match.familyName)),
  ]

  const pairings = []

  for (let i = 0; i < finalIngredients.length; i++) {
    for (let j = i + 1; j < finalIngredients.length; j++) {
      pairings.push(
        compareIngredients(
          finalIngredients[i],
          finalIngredients[j]
        )
      )
    }
  }

  const strongestPairings = pairings
    .filter(pairing => pairing.score >= 45)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  const pairingNotes = strongestPairings.map(pairing =>
    `${pairing.ingredientA} / ${pairing.ingredientB} : ${pairing.explanation}`
  )

  const actualStrength = type === 'mocktail'
    ? 'Sans alcool'
    : strength === 'strong'
      ? 'Puissant'
      : strength === 'light'
        ? 'Léger'
        : 'Équilibré'

  const ingredientNotes = finalIngredients
    .map(item => item.notes)
    .filter(Boolean)

  const balanceNotes = balance.suggestions.length > 0
    ? balance.suggestions.join(' ')
    : 'Profil sensoriel à confirmer par dégustation.'

  const notes =
    `Analyse Mixology Lab. ` +
    `Équilibre sensoriel : ${balance.score}/100. ` +
    `Fiabilité de reconnaissance : ${balance.confidence}%. ` +
    `Arômes détectés : ${aromas.join(', ')}. ` +
    `Familles aromatiques : ${aromaFamilies.join(', ')}. ` +
    `Associations : ${pairingNotes.join(' ')} ` +
    `Analyse gustative : ${balance.strengths.join(', ')}. ` +
    `Points de vigilance : ${balance.weaknesses.join(', ')}. ` +
    `Suggestions : ${balanceNotes} ` +
    `Repères ingrédients : ${ingredientNotes.join(' ')} ` +
    `Les dosages sont des propositions de départ à valider par dégustation.`

  return {
    id: `lab-${seed}-${index}`,
    name: names[(seed + index) % names.length],
    type,
    category: 'Création assistée par le moteur aromatique',
    profile: [
      profile,
      ...aromaFamilies.slice(0, 3),
      ...aromas.slice(0, 2),
    ],
    strength: actualStrength,
    ingredients: recipeIngredients,
    method: getMethod(finalIngredients),
    glass: getGlass(finalIngredients),
    garnish: finalIngredients.find(item =>
      item.roles.includes('garniture')
    )?.name ?? 'Garniture à définir selon la dégustation',
    notes,
    original: true,
  }
    }

export function generateRecipes(
  type: DrinkType | 'surprise',
  profile: string,
  strength: string,
  seed = Date.now(),
  requestedIngredients = ''
): Recipe[] {
  const actualType: DrinkType = type === 'surprise'
    ? seed % 2 === 0 ? 'cocktail' : 'mocktail'
    : type

  const requested = requestedIngredients
    .split(/[,;\n]+/)
    .map(value => value.trim())
    .filter(Boolean)
    .map(value => findIngredient(value))
    .filter((item): item is Ingredient => Boolean(item))
    .filter(item =>
      actualType === 'mocktail' ? isNonAlcoholic(item) : true
    )

  const usedAcrossBatch = new Set<string>()

  return Array.from({ length: 5 }, (_, index) =>
    buildRecipe(
      actualType,
      profile,
      strength,
      seed,
      index,
      requested,
      usedAcrossBatch
    )
  )
}
