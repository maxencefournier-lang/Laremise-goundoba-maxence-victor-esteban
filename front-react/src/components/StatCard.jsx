export default function StatCard({ titre, valeur, unite }) {
    return (
        <article>
            <h3>{titre}</h3>
            <strong>
                {valeur} {unite}
            </strong>
        </article>
    );
}
