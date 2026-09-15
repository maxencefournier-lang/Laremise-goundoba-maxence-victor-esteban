import "./StatCard.css";

export default function StatCard({ titre, valeur, unite = "" }) {
    return (
        <article className="stat-card">
            <h3 className="stat-card__title">{titre}</h3>

            <p className="stat-card__value">
                {valeur} {unite}
            </p>
        </article>
    );
}
