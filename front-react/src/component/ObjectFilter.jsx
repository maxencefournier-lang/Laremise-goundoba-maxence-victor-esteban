export function ObjectFilter ({onStatutFilter, onCategoryFilter, resultCount}){

    return (
        <section className="filter-section">
            <label className="filter">
                <select className="input" id="categorie" onChange={(event) => {
                onCategoryFilter(event.target.value)
                }}>
                    <option value="">Catégories</option>
                    <option value="Outillage">Outillage</option>
                    <option value="Vaisselle">Vaisselle</option>
                    <option value="Mobilier">Mobilier</option>
                    <option value="Électroménager">Électroménager</option>
                    <option value="Textile">Textile</option>
                    <option value="Livres">Livres</option>
                    <option value="Jouets">Jouets</option>
                    <option value="Décoration">Décoration</option>
                </select>
            </label>

            <label className="filter">
                <select className="input" id="statut" onChange={(event) =>{
                onStatutFilter(event.target.value)
            }}>
                    <option value="">Statut</option>
                    <option value="arrive">Arrive</option>
                    <option value="en_reparation">En réparation</option>
                    <option value="en_rayon">En rayon</option>
                    <option value="vendu">Vendu</option>
                    <option value="recycle">Recyclé</option>
                </select>
            </label>
            <div className="results-count">
                {resultCount} résultats
            </div>

        </section>
    )
}