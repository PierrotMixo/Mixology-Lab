
export type AromaFamilyId =
  | 'agrumes'
  | 'fruits'
  | 'floraux'
  | 'vegetaux'
  | 'epices'
  | 'boises'
  | 'torrefies'
  | 'gourmands'
  | 'mineraux'
  | 'fermentes'

export type AromaDescriptor = {
  id: string
  name: string
  synonyms: string[]
  intensity: number
  tags: string[]
}

export type AromaFamilyDefinition = {
  id: AromaFamilyId
  name: string
  description: string
  descriptors: AromaDescriptor[]
}

export type AromaMatch = {
  family: AromaFamilyId
  familyName: string
  descriptor: AromaDescriptor
  confidence: number
}

export const aromaFamilies: AromaFamilyDefinition[] = [
  {
    id: 'agrumes',
    name: 'Agrumes',
    description: 'Notes fraîches, zestées, acidulées et parfois amères.',
    descriptors: [
      { id: 'citron', name: 'Citron', synonyms: ['citron jaune', 'zeste de citron'], intensity: 4, tags: ['frais', 'acidule', 'zeste'] },
      { id: 'citron-vert', name: 'Citron vert', synonyms: ['lime', 'zeste de lime'], intensity: 5, tags: ['frais', 'acidule', 'vert'] },
      { id: 'orange', name: 'Orange', synonyms: ['orange douce', 'zeste orange'], intensity: 3, tags: ['doux', 'zeste', 'fruit'] },
      { id: 'pamplemousse', name: 'Pamplemousse', synonyms: ['pomelo', 'grapefruit'], intensity: 4, tags: ['amer', 'frais', 'acidule'] },
      { id: 'bergamote', name: 'Bergamote', synonyms: ['zeste bergamote'], intensity: 4, tags: ['floral', 'zeste', 'amer'] },
      { id: 'yuzu', name: 'Yuzu', synonyms: ['jus de yuzu'], intensity: 5, tags: ['acidule', 'floral', 'frais'] },
      { id: 'mandarine', name: 'Mandarine', synonyms: ['clémentine'], intensity: 3, tags: ['doux', 'fruit', 'zeste'] },
      { id: 'combava', name: 'Combava', synonyms: ['kaffir lime', 'feuille de combava'], intensity: 5, tags: ['vert', 'intense', 'zeste'] }
    ]
  },
  {
    id: 'fruits',
    name: 'Fruits',
    description: 'Notes fruitées allant du frais au mûr, confituré et exotique.',
    descriptors: [
      { id: 'pomme', name: 'Pomme', synonyms: ['pomme verte', 'pomme mûre'], intensity: 3, tags: ['frais', 'fruit', 'croquant'] },
      { id: 'poire', name: 'Poire', synonyms: ['poire mûre'], intensity: 3, tags: ['doux', 'fruit', 'delicat'] },
      { id: 'framboise', name: 'Framboise', synonyms: ['framboise fraîche'], intensity: 4, tags: ['acidule', 'rouge', 'fruit'] },
      { id: 'fraise', name: 'Fraise', synonyms: ['fraise des bois'], intensity: 3, tags: ['rouge', 'doux', 'fruit'] },
      { id: 'cerise', name: 'Cerise', synonyms: ['griotte', 'cerise noire'], intensity: 4, tags: ['rouge', 'noyau', 'fruit'] },
      { id: 'ananas', name: 'Ananas', synonyms: ['ananas frais'], intensity: 4, tags: ['exotique', 'acidule', 'sucre'] },
      { id: 'mangue', name: 'Mangue', synonyms: ['mangue mûre'], intensity: 4, tags: ['exotique', 'tropical', 'sucre'] },
      { id: 'passion', name: 'Fruit de la passion', synonyms: ['maracuja', 'passion fruit'], intensity: 5, tags: ['exotique', 'acidule', 'intense'] },
      { id: 'peche', name: 'Pêche', synonyms: ['pêche blanche', 'nectarine'], intensity: 3, tags: ['doux', 'floral', 'fruit'] },
      { id: 'cassis', name: 'Cassis', synonyms: ['baie de cassis'], intensity: 4, tags: ['noir', 'acidule', 'intense'] }
    ]
  },
  {
    id: 'floraux',
    name: 'Floraux',
    description: 'Notes délicates, parfumées, fraîches ou capiteuses.',
    descriptors: [
      { id: 'rose', name: 'Rose', synonyms: ['pétale de rose', 'eau de rose'], intensity: 4, tags: ['floral', 'delicat', 'parfume'] },
      { id: 'jasmin', name: 'Jasmin', synonyms: ['fleur de jasmin'], intensity: 5, tags: ['floral', 'capiteux', 'parfume'] },
      { id: 'fleur-sureau', name: 'Fleur de sureau', synonyms: ['sureau floral'], intensity: 4, tags: ['floral', 'frais', 'delicat'] },
      { id: 'violette', name: 'Violette', synonyms: ['bonbon violette'], intensity: 4, tags: ['floral', 'poudre', 'sucre'] },
      { id: 'lavande', name: 'Lavande', synonyms: ['fleur de lavande'], intensity: 5, tags: ['floral', 'herbace', 'sec'] },
      { id: 'fleur-oranger', name: "Fleur d'oranger", synonyms: ['néroli'], intensity: 4, tags: ['floral', 'agrumes', 'delicat'] },
      { id: 'hibiscus', name: 'Hibiscus', synonyms: ['bissap'], intensity: 4, tags: ['floral', 'acidule', 'fruit'] }
    ]
  },
  {
    id: 'vegetaux',
    name: 'Végétaux et herbacés',
    description: 'Notes vertes, fraîches, aromatiques, végétales et parfois résineuses.',
    descriptors: [
      { id: 'menthe', name: 'Menthe', synonyms: ['menthe fraîche', 'menthe verte'], intensity: 5, tags: ['frais', 'vert', 'menthole'] },
      { id: 'basilic', name: 'Basilic', synonyms: ['basilic frais'], intensity: 4, tags: ['vert', 'anise', 'herbace'] },
      { id: 'romarin', name: 'Romarin', synonyms: ['romarin frais'], intensity: 5, tags: ['resineux', 'boise', 'herbace'] },
      { id: 'thym', name: 'Thym', synonyms: ['thym frais'], intensity: 4, tags: ['sec', 'herbace', 'medicinal'] },
      { id: 'concombre', name: 'Concombre', synonyms: ['concombre frais'], intensity: 3, tags: ['frais', 'vert', 'aqueux'] },
      { id: 'the-vert', name: 'Thé vert', synonyms: ['matcha', 'sencha'], intensity: 4, tags: ['vegetal', 'amer', 'sec'] },
      { id: 'the-noir', name: 'Thé noir', synonyms: ['assam', 'darjeeling'], intensity: 4, tags: ['vegetal', 'tannique', 'boise'] }
    ]
  },
  {
    id: 'epices',
    name: 'Épices',
    description: 'Notes chaudes, piquantes, douces, poivrées et aromatiques.',
    descriptors: [
      { id: 'gingembre', name: 'Gingembre', synonyms: ['gingembre frais'], intensity: 5, tags: ['piquant', 'frais', 'chaud'] },
      { id: 'cannelle', name: 'Cannelle', synonyms: ['bâton de cannelle'], intensity: 4, tags: ['chaud', 'doux', 'boise'] },
      { id: 'cardamome', name: 'Cardamome', synonyms: ['cardamome verte'], intensity: 5, tags: ['frais', 'epice', 'eucalyptus'] },
      { id: 'poivre-noir', name: 'Poivre noir', synonyms: ['poivre concassé'], intensity: 5, tags: ['piquant', 'sec', 'epice'] },
      { id: 'piment', name: 'Piment', synonyms: ['chili', 'piment rouge'], intensity: 5, tags: ['piquant', 'chaud', 'intense'] },
      { id: 'muscade', name: 'Muscade', synonyms: ['noix de muscade'], intensity: 4, tags: ['chaud', 'boise', 'epice'] },
      { id: 'clou-girofle', name: 'Clou de girofle', synonyms: ['girofle'], intensity: 5, tags: ['chaud', 'medicinal', 'boise'] },
      { id: 'anis', name: 'Anis', synonyms: ['anis vert'], intensity: 4, tags: ['anise', 'frais', 'reglisse'] }
    ]
  }
,

  {
    id: 'boises',
    name: 'Boisés et résineux',
    description: 'Notes de bois, résine, sous-bois, fumée et vieillissement.',
    descriptors: [
      { id: 'chene', name: 'Chêne', synonyms: ['bois de chêne', 'fût de chêne'], intensity: 4, tags: ['boise', 'sec', 'vieilli'] },
      { id: 'cedre', name: 'Cèdre', synonyms: ['bois de cèdre'], intensity: 4, tags: ['boise', 'sec', 'resineux'] },
      { id: 'santal', name: 'Santal', synonyms: ['bois de santal'], intensity: 4, tags: ['boise', 'cremeux', 'doux'] },
      { id: 'pin', name: 'Pin', synonyms: ['aiguilles de pin'], intensity: 5, tags: ['resineux', 'frais', 'vert'] },
      { id: 'genievre', name: 'Genévrier', synonyms: ['baie de genièvre'], intensity: 5, tags: ['resineux', 'poivre', 'gin'] },
      { id: 'fumee', name: 'Fumée', synonyms: ['fumé', 'tourbé'], intensity: 5, tags: ['fume', 'boise', 'intense'] },
      { id: 'tabac', name: 'Tabac', synonyms: ['feuille de tabac'], intensity: 4, tags: ['sec', 'boise', 'cuir'] },
      { id: 'cuir', name: 'Cuir', synonyms: ['notes animales'], intensity: 4, tags: ['animal', 'boise', 'sec'] },
      { id: 'sous-bois', name: 'Sous-bois', synonyms: ['terre humide', 'humus'], intensity: 3, tags: ['terreux', 'humide', 'boise'] }
    ]
  },
  {
    id: 'torrefies',
    name: 'Torréfiés et grillés',
    description: 'Notes de cuisson, café, cacao, fruits secs et céréales grillées.',
    descriptors: [
      { id: 'cafe', name: 'Café', synonyms: ['café torréfié', 'espresso'], intensity: 5, tags: ['torrefie', 'amer', 'intense'] },
      { id: 'cacao', name: 'Cacao', synonyms: ['fève de cacao'], intensity: 4, tags: ['torrefie', 'amer', 'gourmand'] },
      { id: 'chocolat-noir', name: 'Chocolat noir', synonyms: ['chocolat amer'], intensity: 4, tags: ['gourmand', 'amer', 'torrefie'] },
      { id: 'noisette-grillee', name: 'Noisette grillée', synonyms: ['noisette torréfiée'], intensity: 4, tags: ['grille', 'sec', 'gourmand'] },
      { id: 'amande-grillee', name: 'Amande grillée', synonyms: ['amande torréfiée'], intensity: 3, tags: ['grille', 'sec', 'gourmand'] },
      { id: 'caramelise', name: 'Caramélisé', synonyms: ['caramel brun', 'sucre brûlé'], intensity: 4, tags: ['grille', 'sucre', 'amer'] },
      { id: 'pain-grille', name: 'Pain grillé', synonyms: ['toast', 'croûte de pain'], intensity: 3, tags: ['grille', 'cereale', 'sec'] },
      { id: 'malt', name: 'Malt', synonyms: ['orge maltée'], intensity: 3, tags: ['cereale', 'grille', 'doux'] }
    ]
  },
  {
    id: 'gourmands',
    name: 'Gourmands et pâtissiers',
    description: 'Notes sucrées, crémeuses, pâtissières et réconfortantes.',
    descriptors: [
      { id: 'vanille', name: 'Vanille', synonyms: ['gousse de vanille', 'vanilline'], intensity: 4, tags: ['doux', 'cremeux', 'patisserie'] },
      { id: 'caramel', name: 'Caramel', synonyms: ['caramel doux'], intensity: 4, tags: ['sucre', 'beurre', 'patisserie'] },
      { id: 'miel', name: 'Miel', synonyms: ['miel floral'], intensity: 4, tags: ['sucre', 'floral', 'rond'] },
      { id: 'amande', name: 'Amande', synonyms: ['amande douce'], intensity: 3, tags: ['sec', 'noyeau', 'gourmand'] },
      { id: 'noisette', name: 'Noisette', synonyms: ['praline noisette'], intensity: 4, tags: ['noyeau', 'grille', 'gourmand'] },
      { id: 'coco', name: 'Noix de coco', synonyms: ['lait de coco', 'coco fraîche'], intensity: 4, tags: ['exotique', 'cremeux', 'doux'] },
      { id: 'biscuit', name: 'Biscuit', synonyms: ['sablé', 'biscuit beurré'], intensity: 3, tags: ['patisserie', 'beurre', 'cereale'] },
      { id: 'creme', name: 'Crème', synonyms: ['crème fraîche', 'crème lactée'], intensity: 3, tags: ['lacte', 'cremeux', 'rond'] },
      { id: 'tonka', name: 'Fève tonka', synonyms: ['tonka'], intensity: 5, tags: ['vanille', 'epice', 'amande'] }
    ]
  },
  {
    id: 'mineraux',
    name: 'Minéraux et salins',
    description: 'Notes salines, iodées, pierreuses, métalliques et fraîches.',
    descriptors: [
      { id: 'sel-marin', name: 'Sel marin', synonyms: ['sel de mer', 'salin'], intensity: 3, tags: ['salin', 'mineral', 'umami'] },
      { id: 'iode', name: 'Iodé', synonyms: ['iode marin', 'embruns'], intensity: 4, tags: ['marin', 'salin', 'frais'] },
      { id: 'pierre-mouillee', name: 'Pierre mouillée', synonyms: ['pierre humide', 'pierre à fusil'], intensity: 3, tags: ['mineral', 'sec', 'frais'] },
      { id: 'craie', name: 'Craie', synonyms: ['crayeux'], intensity: 2, tags: ['mineral', 'sec', 'delicat'] },
      { id: 'silex', name: 'Silex', synonyms: ['pierre à fusil'], intensity: 4, tags: ['mineral', 'fumee', 'sec'] },
      { id: 'algue', name: 'Algue', synonyms: ['algue marine', 'varech'], intensity: 4, tags: ['marin', 'vegetal', 'iode'] },
      { id: 'metal', name: 'Métallique', synonyms: ['note métallique'], intensity: 2, tags: ['mineral', 'sec', 'fer'] }
    ]
  },
  {
    id: 'fermentes',
    name: 'Fermentés et lactiques',
    description: 'Notes issues de fermentations, d'acidité lactique et de maturations.',
    descriptors: [
      { id: 'yaourt', name: 'Yaourt', synonyms: ['lactique', 'lait fermenté'], intensity: 3, tags: ['lacte', 'acidule', 'cremeux'] },
      { id: 'kefir', name: 'Kéfir', synonyms: ['kéfir de fruits', 'kéfir de lait'], intensity: 4, tags: ['fermente', 'acidule', 'frais'] },
      { id: 'kombucha', name: 'Kombucha', synonyms: ['thé fermenté'], intensity: 4, tags: ['fermente', 'acidule', 'the'] },
      { id: 'vinaigre', name: 'Vinaigre', synonyms: ['vinaigre de cidre', 'vinaigre de vin'], intensity: 5, tags: ['acidule', 'fermente', 'piquant'] },
      { id: 'levure', name: 'Levure', synonyms: ['levuré', 'notes de levure'], intensity: 3, tags: ['fermente', 'cereale', 'brioche'] },
      { id: 'brioche', name: 'Brioche', synonyms: ['pâte levée', 'pain brioché'], intensity: 3, tags: ['fermente', 'beurre', 'patisserie'] },
      { id: 'fromage-frais', name: 'Fromage frais', synonyms: ['lait caillé'], intensity: 3, tags: ['lacte', 'acidule', 'cremeux'] },
      { id: 'cidre-fermente', name: 'Cidre fermenté', synonyms: ['pomme fermentée'], intensity: 4, tags: ['fermente', 'fruit', 'acidule'] }
    ]
  }
]

import { normalizeIngredientName } from './ingredients'

export function findAroma(query: string): AromaMatch[] {
  const normalized = normalizeIngredientName(query)

  if (!normalized) return []

  return aromaFamilies.flatMap(family =>
    family.descriptors
      .filter(descriptor =>
        normalizeIngredientName(descriptor.name) === normalized ||
        descriptor.synonyms.some(
          synonym => normalizeIngredientName(synonym) === normalized
        )
      )
      .map(descriptor => ({
        family: family.id,
        familyName: family.name,
        descriptor,
        confidence: 1
      }))
  )
}

export function searchAromas(query: string): AromaMatch[] {
  const normalized = normalizeIngredientName(query)

  if (!normalized) {
    return aromaFamilies.flatMap(family =>
      family.descriptors.map(descriptor => ({
        family: family.id,
        familyName: family.name,
        descriptor,
        confidence: 1
      }))
    )
  }

  return aromaFamilies.flatMap(family =>
    family.descriptors
      .filter(descriptor => {
        const terms = [
          descriptor.name,
          ...descriptor.synonyms,
          ...descriptor.tags
        ]

        return terms.some(term =>
          normalizeIngredientName(term).includes(normalized)
        )
      })
      .map(descriptor => ({
        family: family.id,
        familyName: family.name,
        descriptor,
        confidence: 0.9
      }))
  )
}

export function compareAromaProfiles(
  ingredientA: string[],
  ingredientB: string[]
): {
  shared: string[]
  uniqueToA: string[]
  uniqueToB: string[]
  similarity: number
} {
  const normalize = (values: string[]) =>
    values.map(value => normalizeIngredientName(value))

  const a = normalize(ingredientA)
  const b = normalize(ingredientB)

  const shared = a.filter(value => b.includes(value))
  const uniqueToA = a.filter(value => !b.includes(value))
  const uniqueToB = b.filter(value => !a.includes(value))

  const total = new Set([...a, ...b]).size

  const similarity = total === 0
    ? 0
    : Math.round((shared.length / total) * 100)

  return {
    shared,
    uniqueToA,
    uniqueToB,
    similarity
  }
}

export function identifyIngredientAromas(
  aromas: string[]
): AromaMatch[] {
  const results: AromaMatch[] = []

  for (const aroma of aromas) {
    const matches = findAroma(aroma)

    if (matches.length > 0) {
      results.push(...matches)
      continue
    }

    results.push(...searchAromas(aroma))
  }

  const unique = new Map<string, AromaMatch>()

  for (const match of results) {
    unique.set(match.descriptor.id, match)
  }

  return Array.from(unique.values())
}

export function identifyIngredientAromas(
  aromas: string[]
): AromaMatch[] {
  const results: AromaMatch[] = []

  for (const aroma of aromas) {
    const matches = findAroma(aroma)

    if (matches.length > 0) {
      results.push(...matches)
      continue
    }

    results.push(...searchAromas(aroma))
  }

  const unique = new Map<string, AromaMatch>()

  for (const match of results) {
    unique.set(match.descriptor.id, match)
  }

  return Array.from(unique.values())
}
