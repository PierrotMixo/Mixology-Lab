import { useMemo, useState } from 'react'
import { BookOpen, Bookmark, BookmarkCheck, FlaskConical, Search, Sparkles, Plus, X, Martini, ChevronRight, Copy, Trash2, Camera, Wine } from 'lucide-react'
import { classics, profiles } from './data'
import { generateRecipes } from './generator'
import type { Recipe } from './types'

type Tab = 'create' | 'bar' | 'library' | 'lab' | 'saved'
type BarItem = { id:string; name:string; brand:string; reference:string; category:string; abv:string; volume:string; notes:string; photoName?:string }
const loadBar = (): BarItem[] => { try { return JSON.parse(localStorage.getItem('mixology-bar') || '[]') as BarItem[] } catch { return [] } }
const loadSaved = (): Recipe[] => {
  try { return JSON.parse(localStorage.getItem('mixology-saved') || '[]') as Recipe[] } catch { return [] }
}

export default function App() {
  const [tab, setTab] = useState<Tab>('create')
  const [kind, setKind] = useState<'cocktail'|'mocktail'|'surprise'>('cocktail')
  const [profile, setProfile] = useState('agrume')
  const [strength, setStrength] = useState('balanced')
  const [results, setResults] = useState<Recipe[]>([])
  const [saved, setSaved] = useState<Recipe[]>(loadSaved)
  const [barItems, setBarItems] = useState<BarItem[]>(loadBar)
  const [showAdd, setShowAdd] = useState(false)
  const [photoPreview, setPhotoPreview] = useState('')
  const [barForm, setBarForm] = useState({name:'',brand:'',reference:'',category:'Spiritueux',abv:'',volume:'70 cl',notes:''})
  const [stockRecipes, setStockRecipes] = useState<Recipe[]>([])
  const [selected, setSelected] = useState<Recipe | null>(null)
  const [search, setSearch] = useState('')
  const [ingredientText, setIngredientText] = useState('')
  const [notice, setNotice] = useState('')

  const save = (recipe: Recipe) => {
    const next = saved.some(r => r.id === recipe.id) ? saved.filter(r => r.id !== recipe.id) : [recipe, ...saved]
    setSaved(next); localStorage.setItem('mixology-saved', JSON.stringify(next))
    setNotice(next.some(r => r.id === recipe.id) ? 'Recette ajoutée aux favoris' : 'Recette retirée des favoris')
    window.setTimeout(() => setNotice(''), 2200)
  }
  
const make = () => {
  const generated = generateRecipes(
    kind,
    profile,
    strength,
    Date.now(),
    ingredientText
  )

  setResults(generated)
  setTab('create')
}
  const library = useMemo(() => classics.filter(r => (r.name+' '+r.category+' '+r.profile.join(' ')).toLowerCase().includes(search.toLowerCase())), [search])
  const addBarItem = () => {
    if (!barForm.name.trim()) { setNotice('Indique au minimum le nom du produit'); return }
    const item:BarItem = {id:`bar-${Date.now()}`, ...barForm, photoName: photoPreview ? 'Photo ajoutée' : undefined}
    const next=[item,...barItems]; setBarItems(next); localStorage.setItem('mixology-bar',JSON.stringify(next))
    setBarForm({name:'',brand:'',reference:'',category:'Spiritueux',abv:'',volume:'70 cl',notes:''}); setPhotoPreview(''); setShowAdd(false); setNotice('Produit ajouté à Mon Bar'); window.setTimeout(()=>setNotice(''),2200)
  }
  const removeBarItem = (id:string) => { const next=barItems.filter(x=>x.id!==id); setBarItems(next); localStorage.setItem('mixology-bar',JSON.stringify(next)) }
  const makeFromBar = () => {
    const spirits=barItems.filter(x=>['Spiritueux','Gin','Rhum','Vodka','Whisky','Tequila','Mezcal','Brandy'].includes(x.category))
    const modifiers=barItems.filter(x=>['Liqueurs','Vermouths','Apéritifs','Bitters'].includes(x.category))
    const mixers=barItems.filter(x=>['Jus et purées','Softs','Sirops','Autres'].includes(x.category))
    if (!barItems.length) { setNotice('Ajoute d’abord quelques produits dans Mon Bar'); window.setTimeout(()=>setNotice(''),2200); return }
    const bases=spirits.length?spirits:barItems.slice(0,3)
    const recipes=bases.slice(0,5).map((base,i)=>{ const mod=modifiers[i%Math.max(1,modifiers.length)]; const mix=mixers[i%Math.max(1,mixers.length)]; const ingredients=[{name:base.name+(base.brand?' · '+base.brand:'') ,amount:'50 ml'},...(mod?[{name:mod.name+(mod.brand?' · '+mod.brand:''),amount:'15 ml'}]:[]),...(mix?[{name:mix.name+(mix.brand?' · '+mix.brand:''),amount:'20 ml'}]:[])]; return {id:`stock-${base.id}-${i}`,name:`${base.brand||base.name} · création ${i+1}`,type:'cocktail' as const,category:'Création à partir de Mon Bar',profile:['Inventaire personnel'],strength:'À équilibrer',ingredients,method:['Préparer les ingrédients selon leurs caractéristiques.','Assembler au shaker ou au verre à mélange selon le profil recherché.','Goûter, ajuster l’équilibre et la dilution avant service.'],glass:'À définir selon la recette',garnish:'À définir selon les ingrédients',notes:'Piste de création basée sur les produits enregistrés. Cette proposition est une base de travail, pas une recette validée. Vérifier les dosages, l’équilibre et la sécurité avant service.',original:true} satisfies Recipe })
    setStockRecipes(recipes); setTab('bar')
  }
  const nav = [
    {id:'create' as Tab,label:'Créer',icon:Sparkles},
    {id:'bar' as Tab,label:'Mon Bar',icon:Wine},
    {id:'library' as Tab,label:'Bibliothèque',icon:BookOpen},
    {id:'lab' as Tab,label:'Laboratoire',icon:FlaskConical},
    {id:'saved' as Tab,label:'Favoris',icon:Bookmark}
  ]
  return <div className="app-shell">
    <header className="topbar">
      <div className="brand"><div className="brand-mark"><Martini size={21}/></div><div><div className="brand-name">MIXOLOGY <span>LAB</span></div><div className="brand-sub">PERSONAL EDITION · V2</div></div></div>
      <span className="pro-pill">PERSONAL V2</span>
    </header>
    <nav className="nav-tabs">{nav.map(n => <button key={n.id} className={tab===n.id?'nav-item active':'nav-item'} onClick={()=>{setTab(n.id);setSelected(null)}}><n.icon size={17}/><span>{n.label}</span></button>)}</nav>
    <main>
      {tab==='create' && <section className="view">
        <div className="eyebrow">THE CREATION ENGINE</div><h1>L’art de la<br/><em>composition.</em></h1>
        <p className="lead">Composez une expérience, pas seulement un cocktail.</p>
        <div className="panel">
          <div className="field-label">01 / TYPE DE BOISSON</div>
          <div className="segmented">{(['cocktail','mocktail','surprise'] as const).map(k=><button key={k} className={kind===k?'chosen':''} onClick={()=>setKind(k)}>{k==='cocktail'?'Cocktail':k==='mocktail'?'Mocktail':'Surprise'}</button>)}</div>
          <div className="field-label">02 / PROFIL AROMATIQUE</div>
          <div className="profile-grid">{profiles.map(p=><button key={p} className={profile===p?'profile selected':'profile'} onClick={()=>setProfile(p)}>{p}</button>)}</div>
          <div className="field-label">03 / INTENSITÉ</div>
          <div className="segmented">{[{id:'light',label:'Léger'},{id:'balanced',label:'Équilibré'},{id:'strong',label:'Puissant'}].map(s=><button key={s.id} className={strength===s.id?'chosen':''} onClick={()=>setStrength(s.id)}>{s.label}</button>)}</div>
          <label className="field-label" htmlFor="ingredients">04 / INGRÉDIENTS À EXPLORER <span className="optional">OPTIONNEL</span></label>
          <textarea id="ingredients" value={ingredientText} onChange={e=>setIngredientText(e.target.value)} placeholder="Ex. : gin, citron vert, basilic, Chartreuse..." rows={2}/>
          <button className="primary-btn" onClick={make}><Sparkles size={17}/> Générer 5 créations</button>
          <p className="microcopy">Génération locale de démonstration · aucune connexion requise</p>
        </div>
        {results.length>0 && <><div className="section-head"><div><div className="eyebrow">YOUR NEXT SIGNATURE</div><h2>Vos créations</h2></div><span className="count">{results.length} RECETTES</span></div><div className="recipe-grid">{results.map(r=><RecipeCard key={r.id} recipe={r} saved={saved.some(s=>s.id===r.id)} onOpen={()=>setSelected(r)} onSave={()=>save(r)}/>)}</div></>}
      </section>}
      {tab==='bar' && <section className="view">
        <div className="eyebrow">YOUR PERSONAL INVENTORY</div><h1>Mon <em>Bar.</em></h1><p className="lead">Tes bouteilles, tes références et tes ingrédients. Sans suivi de quantités.</p>
        <div className="bar-summary"><div><strong>{barItems.length}</strong><span>PRODUITS ENREGISTRÉS</span></div><button className="primary-btn compact" onClick={()=>setShowAdd(true)}><Plus size={16}/> Ajouter un produit</button></div>
        <div className="bar-actions"><button className="secondary-btn" onClick={makeFromBar}><Sparkles size={16}/> Créer avec mon stock</button><button className="secondary-btn" onClick={()=>{setShowAdd(true);setNotice('Tu peux joindre une photo de l’étiquette dans le formulaire.')}}><Camera size={16}/> Ajouter par photo</button></div>
        {barItems.length===0 ? <div className="empty"><Wine size={28}/><strong>Ton bar est encore vide.</strong><p>Ajoute tes spiritueux, liqueurs, sirops, jus et softs pour commencer.</p></div> : <div className="inventory-list">{barItems.map(item=><article className="inventory-item" key={item.id}><div className="inventory-icon"><Wine size={19}/></div><div className="inventory-info"><strong>{item.name}</strong><span>{[item.brand,item.reference,item.category].filter(Boolean).join(' · ')}</span><small>{[item.abv?`${item.abv} % vol.`:'',item.volume,item.notes].filter(Boolean).join(' · ')}</small></div><button className="icon-btn danger-icon" onClick={()=>removeBarItem(item.id)} aria-label="Supprimer le produit"><Trash2 size={17}/></button></article>)}</div>}
        {stockRecipes.length>0 && <><div className="section-head"><div><div className="eyebrow">INVENTORY IDEAS</div><h2>Pistes avec ton stock</h2></div><span className="count">{stockRecipes.length} IDÉES</span></div><div className="recipe-grid">{stockRecipes.map(r=><RecipeCard key={r.id} recipe={r} saved={saved.some(s=>s.id===r.id)} onOpen={()=>setSelected(r)} onSave={()=>save(r)}/>)}</div><p className="microcopy">Ces pistes utilisent les produits enregistrés. Les proportions et associations restent à valider par dégustation.</p></>}
        {showAdd && <div className="modal-backdrop" onClick={()=>setShowAdd(false)}><div className="modal" onClick={e=>e.stopPropagation()}><div className="modal-head"><div><div className="eyebrow">PERSONAL INVENTORY</div><h2>Ajouter un produit</h2></div><button className="icon-btn" onClick={()=>setShowAdd(false)}><X size={20}/></button></div>
          <label className="field-label">PHOTO DE L’ÉTIQUETTE <span className="optional">FACULTATIF</span></label><label className="photo-upload"><Camera size={18}/><span>{photoPreview?'Photo sélectionnée':'Prendre ou choisir une photo'}</span><input type="file" accept="image/*" capture="environment" onChange={e=>{const f=e.target.files?.[0]; if(f){const reader=new FileReader();reader.onload=()=>setPhotoPreview(String(reader.result||''));reader.readAsDataURL(f)}}}/></label>{photoPreview && <img className="label-preview" src={photoPreview} alt="Aperçu de l’étiquette"/>}
          <p className="microcopy">La photo sert de référence visuelle. La lecture automatique de l’étiquette nécessitera le branchement du moteur de reconnaissance ; vérifie les informations saisies.</p>
          <label className="field-label">NOM DU PRODUIT *</label><input className="form-input" value={barForm.name} onChange={e=>setBarForm({...barForm,name:e.target.value})} placeholder="Ex. London Dry Gin"/>
          <label className="field-label">MARQUE</label><input className="form-input" value={barForm.brand} onChange={e=>setBarForm({...barForm,brand:e.target.value})} placeholder="Ex. Tanqueray"/>
          <label className="field-label">RÉFÉRENCE / CUVÉE</label><input className="form-input" value={barForm.reference} onChange={e=>setBarForm({...barForm,reference:e.target.value})} placeholder="Ex. No. Ten, London Dry..."/>
          <label className="field-label">CATÉGORIE</label><select className="form-input" value={barForm.category} onChange={e=>setBarForm({...barForm,category:e.target.value})}>{['Spiritueux','Gin','Rhum','Vodka','Whisky','Tequila','Mezcal','Brandy','Liqueurs','Vermouths','Apéritifs','Bitters','Sirops','Jus et purées','Softs','Autres'].map(c=><option key={c}>{c}</option>)}</select>
          <div className="form-two"><div><label className="field-label">DEGRÉ (% VOL.)</label><input className="form-input" inputMode="decimal" value={barForm.abv} onChange={e=>setBarForm({...barForm,abv:e.target.value})} placeholder="43,1"/></div><div><label className="field-label">CONTENANCE</label><input className="form-input" value={barForm.volume} onChange={e=>setBarForm({...barForm,volume:e.target.value})} placeholder="70 cl"/></div></div>
          <label className="field-label">NOTES AROMATIQUES</label><textarea value={barForm.notes} onChange={e=>setBarForm({...barForm,notes:e.target.value})} placeholder="Ex. genièvre, agrumes, poivre..." rows={2}/>
          <button className="primary-btn" onClick={addBarItem}><Plus size={17}/> Enregistrer dans Mon Bar</button>
        </div></div>}
      </section>}
      {tab==='library' && <section className="view"><div className="eyebrow">THE REFERENCE COLLECTION</div><h1>La <em>bibliothèque.</em></h1><p className="lead">Des repères classiques pour nourrir la créativité.</p><div className="searchbox"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher une recette ou un profil"/></div><div className="library-list">{library.map(r=><button className="library-row" key={r.id} onClick={()=>setSelected(r)}><div><strong>{r.name}</strong><span>{r.category} · {r.profile.join(' / ')}</span></div><ChevronRight size={18}/></button>)}</div><p className="microcopy">Bibliothèque initiale de démonstration. Les recettes et leurs variantes doivent être vérifiées avec vos références professionnelles avant mise à la carte.</p></section>}
      {tab==='lab' && <section className="view"><div className="eyebrow">EXPERIMENTATION STUDIO</div><h1>Le <em>laboratoire.</em></h1><p className="lead">Une zone de travail pour transformer une idée en protocole reproductible.</p><div className="lab-cards">{[['Infusions & macérations','Temps, température, extraction aromatique.'],['Cordials & shrubs','Acidité, sucre, conservation et équilibre.'],['Clarification','Texture, limpidité et stabilité.'],['Carbonatation','Bulles, pression et service.']].map(([a,b])=><div className="lab-card" key={a}><FlaskConical size={19}/><div><strong>{a}</strong><p>{b}</p></div></div>)}</div><button className="primary-btn" onClick={()=>{setKind('cocktail');setProfile('herbacé');setStrength('balanced');make()}}><Sparkles size={17}/> Générer une piste expérimentale</button><div className="safety-note"><strong>Rigueur professionnelle</strong><p>Documenter les lots, les dates, les températures et les conditions de conservation. Ne pas servir une préparation dont la stabilité ou la sécurité alimentaire n’a pas été validée.</p></div></section>}
      {tab==='saved' && <section className="view"><div className="eyebrow">YOUR PERSONAL ARCHIVE</div><h1>Vos <em>favoris.</em></h1><p className="lead">Votre collection de recettes, conservée sur cet appareil.</p>{saved.length===0?<div className="empty"><Bookmark size={28}/><strong>Votre collection commence ici.</strong><p>Enregistrez une recette depuis une fiche pour la retrouver ici.</p></div>:<div className="recipe-grid">{saved.map(r=><RecipeCard key={r.id} recipe={r} saved onOpen={()=>setSelected(r)} onSave={()=>save(r)}/>)}</div>}<button className="text-btn danger" onClick={()=>{if(confirm('Effacer tous les favoris enregistrés sur cet appareil ?')){setSaved([]);localStorage.removeItem('mixology-saved')}}}><Trash2 size={15}/> Effacer les favoris</button></section>}
    </main>
    <footer><span>MIXOLOGY LAB</span><span>CRAFTED FOR BARTENDERS · V2.0</span></footer>
    {notice && <div className="toast">{notice}</div>}
    {selected && <RecipeModal recipe={selected} isSaved={saved.some(r=>r.id===selected.id)} onClose={()=>setSelected(null)} onSave={()=>save(selected)}/>}
  </div>
}

function RecipeCard({recipe,saved,onOpen,onSave}:{recipe:Recipe;saved:boolean;onOpen:()=>void;onSave:()=>void}) {
  return <article className="recipe-card"><div className="card-top"><span className="tag">{recipe.category}</span><button className="icon-btn" onClick={onSave} aria-label="Ajouter aux favoris">{saved?<BookmarkCheck size={18}/>:<Bookmark size={18}/>}</button></div><h3>{recipe.name}</h3><p className="recipe-profile">{recipe.profile.join(' · ')}</p><div className="card-bottom"><span>{recipe.strength}</span><button className="details-btn" onClick={onOpen}>Fiche technique <ChevronRight size={15}/></button></div></article>
}

function RecipeModal({recipe,isSaved,onClose,onSave}:{recipe:Recipe;isSaved:boolean;onClose:()=>void;onSave:()=>void}) {
  return <div className="modal-backdrop" onClick={onClose}><div className="modal" onClick={e=>e.stopPropagation()}><div className="modal-head"><div><div className="eyebrow">TECHNICAL RECIPE SHEET</div><h2>{recipe.name}</h2></div><button className="icon-btn" onClick={onClose}><X size={20}/></button></div><p className="recipe-profile">{recipe.category} · {recipe.strength}</p><div className="modal-section"><h4>INGRÉDIENTS</h4>{recipe.ingredients.map((i,index)=><div className="ingredient-row" key={index}><span>{i.name}</span><strong>{i.amount}</strong></div>)}</div><div className="modal-section"><h4>MÉTHODE</h4><ol>{recipe.method.map((m,i)=><li key={i}>{m}</li>)}</ol></div><div className="spec-grid"><div><span>VERRERIE</span><strong>{recipe.glass}</strong></div><div><span>GARNITURE</span><strong>{recipe.garnish}</strong></div></div><div className="notes">{recipe.notes}</div><button className="primary-btn" onClick={onSave}>{isSaved?<BookmarkCheck size={17}/>:<Bookmark size={17}/>} {isSaved?'Retirer des favoris':'Enregistrer la recette'}</button><button className="text-btn" onClick={()=>navigator.clipboard?.writeText(`${recipe.name}\n${recipe.ingredients.map(i=>`${i.amount} ${i.name}`).join('\n')}\n${recipe.method.join('\n')}`)}><Copy size={15}/> Copier la fiche</button></div></div>
}
