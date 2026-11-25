import type { Recipe, DrinkType } from './types'

const pick = <T,>(items: T[], index: number) => items[index % items.length]

export function generateRecipes(type: DrinkType | 'surprise', profile: string, strength: string, seed = Date.now()): Recipe[] {
  const cocktailBases = [
    { spirit:'Gin', amount:'55 ml', accent:'Basilic frais', accentAmount:'5 feuilles', acid:'Jus de citron vert', acidAmount:'20 ml', sweet:'Sirop simple', sweetAmount:'7,5 ml', glass:'Nick & Nora', garnish:'Zeste de citron vert et basilic', method:['Claquer le basilic entre les mains puis le déposer dans le shaker.','Ajouter les liquides et de la glace.', 'Shaker vivement puis double filtrer dans une verrerie froide.'] },
    { spirit:'Rhum blanc', amount:'60 ml', accent:'Liqueur d’orange', accentAmount:'10 ml', acid:'Jus de citron vert', acidAmount:'22,5 ml', sweet:'Sirop de gingembre', sweetAmount:'7,5 ml', glass:'Coupe', garnish:'Zeste de citron vert', method:['Verser tous les ingrédients au shaker.', 'Shaker avec glace puis double filtrer dans une coupe froide.'] },
    { spirit:'Tequila blanco', amount:'55 ml', accent:'Liqueur de pamplemousse', accentAmount:'15 ml', acid:'Jus de citron vert', acidAmount:'20 ml', sweet:'Sirop d’agave', sweetAmount:'5 ml', glass:'Old Fashioned', garnish:'Pamplemousse exprimé et pincée de sel', method:['Shaker tous les ingrédients avec glace.', 'Filtrer sur un gros glaçon dans un verre rafraîchi.'] },
    { spirit:'Vodka', amount:'55 ml', accent:'Liqueur de sureau', accentAmount:'10 ml', acid:'Jus de citron jaune', acidAmount:'20 ml', sweet:'Sirop simple', sweetAmount:'5 ml', glass:'Coupe', garnish:'Fine lamelle de concombre', method:['Shaker tous les ingrédients avec glace.', 'Double filtrer dans une coupe froide.'] },
    { spirit:'Gin', amount:'60 ml', accent:'Vermouth dry', accentAmount:'15 ml', acid:'Cordial de citron', acidAmount:'10 ml', sweet:'Solution saline 10 %', sweetAmount:'2 gouttes', glass:'Nick & Nora', garnish:'Twist de citron', method:['Verser les ingrédients dans un verre à mélange avec glace.', 'Remuer 20 à 25 secondes.', 'Filtrer dans une coupe glacée.'] }
  ]
  const mockBases = [
    { spirit:'Thé vert infusé à froid', amount:'70 ml', accent:'Cordial de yuzu', accentAmount:'15 ml', acid:'Jus de citron vert', acidAmount:'10 ml', sweet:'Sirop de basilic', sweetAmount:'10 ml', glass:'Highball', garnish:'Basilic et zeste de citron', method:['Verser les ingrédients dans un shaker avec glace.', 'Shaker brièvement et filtrer sur glace fraîche.', 'Compléter avec 40 ml d’eau pétillante.'] },
    { spirit:'Verjus', amount:'45 ml', accent:'Shrub de pomme', accentAmount:'20 ml', acid:'Jus de citron jaune', acidAmount:'5 ml', sweet:'Sirop de romarin', sweetAmount:'10 ml', glass:'Coupe', garnish:'Brin de romarin', method:['Shaker les ingrédients avec glace.', 'Double filtrer dans une coupe froide.'] },
    { spirit:'Infusion froide d’hibiscus', amount:'70 ml', accent:'Jus de cranberry', accentAmount:'25 ml', acid:'Jus de citron vert', acidAmount:'15 ml', sweet:'Sirop simple', sweetAmount:'7,5 ml', glass:'Highball', garnish:'Zeste d’orange', method:['Shaker les ingrédients sauf 40 ml d’eau gazeuse.', 'Filtrer sur glace puis compléter avec l’eau gazeuse.'] }
  ]
  const source = type === 'mocktail' ? mockBases : cocktailBases
  const actualType: DrinkType = type === 'mocktail' ? 'mocktail' : 'cocktail'
  const profiles = [profile, 'équilibré', 'sec', 'aromatique', 'signature']
  return Array.from({ length: 5 }, (_, i) => {
    const b = pick(source, (seed + i * 7) % source.length)
    const id = `lab-${seed}-${i}`
    const profileName = profiles[i % profiles.length]
    const high = strength === 'strong' && actualType === 'cocktail'
    const baseAmount = high ? (b.amount.includes('55') ? '65 ml' : '70 ml') : b.amount
    return {
      id, name: pick(['Verdant Signal','Citrus Theory','Botanical No. 5','Bright Matter','Afterglow'], (seed + i) % 5),
      type: actualType, category:'Création générée · à tester', profile:[profileName, profile],
      strength: actualType === 'mocktail' ? 'Sans alcool' : high ? 'Puissant' : strength === 'light' ? 'Léger' : 'Équilibré',
      ingredients:[
        {name:b.spirit,amount:baseAmount},{name:b.accent,amount:b.accentAmount},
        {name:b.acid,amount:b.acidAmount},{name:b.sweet,amount:b.sweetAmount}
      ],
      method:b.method, glass:b.glass, garnish:b.garnish,
      notes:`Prototype de recette générée par combinaison de structures. Profil visé : ${profileName}. Goûter, ajuster acidité/sucre/dilution et valider avant service. Les créations générées ne sont pas des recettes historiquement documentées.`,
      original:true
    } satisfies Recipe
  })
}