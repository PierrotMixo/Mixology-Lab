
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
  // EXTENSION SPIRITUEUX - LOT 5
  {
    id: 'tequila-reposado',
    name: 'Tequila Reposado',
    aliases: ['Reposado tequila'],
    family: 'spiritueux',
    subfamily: 'Tequila',
    roles: ['base', 'aromatique'],
    aromas: ['agave', 'vanille', 'bois', 'poivre', 'agrumes'],
    taste: { acidity: 1, sweetness: 2, bitterness: 1, body: 4, intensity: 4 },
    pairingTags: ['citron vert', 'pamplemousse', 'vanille', 'ananas', 'épices'],
    notes: 'Tequila reposée en contenant de bois pendant au moins deux mois, avec des notes d’agave et un apport variable du bois.'
  },
  {
    id: 'tequila-anejo',
    name: 'Tequila Añejo',
    aliases: ['Añejo tequila'],
    family: 'spiritueux',
    subfamily: 'Tequila',
    roles: ['base', 'aromatique'],
    aromas: ['agave', 'bois', 'vanille', 'caramel', 'épices'],
    taste: { acidity: 1, sweetness: 2, bitterness: 1, body: 4, intensity: 5 },
    pairingTags: ['orange', 'chocolat', 'café', 'vanille', 'cannelle'],
    notes: 'Tequila vieillie au moins un an en fût de chêne de capacité réglementaire, avec un profil plus boisé et complexe.'
  },
  {
    id: 'tequila-blanco-premium',
    name: 'Tequila Blanco 100 % agave',
    aliases: ['Tequila plata', 'Tequila silver 100% agave'],
    family: 'spiritueux',
    subfamily: 'Tequila',
    roles: ['base', 'aromatique'],
    aromas: ['agave frais', 'poivre', 'agrumes', 'herbes'],
    taste: { acidity: 1, sweetness: 1, bitterness: 1, body: 3, intensity: 4 },
    pairingTags: ['citron vert', 'pamplemousse', 'concombre', 'piment', 'coriandre'],
    notes: 'Tequila non vieillie ou très peu vieillie, élaborée à partir de 100 % d’agave bleu. À distinguer des tequilas mixto.'
  },
  {
    id: 'mezcal-anejo',
    name: 'Mezcal Añejo',
    aliases: ['Añejo mezcal', 'Mezcal vieilli'],
    family: 'spiritueux',
    subfamily: 'Mezcal',
    roles: ['base', 'aromatique'],
    aromas: ['fumée', 'agave', 'bois', 'épices', 'fruits secs'],
    taste: { acidity: 1, sweetness: 1, bitterness: 2, body: 4, intensity: 5 },
    pairingTags: ['orange', 'chocolat noir', 'piment', 'cacao', 'épices'],
    notes: 'Mezcal vieilli au moins un an en contenant de bois, associant notes d’agave, fumée éventuelle et bois.'
  },
  {
    id: 'bacanora',
    name: 'Bacanora',
    aliases: ['Spiritueux d’agave de Sonora'],
    family: 'spiritueux',
    subfamily: 'Spiritueux d’agave mexicain',
    roles: ['base', 'aromatique'],
    aromas: ['agave', 'fumée', 'herbes', 'poivre', 'terre'],
    taste: { acidity: 1, sweetness: 1, bitterness: 2, body: 3, intensity: 5 },
    pairingTags: ['citron vert', 'pamplemousse', 'piment', 'coriandre', 'orange'],
    notes: 'Spiritueux mexicain d’agave originaire du Sonora, au profil pouvant présenter des notes végétales, terreuses et fumées.'
  },
  {
    id: 'sotol',
    name: 'Sotol',
    aliases: ['Spiritueux de Dasylirion'],
    family: 'spiritueux',
    subfamily: 'Spiritueux mexicain',
    roles: ['base', 'aromatique'],
    aromas: ['végétal', 'terre', 'herbes', 'poivre', 'fumée'],
    taste: { acidity: 1, sweetness: 0, bitterness: 2, body: 3, intensity: 4 },
    pairingTags: ['citron vert', 'pamplemousse', 'herbes', 'piment', 'concombre'],
    notes: 'Spiritueux traditionnel du nord du Mexique élaboré à partir de Dasylirion, une plante distincte de l’agave.'
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
    aliases: ['Whisky écossais'],
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
  // EXTENSION SPIRITUEUX - LOT 2
  {
    id: 'irish-whiskey',
    name: 'Whiskey irlandais',
    aliases: ['Irish whiskey'],
    family: 'spiritueux',
    subfamily: 'Whiskey irlandais',
    roles: ['base', 'aromatique'],
    aromas: ['céréales', 'vanille', 'fruits', 'miel'],
    taste: { acidity: 1, sweetness: 2, bitterness: 0, body: 3, intensity: 3 },
    pairingTags: ['pomme', 'poire', 'miel', 'vanille', 'gingembre'],
    notes: 'Whiskey généralement doux et accessible, souvent marqué par les céréales, les fruits et le bois.'
  },
  {
    id: 'japanese-whisky',
    name: 'Whisky japonais',
    aliases: ['Japanese whisky'],
    family: 'spiritueux',
    subfamily: 'Whisky japonais',
    roles: ['base', 'aromatique'],
    aromas: ['céréales', 'bois', 'fruits', 'épices', 'floral'],
    taste: { acidity: 1, sweetness: 1, bitterness: 1, body: 3, intensity: 4 },
    pairingTags: ['poire', 'agrumes', 'thé', 'miel', 'épices'],
    notes: 'Famille très diverse, souvent recherchée pour son équilibre et sa précision aromatique.'
  },
  {
    id: 'blended-scotch',
    name: 'Blended Scotch whisky',
    aliases: ['Scotch blend', 'Blended Scotch'],
    family: 'spiritueux',
    subfamily: 'Whisky écossais assemblé',
    roles: ['base', 'aromatique'],
    aromas: ['céréales', 'malt', 'bois', 'vanille', 'fumée'],
    taste: { acidity: 1, sweetness: 1, bitterness: 1, body: 3, intensity: 4 },
    pairingTags: ['miel', 'pomme', 'citron', 'gingembre', 'bois'],
    notes: 'Assemblage de whiskies de malt et de grain. Profil variable selon les maisons et les proportions.'
  },
  {
    id: 'old-tom-gin',
    name: 'Old Tom Gin',
    aliases: ['Gin Old Tom'],
    family: 'spiritueux',
    subfamily: 'Gin',
    roles: ['base', 'aromatique'],
    aromas: ['genièvre', 'agrumes', 'épices', 'floral'],
    taste: { acidity: 0, sweetness: 2, bitterness: 1, body: 3, intensity: 4 },
    pairingTags: ['citron', 'orange', 'gingembre', 'floral', 'épices'],
    notes: 'Style de gin traditionnel légèrement adouci, particulièrement intéressant en cocktails classiques.'
  },
  {
    id: 'navy-strength-gin',
    name: 'Navy Strength Gin',
    aliases: ['Gin Navy Strength', 'Gin 57°'],
    family: 'spiritueux',
    subfamily: 'Gin',
    roles: ['base', 'aromatique'],
    aromas: ['genièvre', 'agrumes', 'botanique', 'épices'],
    taste: { acidity: 0, sweetness: 0, bitterness: 1, body: 4, intensity: 5 },
    pairingTags: ['citron', 'pamplemousse', 'romarin', 'épices', 'concombre'],
    notes: 'Gin à degré alcoolique élevé, souvent autour de 57 % vol., avec une présence aromatique puissante.'
              },
  {
    id: 'genever',
    name: 'Genièvre (Genever)',
    aliases: ['Genever', 'Holland gin', 'Jenever'],
    family: 'spiritueux',
    subfamily: 'Genièvre',
    roles: ['base', 'aromatique'],
    aromas: ['genièvre', 'malt', 'céréales', 'herbes'],
    taste: { acidity: 0, sweetness: 1, bitterness: 1, body: 4, intensity: 4 },
    pairingTags: ['pomme', 'malt', 'épices', 'agrumes', 'herbes'],
    notes: 'Eau-de-vie traditionnelle des Pays-Bas et de Belgique, souvent plus maltée et ronde qu’un gin classique.'
  },
  {
    id: 'aged-agricultural-rum',
    name: 'Rhum agricole vieux',
    aliases: ['Rhum vieux agricole', 'Rhum vieux de Martinique'],
    family: 'spiritueux',
    subfamily: 'Rhum agricole',
    roles: ['base', 'aromatique'],
    aromas: ['canne', 'bois', 'vanille', 'épices', 'fruits secs'],
    taste: { acidity: 1, sweetness: 2, bitterness: 1, body: 4, intensity: 5 },
    pairingTags: ['cacao', 'café', 'orange', 'vanille', 'épices'],
    notes: 'Rhum agricole issu du jus de canne, vieilli en fût. Profil marqué par le terroir et le vieillissement.'
  },
  {
    id: 'traditional-white-rum',
    name: 'Rhum blanc traditionnel',
    aliases: ['Rhum blanc', 'Rhum blanc de mélasse', 'White rum'],
    family: 'spiritueux',
    subfamily: 'Rhum traditionnel',
    roles: ['base'],
    aromas: ['canne', 'mélasse', 'vanille', 'fruits légers'],
    taste: { acidity: 0, sweetness: 1, bitterness: 0, body: 2, intensity: 3 },
    pairingTags: ['citron vert', 'menthe', 'ananas', 'coco', 'fruits tropicaux'],
    notes: 'Rhum blanc généralement issu de mélasse, au profil relativement neutre ou légèrement fruité, très polyvalent en cocktail.'
  },

  {
    id: 'jamaican-rum',
    name: 'Rhum jamaïcain',
    aliases: ['Jamaican rum', 'Rhum high ester'],
    family: 'spiritueux',
    subfamily: 'Rhum traditionnel jamaïcain',
    roles: ['base', 'aromatique'],
    aromas: ['banane mûre', 'ananas', 'fruits fermentés', 'épices'],
    taste: { acidity: 1, sweetness: 1, bitterness: 1, body: 4, intensity: 5 },
    pairingTags: ['ananas', 'banane', 'citron vert', 'gingembre', 'épices'],
    notes: 'Souvent expressif et riche en esters. Intensité aromatique variable selon la distillerie.'
  },
  {
    id: 'cachaca',
    name: 'Cachaça',
    aliases: ['Rhum brésilien'],
    family: 'spiritueux',
    subfamily: 'Cachaça',
    roles: ['base'],
    aromas: ['canne fraîche', 'végétal', 'fruité', 'herbes'],
    taste: { acidity: 1, sweetness: 1, bitterness: 1, body: 3, intensity: 4 },
    pairingTags: ['citron vert', 'fruits tropicaux', 'gingembre', 'menthe'],
    notes: 'Eau-de-vie brésilienne issue du jus de canne frais, généralement non vieillie dans les versions classiques.'
  },
  {
    id: 'pisco',
    name: 'Pisco',
    aliases: ['Pisco péruvien', 'Pisco chilien'],
    family: 'spiritueux',
    subfamily: 'Eau-de-vie de raisin',
    roles: ['base', 'aromatique'],
    aromas: ['raisin', 'fleurs', 'fruits blancs', 'agrumes'],
    taste: { acidity: 1, sweetness: 1, bitterness: 0, body: 3, intensity: 4 },
    pairingTags: ['citron', 'citron vert', 'fruits blancs', 'floral', 'herbes'],
    notes: 'Eau-de-vie de raisin dont le profil varie selon les cépages et les traditions de production.'
  },
  {
    id: 'armagnac',
    name: 'Armagnac',
    aliases: ['Eau-de-vie d’Armagnac'],
    family: 'spiritueux',
    subfamily: 'Brandy',
    roles: ['base', 'aromatique'],
    aromas: ['raisin', 'prune', 'bois', 'épices', 'fruits secs'],
    taste: { acidity: 1, sweetness: 1, bitterness: 1, body: 4, intensity: 5 },
    pairingTags: ['prune', 'orange', 'chocolat', 'vanille', 'noix'],
    notes: 'Eau-de-vie de vin du Sud-Ouest français, souvent riche et expressive après vieillissement.'
  },
  {
    id: 'calvados',
    name: 'Calvados',
    aliases: ['Eau-de-vie de cidre', 'Apple brandy normand'],
    family: 'spiritueux',
    subfamily: 'Eau-de-vie de cidre',
    roles: ['base', 'aromatique'],
    aromas: ['pomme', 'poire', 'bois', 'vanille', 'épices'],
    taste: { acidity: 2, sweetness: 1, bitterness: 1, body: 3, intensity: 4 },
    pairingTags: ['pomme', 'poire', 'cannelle', 'caramel', 'citron'],
    notes: 'Eau-de-vie normande issue du cidre ou du poiré selon les appellations et catégories.'
  },
  // EXTENSION SPIRITUEUX - LOT 4
  {
    id: 'raspberry-eau-de-vie',
    name: 'Eau-de-vie de framboise',
    aliases: ['Framboise', 'Raspberry eau-de-vie'],
    family: 'spiritueux',
    subfamily: 'Eau-de-vie de fruit',
    roles: ['base', 'aromatique'],
    aromas: ['framboise', 'fruits rouges', 'floral'],
    taste: { acidity: 1, sweetness: 0, bitterness: 0, body: 2, intensity: 4 },
    pairingTags: ['framboise', 'citron', 'rose', 'chocolat blanc', 'fruits rouges'],
    notes: 'Eau-de-vie sèche et expressive, obtenue par fermentation puis distillation de framboises.'
  },
  {
    id: 'mirabelle-eau-de-vie',
    name: 'Eau-de-vie de mirabelle',
    aliases: ['Mirabelle', 'Mirabelle brandy'],
    family: 'spiritueux',
    subfamily: 'Eau-de-vie de fruit',
    roles: ['base', 'aromatique'],
    aromas: ['mirabelle', 'prune jaune', 'fruit mûr', 'floral'],
    taste: { acidity: 1, sweetness: 0, bitterness: 0, body: 2, intensity: 4 },
    pairingTags: ['mirabelle', 'pêche', 'amande', 'vanille', 'miel'],
    notes: 'Eau-de-vie fruitée et délicate, généralement sèche malgré ses arômes de fruits mûrs.'
  },
  {
    id: 'kirsch',
    name: 'Kirsch',
    aliases: ['Eau-de-vie de cerise', 'Cherry eau-de-vie'],
    family: 'spiritueux',
    subfamily: 'Eau-de-vie de fruit',
    roles: ['base', 'aromatique'],
    aromas: ['cerise', 'noyau', 'amande', 'fruit rouge'],
    taste: { acidity: 1, sweetness: 0, bitterness: 1, body: 2, intensity: 4 },
    pairingTags: ['cerise', 'chocolat', 'amande', 'fruits rouges', 'vanille'],
    notes: 'Eau-de-vie de cerise incolore, souvent marquée par les notes de noyau et d’amande.'
  },
  {
    id: 'plum-eau-de-vie',
    name: 'Eau-de-vie de prune',
    aliases: ['Prune brandy', 'Eau-de-vie de prunes'],
    family: 'spiritueux',
    subfamily: 'Eau-de-vie de fruit',
    roles: ['base', 'aromatique'],
    aromas: ['prune', 'fruits secs', 'noyau', 'floral'],
    taste: { acidity: 1, sweetness: 0, bitterness: 1, body: 3, intensity: 4 },
    pairingTags: ['prune', 'cannelle', 'amande', 'chocolat', 'orange'],
    notes: 'Famille d’eaux-de-vie dont le profil varie selon les variétés de prunes et les méthodes de distillation.'
  },
  {
    id: 'grappa',
    name: 'Grappa',
    aliases: ['Eau-de-vie de marc italienne'],
    family: 'spiritueux',
    subfamily: 'Eau-de-vie de marc',
    roles: ['base', 'aromatique'],
    aromas: ['raisin', 'marc', 'floral', 'herbes'],
    taste: { acidity: 1, sweetness: 0, bitterness: 2, body: 3, intensity: 5 },
    pairingTags: ['raisin', 'agrumes', 'amande', 'café', 'chocolat noir'],
    notes: 'Eau-de-vie italienne obtenue par distillation du marc de raisin. Son caractère varie selon le cépage et le vieillissement.'
  },
  {
    id: 'marc-de-raisin',
    name: 'Marc de raisin',
    aliases: ['Eau-de-vie de marc', 'Marc français'],
    family: 'spiritueux',
    subfamily: 'Eau-de-vie de marc',
    roles: ['base', 'aromatique'],
    aromas: ['raisin', 'marc', 'bois', 'épices'],
    taste: { acidity: 1, sweetness: 0, bitterness: 2, body: 3, intensity: 5 },
    pairingTags: ['raisin', 'noix', 'agrumes', 'chocolat noir', 'épices'],
    notes: 'Eau-de-vie française issue de la distillation du marc de raisin, avec un profil dépendant de la région et du vieillissement.'
  },


  // EXTENSION SPIRITUEUX - LOT 3
  {
    id: 'flavoured-vodka',
    name: 'Vodka aromatisée',
    aliases: ['Vodka parfumée', 'Flavoured vodka'],
    family: 'spiritueux',
    subfamily: 'Vodka aromatisée',
    roles: ['base', 'aromatique'],
    aromas: ['fruits', 'agrumes', 'épices', 'floral'],
    taste: { acidity: 0, sweetness: 1, bitterness: 0, body: 2, intensity: 3 },
    pairingTags: ['fruits rouges', 'agrumes', 'vanille', 'herbes', 'épices'],
    notes: 'Vodka aromatisée par macération, infusion ou ajout d’arômes. Le profil dépend entièrement de la saveur choisie.'
  },
  {
    id: 'contemporary-gin',
    name: 'Gin contemporain',
    aliases: ['New Western Gin', 'New Western Dry Gin'],
    family: 'spiritueux',
    subfamily: 'Gin',
    roles: ['base', 'aromatique'],
    aromas: ['floral', 'agrumes', 'herbes', 'fruits', 'botanique'],
    taste: { acidity: 0, sweetness: 0, bitterness: 1, body: 3, intensity: 4 },
    pairingTags: ['fleurs', 'agrumes', 'concombre', 'herbes', 'fruits'],
    notes: 'Style de gin où le genièvre peut être moins dominant, laissant davantage de place aux autres botaniques.'
  },
  {
    id: 'spiced-rum',
    name: 'Rhum épicé',
    aliases: ['Spiced rum', 'Rhum aux épices'],
    family: 'spiritueux',
    subfamily: 'Rhum aromatisé',
    roles: ['base', 'aromatique'],
    aromas: ['vanille', 'cannelle', 'gingembre', 'clou de girofle', 'caramel'],
    taste: { acidity: 0, sweetness: 3, bitterness: 1, body: 3, intensity: 4 },
    pairingTags: ['ananas', 'orange', 'pomme', 'cacao', 'gingembre'],
    notes: 'Rhum aromatisé avec des épices et parfois des ingrédients sucrants. Les profils varient fortement selon les producteurs.'
  },
  {
    id: 'jamaican-white-rum',
    name: 'Rhum blanc jamaïcain',
    aliases: ['Jamaican white rum', 'Rhum blanc high ester'],
    family: 'spiritueux',
    subfamily: 'Rhum traditionnel jamaïcain',
    roles: ['base', 'aromatique'],
    aromas: ['banane', 'ananas', 'agrumes', 'fruits fermentés', 'canne'],
    taste: { acidity: 1, sweetness: 1, bitterness: 1, body: 3, intensity: 5 },
    pairingTags: ['ananas', 'banane', 'citron vert', 'gingembre', 'fruits tropicaux'],
    notes: 'Rhum non vieilli ou très peu vieilli, souvent très expressif et riche en esters.'
  },
  {
    id: 'single-malt-scotch',
    name: 'Single Malt Scotch Whisky',
    aliases: ['Single malt écossais', 'Scotch single malt'],
    family: 'spiritueux',
    subfamily: 'Whisky écossais single malt',
    roles: ['base', 'aromatique'],
    aromas: ['malt', 'fruits', 'bois', 'vanille', 'tourbe'],
    taste: { acidity: 1, sweetness: 1, bitterness: 1, body: 4, intensity: 5 },
    pairingTags: ['miel', 'pomme', 'poire', 'chocolat', 'fumé'],
    notes: 'Whisky écossais issu d’une seule distillerie et élaboré à partir d’orge maltée. Le profil dépend du terroir, de la distillation et du vieillissement.'
  },
  {
    id: 'poire-williams',
    name: 'Eau-de-vie de poire Williams',
    aliases: ['Poire Williams', 'Williams pear brandy'],
    family: 'spiritueux',
    subfamily: 'Eau-de-vie de fruit',
    roles: ['base', 'aromatique'],
    aromas: ['poire fraîche', 'fruit blanc', 'floral'],
    taste: { acidity: 1, sweetness: 0, bitterness: 0, body: 2, intensity: 4 },
    pairingTags: ['poire', 'pomme', 'vanille', 'amande', 'chocolat blanc'],
    notes: 'Eau-de-vie de poire très expressive, généralement sèche malgré ses arômes naturellement fruités.'
  },
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
    taste: { acidity: 0, sweetness: 5, bitterness: 0, body: 2, intensity: 1 },
    pairingTags: ['agrumes', 'fruits', 'herbes', 'spiritueux'],
    notes: 'Préciser le ratio sucre/eau pour calculer correctement le pouvoir sucrant.'
  },
  {
    id: 'honey-syrup',
    name: 'Sirop de miel',
    aliases: ['Miel dilué'],
    family: 'sucres_et_sirops',
    subfamily: 'Sirop aromatique',
    roles: ['sucrant', 'modificateur'],
    aromas: ['miel', 'floral', 'cire'],
    taste: { acidity: 0, sweetness: 5, bitterness: 0, body: 3, intensity: 3 },
    pairingTags: ['gin', 'citron', 'whisky', 'thym', 'gingembre'],
    notes: 'Le type de miel et le ratio de dilution changent le résultat.'
  },
  {
    id: 'agave-syrup',
    name: 'Sirop d’agave',
    aliases: ['Nectar d’agave'],
    family: 'sucres_et_sirops',
    subfamily: 'Sirop végétal',
    roles: ['sucrant'],
    aromas: ['agave', 'végétal', 'neutre'],
    taste: { acidity: 0, sweetness: 5, bitterness: 0, body: 2, intensity: 2 },
    pairingTags: ['tequila', 'mezcal', 'citron vert', 'pamplemousse'],
    notes: 'Pouvoir sucrant et viscosité à comparer avec le sirop simple.'
  },
  {
    id: 'maple-syrup',
    name: 'Sirop d’érable',
    aliases: ['Maple syrup'],
    family: 'sucres_et_sirops',
    subfamily: 'Sirop végétal',
    roles: ['sucrant', 'modificateur'],
    aromas: ['érable', 'boisé', 'caramel'],
    taste: { acidity: 0, sweetness: 5, bitterness: 0, body: 3, intensity: 3 },
    pairingTags: ['whisky', 'rhum', 'pomme', 'noix', 'café'],
    notes: 'Apporte une signature aromatique et une douceur marquée.'
  },

  // PRÉPARATIONS
  {
    id: 'grenadine',
    name: 'Sirop de grenadine',
    aliases: ['Grenadine'],
    family: 'sucres_et_sirops',
    subfamily: 'Sirop fruité',
    roles: ['sucrant', 'aromatique'],
    aromas: ['fruits rouges', 'grenade'],
    taste: { acidity: 1, sweetness: 5, bitterness: 0, body: 2, intensity: 2 },
    pairingTags: ['gin', 'rhum', 'citron', 'orange', 'ananas'],
    notes: 'La composition varie fortement selon les fabricants.'
  },
  {
    id: 'orgeat',
    name: 'Sirop d’orgeat',
    aliases: ['Orgeat', 'Sirop d’amande'],
    family: 'sucres_et_sirops',
    subfamily: 'Sirop de fruits à coque',
    roles: ['sucrant', 'texture'],
    aromas: ['amande', 'fleur d’oranger'],
    taste: { acidity: 0, sweetness: 5, bitterness: 0, body: 4, intensity: 3 },
    pairingTags: ['rhum', 'citron vert', 'cognac', 'fleur d’oranger'],
    notes: 'Vérifier les allergènes et la composition de chaque référence.'
  },
  {
    id: 'apple-shrub',
    name: 'Shrub de pomme',
    aliases: ['Vinaigre de pomme aromatisé'],
    family: 'préparations',
    subfamily: 'Shrub',
    roles: ['acidité', 'modificateur'],
    aromas: ['pomme', 'vinaigre', 'fruité'],
    taste: { acidity: 4, sweetness: 2, bitterness: 0, body: 2, intensity: 3 },
    pairingTags: ['gin', 'romarin', 'pomme', 'gingembre', 'eau gazeuse'],
    notes: 'La recette et la concentration en vinaigre doivent être documentées.'
  },
  {
    id: 'verjus',
    name: 'Verjus',
    aliases: ['Jus de raisin vert'],
    family: 'préparations',
    subfamily: 'Jus acide',
    roles: ['acidité'],
    aromas: ['raisin', 'végétal', 'fruit blanc'],
    taste: { acidity: 3, sweetness: 1, bitterness: 0, body: 2, intensity: 2 },
    pairingTags: ['gin', 'vin blanc', 'pomme', 'poire', 'herbes'],
    notes: 'Alternative acidulée au citron, avec un profil différent.'
  },
  {
    id: 'grenadine-juice',
    name: 'Jus de grenade',
    aliases: ['Grenade fraîche'],
    family: 'fruits',
    subfamily: 'Fruit rouge',
    roles: ['acidité', 'aromatique'],
    aromas: ['grenade', 'fruits rouges', 'végétal'],
    taste: { acidity: 3, sweetness: 2, bitterness: 1, body: 2, intensity: 3 },
    pairingTags: ['gin', 'rhum', 'orange', 'rose', 'épices'],
    notes: 'À distinguer du sirop de grenadine.'
  },

  // BOISSONS SANS ALCOOL
  {
    id: 'tonic',
    name: 'Eau tonique',
    aliases: ['Tonic water'],
    family: 'boissons_sans_alcool',
    subfamily: 'Boisson gazeuse amère',
    roles: ['allonge', 'amer'],
    aromas: ['quinine', 'agrumes'],
    taste: { acidity: 2, sweetness: 3, bitterness: 3, body: 2, intensity: 2 },
    pairingTags: ['gin', 'agrumes', 'concombre', 'herbes'],
    notes: 'Le sucre et l’amertume varient selon les marques.'
  },
  {
    id: 'soda-water',
    name: 'Eau gazeuse',
    aliases: ['Soda water', 'Eau pétillante'],
    family: 'boissons_sans_alcool',
    subfamily: 'Eau gazeuse',
    roles: ['allonge'],
    aromas: ['neutre'],
    taste: { acidity: 0, sweetness: 0, bitterness: 0, body: 1, intensity: 1 },
    pairingTags: ['agrumes', 'sirop', 'vermouth', 'herbes'],
    notes: 'Apporte dilution et effervescence sans ajouter de sucre.'
  },
  {
    id: 'ginger-beer',
    name: 'Ginger beer',
    aliases: ['Bière de gingembre sans alcool'],
    family: 'boissons_sans_alcool',
    subfamily: 'Boisson gazeuse épicée',
    roles: ['allonge', 'aromatique'],
    aromas: ['gingembre', 'épicé', 'citron'],
    taste: { acidity: 2, sweetness: 4, bitterness: 0, body: 2, intensity: 4 },
    pairingTags: ['rhum', 'vodka', 'citron vert', 'whisky'],
    notes: 'À distinguer du ginger ale, généralement moins intense.'
  },
  {
    id: 'cranberry-juice',
    name: 'Jus de cranberry',
    aliases: ['Jus de canneberge'],
    family: 'boissons_sans_alcool',
    subfamily: 'Jus de fruits',
    roles: ['allonge', 'acidité'],
    aromas: ['canneberge', 'fruits rouges'],
    taste: { acidity: 4, sweetness: 2, bitterness: 1, body: 2, intensity: 3 },
    pairingTags: ['vodka', 'gin', 'orange', 'citron vert'],
    notes: 'Les produits du commerce peuvent être purs, sucrés ou dilués.'
  },
  {
    id: 'green-tea',
    name: 'Thé vert',
    aliases: ['Infusion de thé vert'],
    family: 'boissons_sans_alcool',
    subfamily: 'Infusion',
    roles: ['allonge', 'aromatique'],
    aromas: ['végétal', 'herbe', 'umami'],
    taste: { acidity: 0, sweetness: 0, bitterness: 2, body: 2, intensity: 3 },
    pairingTags: ['gin', 'citron', 'yuzu', 'jasmin', 'gingembre'],
    notes: 'Temps et température d’infusion influencent l’amertume.'
  },
  {
    id: 'coffee',
    name: 'Café',
    aliases: ['Espresso', 'Café froid'],
    family: 'boissons_sans_alcool',
    subfamily: 'Boisson torréfiée',
    roles: ['aromatique', 'modificateur'],
    aromas: ['torréfié', 'cacao', 'grillé'],
    taste: { acidity: 2, sweetness: 0, bitterness: 4, body: 3, intensity: 5 },
    pairingTags: ['vodka', 'rhum', 'whisky', 'vanille', 'chocolat'],
    notes: 'L’extraction et la variété influencent acidité et amertume.'
  }
]

export function normalizeIngredientName(value: string): string {
  return value
    .trim()
    .toLocaleLowerCase('fr')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function findIngredient(query: string): Ingredient | undefined {
  const normalized = normalizeIngredientName(query)

  return ingredients.find(item =>
    normalizeIngredientName(item.name) === normalized ||
    item.aliases.some(alias =>
      normalizeIngredientName(alias) === normalized
    )
  )
}

export function searchIngredients(query: string): Ingredient[] {
  const normalized = normalizeIngredientName(query)

  if (!normalized) return ingredients

  return ingredients.filter(item =>
    normalizeIngredientName(item.name).includes(normalized) ||
    item.aliases.some(alias =>
      normalizeIngredientName(alias).includes(normalized)
    ) ||
    item.aromas.some(aroma =>
      normalizeIngredientName(aroma).includes(normalized)
    )
  )
}

