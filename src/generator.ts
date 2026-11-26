
import type { Recipe, DrinkType } from './types'
import {
  ingredients,
  findIngredient,
  normalizeIngredientName,
  type Ingredient
} from './engine/ingredients'

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
  'Amber Theory'
]

const profileKeywords: Record<string, string[]> = {
  agrume: ['agrumes', 'citron', 'orange', 'pamplemousse', 'yuzu'],
  agrumes: ['agrumes', 'citron', 'orange', 'pamplemousse', 'yuzu'],
  herbacé: ['herbes', 'végétal', 'basilic', 'menthe', 'romarin'],
  herbace: ['herbes', 'végétal', 'basilic', 'menthe', 'romarin'],
  fruité: ['fruits', 'fruité', 'pomme', 'poire', 'fruits rouges'],
  floral: ['floral', 'fleurs', 'rose', 'sureau', 'jasmin'],
  épicé: ['épices', 'gingembre', 'cannelle', 'poivre'],
  boisé: ['bois', 'vanille', 'chêne', 'fumé'],
  gourmand: ['caramel', 'chocolat', 'café', 'vanille', 'amande'],
  sec: ['sec', 'minéral', 'herbes', 'agrumes'],
  équilibré: [],
  signature: []
}

function includesRole(item: Ingredient, role: string): boolean {
  return item.roles.includes(role as Ingredient['roles'][number])
}

function isNonAlcoholic(item: Ingredient): boolean {
  return ![
    'spiritueux',
    'liqueurs',
    'vins_et_apéritifs',
    'bitters'
  ].includes(item.family)
}

function scoreIngredient(
  item: Ingredient,
  base: Ingredient | undefined,
  profile: string
): number {
  let score = 0

  if (base) {
    const baseTags = base.pairingTags.map(normalizeIngredientName)
    const candidateTags = item.pairingTags.map(normalizeIngredientName)

    score += candidateTags.filter(tag =>
      baseTags.some(baseTag =>
        baseTag.includes(tag) || tag.includes(baseTag)
      )
    ).length * 3

    const sharedAromas = item.aromas.filter(aroma =>
      base.aromas.some(baseAroma =>
        normalizeIngredientName(baseAroma) ===
        normalizeIngredientName(aroma)
      )
    )

    score += sharedAromas.length * 2
  }

  const keywords =
    profileKeywords[normalizeIngredientName(profile)] ?? []

  score += item.aromas.filter(aroma =>
    keywords.some(keyword =>
      normalizeIngredientName(aroma).includes(
        normalizeIngredientName(keyword)
      )
    )
  ).length * 3

  return score
}

function rankCandidates(
  candidates: Ingredient[],
  base: Ingredient | undefined,
  profile: string,
  offset: number
): Ingredient[] {
  return [...candidates]
    .map(item => ({
      item,
      score: scoreIngredient(item, base, profile)
    }))
    .sort((a, b) => b.score - a.score)
    .map(entry => entry.item)
    .slice(offset, offset + 8)
}

function choose(
  candidates: Ingredient[],
  base: Ingredient | undefined,
  profile: string,
  offset: number
): Ingredient | undefined {
  const ranked = rankCandidates(candidates, base, profile, offset)
  return ranked[0] ?? candidates[0]
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
    item.id === 'tonic' || item.id === 'soda-water' ||
    item.id === 'ginger-beer'
  )

  const hasVermouth = items.some(item =>
    item.family === 'vins_et_apéritifs'
  )

  if (hasVermouth) {
    return [
      'Verser les ingrédients dans un verre à mélange.',
      'Ajouter de la glace et remuer pendant 20 à 25 secondes.',
      'Filtrer dans une verrerie préalablement rafraîchie.',
      'Finaliser avec la garniture.'
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

  method.push('Finaliser avec la garniture et servir immédiatement.')

  return method
}

function getGlass(items: Ingredient[]): string {
  if (items.some(item => item.id === 'tonic' || item.id === 'soda-water')) {
    return 'Highball'
  }

  if (items.some(item => item.roles.includes('base') &&
    item.family === 'spiritueux')) {
    return 'Coupe'
  }

  return 'Highball'
}

function buildRecipe(
  type: DrinkType,
  profile: string,
  strength: string,
  seed: number,
  index: number,
  requested: Ingredient[]
): Recipe {
  const offset = (seed + index * 3) % 8

  const pool = type === 'mocktail'
    ? ingredients.filter(isNonAlcoholic)
    : ingredients

  const bases = pool.filter(item =>
    includesRole(item, 'base') &&
    (type === 'mocktail'
      ? isNonAlcoholic(item) &&
        item.family !== 'produits_laitiers'
      : item.family === 'spiritueux')
  )

  const base = requested.find(item =>
    includesRole(item, 'base') &&
    (type === 'mocktail'
      ? isNonAlcoholic(item)
      : item.family === 'spiritueux')
  ) ?? choose(bases, undefined, profile, offset)

  const modifiers = pool.filter(item =>
    item.id !== base?.id &&
    (includesRole(item, 'modificateur') ||
      includesRole(item, 'aromatique')) &&
    !includesRole(item, 'base')
  )

  const acids = pool.filter(item =>
    item.id !== base?.id &&
    includesRole(item, 'acidité')
  )

  const sweets = pool.filter(item =>
    item.id !== base?.id &&
    includesRole(item, 'sucrant')
  )

  const modifier = requested.find(item =>
    item.id !== base?.id &&
    (includesRole(item, 'modificateur') ||
      includesRole(item, 'aromatique')) &&
    !includesRole(item, 'base')
  ) ?? choose(modifiers, base, profile, offset + 1)

  const acid = requested.find(item =>
    item.id !== base?.id && includesRole(item, 'acidité')
  ) ?? choose(acids, base, profile, offset + 2)

  const sweet = requested.find(item =>
    item.id !== base?.id && includesRole(item, 'sucrant')
  ) ?? choose(sweets, base, profile, offset + 3)

  const selected = [base, modifier, acid, sweet].filter(
    (item): item is Ingredient => Boolean(item)
  )

  const recipeIngredients = selected.map(item => {
    let role: RecipeRole = 'modifier'

    if (item.id === base?.id) role = 'base'
    else if (item.id === acid?.id) role = 'acid'
    else if (item.id === sweet?.id) role = 'sweet'

    return {
      name: item.name,
      amount: amountFor(item, role, strength)
    }
  })

  const actualStrength = type === 'mocktail'
    ? 'Sans alcool'
    : strength === 'strong'
      ? 'Puissant'
      : strength === 'light'
        ? 'Léger'
        : 'Équilibré'

  const aromas = [...new Set(
    selected.flatMap(item => item.aromas)
  )]

  const pairingNotes = selected
    .map(item => item.notes)
    .filter(Boolean)

  return {
    id: `lab-${seed}-${index}`,
    name: names[(seed + index) % names.length],
    type,
    category: 'Création assistée par le moteur aromatique',
    profile: [profile, ...aromas.slice(0, 2)],
    strength: actualStrength,
    ingredients: recipeIngredients,
    method: getMethod(selected),
    glass: getGlass(selected),
    garnish: selected.find(item =>
      item.roles.includes('garniture')
    )?.name ?? 'Garniture à définir selon la dégustation',
    notes:
      `Association construite à partir de la base aromatique Mixology Lab. ` +
      `Arômes détectés : ${aromas.join(', ')}. ` +
      `Repères ingrédients : ${pairingNotes.join(' ')} ` +
      `Les dosages sont des propositions de départ à valider par dégustation.`,
    original: true
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

  return Array.from({ length: 5 }, (_, index) =>
    buildRecipe(
      actualType,
      profile,
      strength,
      seed,
      index,
      requested
    )
  )
}
  
