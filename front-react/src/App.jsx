import './App.css'
//import { Button } from './component/button/Button';
import object from '/mock/getobjet.json';
import { ObjectCard } from './component/ObjectCard';


function App() {

    const objet1 = object[8]
    return (
    <>

    <ObjectCard 
    libelle={objet1.libelle}
    depot_id={objet1.depot_id}
    poids_kg={objet1.poids_kg} 
    etat_arrivee={objet1.etat_arrivee}
    statut={objet1.statut}
    prix={objet1.prix}
    date_mise_rayon={objet1.date_mise_rayon}
    categorie_id={objet1.categorie_Sid}
    prix_paye={objet1.prix_paye}>
    </ObjectCard>
    </>
    )
}

export default App
