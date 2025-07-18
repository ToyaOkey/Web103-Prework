import { Link } from "react-router-dom";

export default function CreatorCard({ c, onDelete }) {
    return (
        <article className="grid">
            {c.imageurl && <img src={c.imageurl} alt={c.name} />}
            <header>
                <h3>
                    <Link to={`/creator/${c.id}`}>{c.name}</Link>
                </h3>
                <small><a href={c.url} target="_blank">Visit ↗</a></small>
            </header>
            <p>{c.description}</p>
            <footer>
                <Link to={`/edit/${c.id}`}>✏️ Edit</Link>
                <button onClick={() => onDelete(c.id)}>🗑 Delete</button>
            </footer>
        </article>
    );
}