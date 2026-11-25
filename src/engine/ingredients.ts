
export type IngredientFamily =
  | 'spiritueux'
  | 'liqueurs'
  | 'vins_et_apéritifs'
  | 'bitters'
  | 'agrumes'
  | 'fruits'
  | 'herbes_et_épices'
  | 'sucres_et_sirops'
  | 'préparations'
  | 'boissons_sans_alcool'
  | 'produits_laitiers'

export type IngredientRole =
  | 'base'
  | 'modificateur'
  | 'acidité'
  | 'sucrant'
  | 'amer'
  | 'aromatique'
  | 'allonge'
  | 'texture'
  | 'garniture'

export type Ingredient = {
  id: string
  name: string
  aliases: string[]
  family: IngredientFamily
  subfamily: string
  roles: IngredientRole[]
  aromas: string[]
  taste: {
    acidity: number
    sweetness: number
    bitterness: number
    body: number
    intensity: number
  }
  pairingTags: string[]
  notes: string
}

export const ingredients: Ingredient[] = [
  // SPIRITUEUX
  {
    id: 'gin',
    name: 'Gin',
    aliases: ['London Dry Gin'],
    family: 'spiritueux',
    subfamily: 'Gin',
    roles: ['base', 'aromatique'],
    aromas: ['genièvre', 'agrumes', 'botanique'],
    taste: { acidity: 0, sweetness: 0, bitterness: 1, body: 3, intensity: 4 },
    pairingTags: ['agrumes', 'herbes', 'floral', 'concombre', 'épices'],
    notes: 'Base botanique. Le profil varie fortement selon la recette de distillation.'
  },
  {
    id: 'vodka',
    name: 'Vodka',
    aliases: ['Vodka neutre'],
    family: 'spiritueux',
    subfamily: 'Vodka',
    roles: ['base'],
    aromas: ['neutre', 'céréales'],
    taste: { acidity: 0, sweetness: 0, bitterness: 0, body: 2, intensity: 3 },
    pairingTags: ['fruits', 'agrumes', 'épices', 'café'],
    notes: 'Base discrète qui laisse généralement les autres ingrédients s’exprimer.'
  },
  {
    id: 'white-rum',
    name: 'Rhum blanc',
    aliases: ['Rhum agricole blanc', 'Rhum traditionnel blanc'],
    family: 'spiritueux',
    subfamily: 'Rhum',
    roles: ['base'],
    aromas: ['canne', 'végétal', 'fruité'],
    taste: { acidity: 0, sweetness: 1, bitterness: 0, body: 3, intensity: 4 },
    pairingTags: ['citron vert', 'tropical', 'menthe', 'épices'],
    notes: 'Profil dépendant de la matière première et du mode de production.'
  },
  {
    id: 'aged-rum',
    name: 'Rhum vieux',
    aliases: ['Rhum ambré', 'Rhum brun'],
    family: 'spiritueux',
    subfamily: 'Rhum',
    roles: ['base'],
    aromas: ['boisé', 'vanille', 'épices', 'caramel'],
    taste: { acidity: 0, sweetness: 2, bitterness: 1, body: 4, intensity: 4 },
    pairingTags: ['chocolat', 'café', 'vanille', 'banane', 'épices'],
    notes: 'Les profils varient selon l’origine, le vieillissement et le type de rhum.'
  },
  {
    id: 'tequila-blanco',
    name: 'Tequila blanco',
    aliases: ['Tequila plata', 'Silver tequila'],
    family: 'spiritueux',
    subfamily: 'Tequila',
    roles: ['base'],
    aromas: ['agave', 'végétal', 'poivre', 'agrumes'],
    taste: { acidity: 0, sweetness: 1, bitterness: 1, body: 3, intensity: 4 },
    pairingTags: ['citron vert', 'pamplemousse', 'piment', 'sel', 'agave'],
    notes: 'Profil frais et végétal, avec une expression variable de l’agave.'
  },
  {
    id: 'mezcal',
    name: 'Mezcal',
    aliases: ['Mezcal joven'],
    family: 'spiritueux',
    subfamily: 'Mezcal',
    roles: ['base', 'aromatique'],
    aromas: ['fumé', 'agave', 'terreux', 'végétal'],
    taste: { acidity: 0, sweetness: 1, bitterness: 1, body: 4, intensity: 5 },
    pairingTags: ['pamplemousse', 'piment', 'agrumes', 'sel', 'herbes'],
    notes: 'La fumée est variable selon les méthodes de production.'
  },
  {
    id: 'bourbon',
    name: 'Bourbon',
    aliases: ['American whiskey'],
    family: 'spiritueux',
    subfamily: 'Whiskey américain',
    roles: ['base'],
    aromas: ['vanille', 'maïs', 'caramel', 'bois'],
    taste: { acidity: 0, sweetness: 2, bitterness: 1, body: 4, intensity: 4 },
    pairingTags: ['érable', 'pomme', 'cerise', 'chocolat', 'bitters'],
    notes: 'Whiskey américain présentant souvent des notes de vanille et de chêne.'
  },
  {
    id: 'rye-whiskey',
    name: 'Rye whiskey',
    aliases: ['Whiskey de seigle'],
    family: 'spiritueux',
    subfamily: 'Whiskey américain',
    roles: ['base'],
    aromas: ['seigle', 'épices', 'poivre', 'bois'],
    taste: { acidity: 0, sweetness: 1, bitterness: 1, body: 4, intensity: 4 },
    pairingTags: ['vermouth', 'bitters', 'orange', 'cerise', 'épices'],
    notes: 'Profil souvent plus épicé et sec que le bourbon.'
  },
  {
    id: 'scotch-whisky',
    name: 'Scotch whisky',
    aliases: ['Whisky écossais', 'Single malt'],
    family: 'spiritueux',
    subfamily: 'Whisky écossais',
    roles: ['base'],
    aromas: ['malt', 'bois', 'fruits', 'tourbe'],
    taste: { acidity: 0, sweetness: 1, bitterness: 1, body: 4, intensity: 5 },
    pairingTags: ['miel', 'pomme', 'chocolat', 'agrumes', 'fumé'],
    notes: 'Profil très variable selon la région, la distillerie et le vieillissement.'
  },
  {
    id: 'cognac',
    name: 'Cognac',
    aliases: ['Eau-de-vie de vin', 'Brandy'],
    family: 'spiritueux',
    subfamily: 'Brandy',
    roles: ['base'],
    aromas: ['raisin', 'bois', 'fruits secs', 'épices'],
    taste: { acidity: 0, sweetness: 1, bitterness: 1, body: 4, intensity: 4 },
    pairingTags: ['orange', 'chocolat', 'vanille', 'café', 'noix'],
    notes: 'Eau-de-vie de vin. Les profils évoluent avec le cru et le vieillissement.'
  },

  // LIQUEURS ET MODIFICATEURS
  {
    id: 'triple-sec',
    name: 'Triple sec',
    aliases: ['Liqueur d’orange', 'Curaçao sec'],
    family: 'liqueurs',
    subfamily: 'Agrumes',
    roles: ['modificateur', 'sucrant'],
    aromas: ['orange', 'écorce', 'agrumes'],
    taste: { acidity: 1, sweetness: 4, bitterness: 1, body: 2, intensity: 3 },
    pairingTags: ['citron', 'tequila', 'cognac', 'gin', 'chocolat'],
    notes: 'La teneur en sucre et le degré varient selon les marques.'
  },
  {
    id: 'green-chartreuse',
    name: 'Chartreuse verte',
    aliases: ['Liqueur de Chartreuse verte'],
    family: 'liqueurs',
    subfamily: 'Liqueur herbacée',
    roles: ['modificateur', 'aromatique'],
    aromas: ['herbes', 'épices', 'menthe', 'résine'],
    taste: { acidity: 0, sweetness: 3, bitterness: 3, body: 4, intensity: 5 },
    pairingTags: ['gin', 'citron vert', 'marasquin', 'menthe'],
    notes: 'Liqueur très expressive à doser avec précision.'
  },
  {
    id: 'elderflower-liqueur',
    name: 'Liqueur de sureau',
    aliases: ['St-Germain', 'Elderflower'],
    family: 'liqueurs',
    subfamily: 'Liqueur florale',
    roles: ['modificateur', 'sucrant'],
    aromas: ['fleur de sureau', 'floral', 'fruit blanc'],
    taste: { acidity: 0, sweetness: 4, bitterness: 0, body: 2, intensity: 3 },
    pairingTags: ['gin', 'concombre', 'citron', 'pomme', 'vin pétillant'],
    notes: 'Apporte une dimension florale et une douceur marquée.'
  },
  {
    id: 'maraschino',
    name: 'Liqueur de marasquin',
    aliases: ['Maraschino'],
    family: 'liqueurs',
    subfamily: 'Liqueur de cerise',
    roles: ['modificateur', 'sucrant'],
    aromas: ['cerise', 'amande', 'noyau'],
    taste: { acidity: 0, sweetness: 3, bitterness: 1, body: 2, intensity: 4 },
    pairingTags: ['gin', 'agrumes', 'herbes', 'fruits rouges'],
    notes: 'Liqueur sèche et aromatique, différente des crèmes de cerise.'
  },
  {
    id: 'coffee-liqueur',
    name: 'Liqueur de café',
    aliases: ['Kahlúa', 'Liqueur café'],
    family: 'liqueurs',
    subfamily: 'Liqueur de café',
    roles: ['modificateur', 'sucrant'],
    aromas: ['café', 'torréfié', 'caramel'],
    taste: { acidity: 0, sweetness: 5, bitterness: 2, body: 4, intensity: 4 },
    pairingTags: ['vodka', 'rhum', 'vanille', 'chocolat', 'crème'],
    notes: 'La douceur et l’intensité du café varient selon la référence.'
  },
  {
    id: 'creme-de-cassis',
    name: 'Crème de cassis',
    aliases: ['Cassis'],
    family: 'liqueurs',
    subfamily: 'Liqueur de fruits noirs',
    roles: ['modificateur', 'sucrant'],
    aromas: ['cassis', 'fruits noirs', 'baies'],
    taste: { acidity: 2, sweetness: 5, bitterness: 1, body: 4, intensity: 4 },
    pairingTags: ['vin blanc', 'champagne', 'citron', 'gin', 'fruits rouges'],
    notes: 'Liqueur fruitée et concentrée, généralement très sucrée.'
  },
  {
    id: 'amaretto',
    name: 'Amaretto',
    aliases: ['Liqueur d’amande'],
    family: 'liqueurs',
    subfamily: 'Liqueur de fruits à coque',
    roles: ['modificateur', 'sucrant'],
    aromas: ['amande', 'noyau', 'vanille'],
    taste: { acidity: 0, sweetness: 5, bitterness: 1, body: 3, intensity: 4 },
    pairingTags: ['citron', 'whisky', 'café', 'chocolat', 'poire'],
    notes: 'Vérifier les ingrédients et allergènes propres à chaque marque.'
  },
  {
    id: 'aperol',
    name: 'Aperol',
    aliases: ['Apéritif orange'],
    family: 'vins_et_apéritifs',
    subfamily: 'Apéritif amer',
    roles: ['modificateur', 'amer'],
    aromas: ['orange', 'rhubarbe', 'herbes'],
    taste: { acidity: 1, sweetness: 3, bitterness: 3, body: 2, intensity: 3 },
    pairingTags: ['prosecco', 'orange', 'soda', 'gin', 'pamplemousse'],
    notes: 'Apéritif doux-amer, moins intense que de nombreux amers rouges.'
  },
  {
    id: 'campari',
    name: 'Campari',
    aliases: ['Bitter rouge'],
    family: 'bitters',
    subfamily: 'Bitter italien',
    roles: ['modificateur', 'amer', 'aromatique'],
    aromas: ['orange amère', 'herbes', 'racines'],
    taste: { acidity: 1, sweetness: 2, bitterness: 5, body: 3, intensity: 5 },
    pairingTags: ['gin', 'vermouth rouge', 'orange', 'pamplemousse', 'rhum'],
    notes: 'Bitter puissant, structurant dans les compositions amères.'
  },
  {
    id: 'sweet-vermouth',
    name: 'Vermouth rouge',
    aliases: ['Vermouth rosso', 'Vermouth sweet'],
    family: 'vins_et_apéritifs',
    subfamily: 'Vermouth',
    roles: ['modificateur', 'aromatique'],
    aromas: ['plantes', 'épices', 'caramel', 'agrumes'],
    taste: { acidity: 1, sweetness: 3, bitterness: 2, body: 3, intensity: 3 },
    pairingTags: ['gin', 'whisky', 'orange', 'bitter', 'cerise'],
    notes: 'Vin aromatisé. Conserver au frais après ouverture selon les recommandations du producteur.'
  },
  {
    id: 'dry-vermouth',
    name: 'Vermouth dry',
    aliases: ['Vermouth blanc sec'],
    family: 'vins_et_apéritifs',
    subfamily: 'Vermouth',
    roles: ['modificateur', 'aromatique'],
    aromas: ['herbes', 'agrumes', 'floral'],
    taste: { acidity: 2, sweetness: 1, bitterness: 2, body: 2, intensity: 3 },
    pairingTags: ['gin', 'vodka', 'citron', 'olive', 'herbes'],
    notes: 'Apporte une structure vineuse et sèche.'
  },
  {
    id: 'angostura',
    name: 'Angostura bitters',
    aliases: ['Bitters aromatiques'],
    family: 'bitters',
    subfamily: 'Bitters concentrés',
    roles: ['amer', 'aromatique'],
    aromas: ['épices', 'racines', 'écorce'],
    taste: { acidity: 0, sweetness: 1, bitterness: 5, body: 1, intensity: 5 },
    pairingTags: ['whisky', 'rhum', 'orange', 'sucre', 'chocolat'],
    notes: 'Produit très concentré : quelques traits suffisent souvent.'
  },
  {
    id: 'orange-bitters',
    name: 'Orange bitters',
    aliases: ['Bitters orange'],
    family: 'bitters',
    subfamily: 'Bitters d’agrumes',
    roles: ['amer', 'aromatique'],
    aromas: ['orange', 'écorce', 'épices'],
    taste: { acidity: 1, sweetness: 0, bitterness: 4, body: 1, intensity: 4 },
    pairingTags: ['gin', 'vermouth', 'whisky', 'orange', 'agrumes'],
    notes: 'Accentue les notes d’agrumes et apporte de la complexité.'
  },

  // AGRUMES ET FRUITS
  {
    id: 'lime',
    name: 'Citron vert',
    aliases: ['Lime', 'Jus de citron vert'],
    family: 'agrumes',
    subfamily: 'Agrume acide',
    roles: ['acidité', 'aromatique'],
    aromas: ['zeste', 'vert', 'frais'],
    taste: { acidity: 5, sweetness: 0, bitterness: 1, body: 1, intensity: 4 },
    pairingTags: ['rhum', 'gin', 'tequila', 'menthe', 'gingembre'],
    notes: 'Jus et zeste n’apportent pas exactement les mêmes arômes.'
  },
  {
    id: 'lemon',
    name: 'Citron jaune',
    aliases: ['Citron', 'Jus de citron jaune'],
    family: 'agrumes',
    subfamily: 'Agrume acide',
    roles: ['acidité', 'aromatique'],
    aromas: ['citron', 'zeste', 'frais'],
    taste: { acidity: 5, sweetness: 0, bitterness: 1, body: 1, intensity: 4 },
    pairingTags: ['gin', 'vodka', 'miel', 'basilic', 'fruits rouges'],
    notes: 'Acidité franche, particulièrement utile pour équilibrer les sucres.'
  },
  {
    id: 'orange',
    name: 'Orange',
    aliases: ['Jus d’orange', 'Zeste d’orange'],
    family: 'agrumes',
    subfamily: 'Agrume doux',
    roles: ['aromatique', 'garniture'],
    aromas: ['orange', 'zeste', 'fruité'],
    taste: { acidity: 2, sweetness: 3, bitterness: 1, body: 2, intensity: 3 },
    pairingTags: ['gin', 'rhum', 'whisky', 'cannelle', 'chocolat'],
    notes: 'Le jus, la pulpe et le zeste ont des fonctions différentes.'
  },
  {
    id: 'grapefruit',
    name: 'Pamplemousse',
    aliases: ['Pomelo', 'Jus de pamplemousse'],
    family: 'agrumes',
    subfamily: 'Agrume amer',
    roles: ['acidité', 'aromatique'],
    aromas: ['pamplemousse', 'zeste', 'floral'],
    taste: { acidity: 3, sweetness: 2, bitterness: 3, body: 2, intensity: 4 },
    pairingTags: ['gin', 'tequila', 'mezcal', 'romarin', 'sel'],
    notes: 'Peut apporter simultanément acidité et amertume.'
  },
  {
    id: 'yuzu',
    name: 'Yuzu',
    aliases: ['Jus de yuzu'],
    family: 'agrumes',
    subfamily: 'Agrume aromatique',
    roles: ['acidité', 'aromatique'],
    aromas: ['mandarine', 'citron', 'pamplemousse'],
    taste: { acidity: 5, sweetness: 0, bitterness: 1, body: 1, intensity: 5 },
    pairingTags: ['gin', 'vodka', 'thé', 'gingembre', 'concombre'],
    notes: 'Très aromatique. Vérifier la concentration des jus et purées commerciales.'
  },
  {
    id: 'apple',
    name: 'Pomme',
    aliases: ['Jus de pomme', 'Pomme fraîche'],
    family: 'fruits',
    subfamily: 'Fruit à pépins',
    roles: ['allonge', 'aromatique'],
    aromas: ['pomme', 'vert', 'floral'],
    taste: { acidity: 2, sweetness: 3, bitterness: 0, body: 2, intensity: 2 },
    pairingTags: ['calvados', 'cannelle', 'romarin', 'poire', 'gingembre'],
    notes: 'Le profil varie selon la variété et la préparation.'
  },
  {
    id: 'pear',
    name: 'Poire',
    aliases: ['Jus de poire', 'Purée de poire'],
    family: 'fruits',
    subfamily: 'Fruit à pépins',
    roles: ['aromatique', 'texture'],
    aromas: ['poire', 'floral', 'miel'],
    taste: { acidity: 1, sweetness: 4, bitterness: 0, body: 3, intensity: 3 },
    pairingTags: ['gin', 'cognac', 'amande', 'vanille', 'romarin'],
    notes: 'Apporte une douceur fruitée et une texture intéressante en purée.'
  },
  {
    id: 'raspberry',
    name: 'Framboise',
    aliases: ['Purée de framboise', 'Sirop de framboise'],
    family: 'fruits',
    subfamily: 'Petits fruits rouges',
    roles: ['aromatique', 'acidité'],
    aromas: ['framboise', 'fruit rouge', 'floral'],
    taste: { acidity: 3, sweetness: 3, bitterness: 0, body: 2, intensity: 4 },
    pairingTags: ['gin', 'citron', 'rose', 'vanille', 'champagne'],
    notes: 'La purée, le jus et le sirop ont des concentrations très différentes.'
  },
  {
    id: 'pineapple',
    name: 'Ananas',
    aliases: ['Jus d’ananas', 'Purée d’ananas'],
    family: 'fruits',
    subfamily: 'Fruit tropical',
    roles: ['allonge', 'sucrant', 'texture'],
    aromas: ['ananas', 'tropical', 'acidulé'],
    taste: { acidity: 3, sweetness: 4, bitterness: 0, body: 3, intensity: 4 },
    pairingTags: ['rhum', 'coco', 'citron vert', 'gingembre', 'vanille'],
    notes: 'Apporte du volume, du sucre et une acidité variable.'
  },
  {
    id: 'passion-fruit',
    name: 'Fruit de la passion',
    aliases: ['Passion', 'Purée de passion'],
    family: 'fruits',
    subfamily: 'Fruit tropical',
    roles: ['acidité', 'aromatique', 'texture'],
    aromas: ['tropical', 'floral', 'fruit exotique'],
    taste: { acidity: 5, sweetness: 3, bitterness: 0, body: 3, intensity: 5 },
    pairingTags: ['rhum', 'vodka', 'vanille', 'citron vert', 'mangue'],
    notes: 'Très expressif et souvent acidulé. Ajuster le sucre selon la préparation.'
  },
  {
    id: 'strawberry',
    name: 'Fraise',
    aliases: ['Purée de fraise', 'Fraise fraîche'],
    family: 'fruits',
    subfamily: 'Petits fruits rouges',
    roles: ['aromatique', 'sucrant'],
    aromas: ['fraise', 'floral', 'fruit rouge'],
    taste: { acidity: 2, sweetness: 4, bitterness: 0, body: 2, intensity: 3 },
    pairingTags: ['gin', 'basilic', 'poivre', 'citron', 'rhubarbe'],
    notes: 'La maturité du fruit influence fortement son intensité aromatique.'
  },

  // HERBES ET ÉPICES
  {
    id: 'mint',
    name: 'Menthe',
    aliases: ['Menthe fraîche'],
    family: 'herbes_et_épices',
    subfamily: 'Herbe fraîche',
    roles: ['aromatique', 'garniture'],
    aromas: ['menthol', 'végétal', 'frais'],
    taste: { acidity: 0, sweetness: 0, bitterness: 1, body: 1, intensity: 4 },
    pairingTags: ['rhum', 'citron vert', 'concombre', 'chocolat', 'fruits rouges'],
    notes: 'Éviter de broyer excessivement les feuilles pour limiter les notes végétales amères.'
  },
  {
    id: 'basil',
    name: 'Basilic',
    aliases: ['Basilic frais'],
    family: 'herbes_et_épices',
    subfamily: 'Herbe fraîche',
    roles: ['aromatique', 'garniture'],
    aromas: ['vert', 'anis', 'poivré'],
    taste: { acidity: 0, sweetness: 0, bitterness: 1, body: 1, intensity: 4 },
    pairingTags: ['gin', 'citron', 'fraise', 'tomate', 'concombre'],
    notes: 'Manipulation délicate recommandée pour préserver sa fraîcheur.'
  },
  {
    id: 'rosemary',
    name: 'Romarin',
    aliases: ['Romarin frais'],
    family: 'herbes_et_épices',
    subfamily: 'Herbe aromatique',
    roles: ['aromatique', 'garniture'],
    aromas: ['résine', 'pin', 'camphre'],
    taste: { acidity: 0, sweetness: 0, bitterness: 2, body: 1, intensity: 5 },
    pairingTags: ['gin', 'pomme', 'poire', 'pamplemousse', 'miel'],
    notes: 'Très puissant : dosage et temps d’infusion à contrôler.'
  },
  {
    id: 'thyme',
    name: 'Thym',
    aliases: ['Thym frais'],
    family: 'herbes_et_épices',
    subfamily: 'Herbe aromatique',
    roles: ['aromatique', 'garniture'],
    aromas: ['herbacé', 'sec', 'résine'],
    taste: { acidity: 0, sweetness: 0, bitterness: 1, body: 1, intensity: 4 },
    pairingTags: ['citron', 'gin', 'miel', 'pêche', 'romarin'],
    notes: 'Peut être utilisé en infusion ou en garniture.'
  },
  {
    id: 'ginger',
    name: 'Gingembre',
    aliases: ['Gingembre frais', 'Jus de gingembre'],
    family: 'herbes_et_épices',
    subfamily: 'Racine',
    roles: ['aromatique', 'modificateur'],
    aromas: ['épicé', 'citronné', 'piquant'],
    taste: { acidity: 1, sweetness: 1, bitterness: 1, body: 2, intensity: 5 },
    pairingTags: ['rhum', 'vodka', 'citron vert', 'pomme', 'miel'],
    notes: 'La sensation piquante dépend de la variété et de la concentration.'
  },
  {
    id: 'cinnamon',
    name: 'Cannelle',
    aliases: ['Bâton de cannelle', 'Cannelle moulue'],
    family: 'herbes_et_épices',
    subfamily: 'Épice',
    roles: ['aromatique'],
    aromas: ['chaud', 'boisé', 'épicé'],
    taste: { acidity: 0, sweetness: 1, bitterness: 1, body: 1, intensity: 4 },
    pairingTags: ['pomme', 'poire', 'rhum', 'whisky', 'vanille'],
    notes: 'Épice à utiliser en infusion ou en garniture avec mesure.'
  },
  {
    id: 'black-pepper',
    name: 'Poivre noir',
    aliases: ['Poivre'],
    family: 'herbes_et_épices',
    subfamily: 'Épice',
    roles: ['aromatique'],
    aromas: ['poivré', 'boisé', 'chaud'],
    taste: { acidity: 0, sweetness: 0, bitterness: 1, body: 1, intensity: 4 },
    pairingTags: ['fraise', 'agrumes', 'gin', 'tomate', 'miel'],
    notes: 'Une petite quantité peut modifier fortement la perception aromatique.'
  },

  // SUCRES ET SIROPS
  {
    id: 'simple-syrup',
    name: 'Sirop simple',
    aliases: ['Sirop de sucre', 'Simple syrup'],
    family: 'sucres_et_sirops',
    subfamily: 'Sirop neutre',
    roles: ['sucrant'],
    aromas: ['neutre'],
    taste: { acidi
