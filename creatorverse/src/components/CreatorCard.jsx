// src/components/CreatorCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function CreatorCard({ creator, onDelete }) {
    const { id, name, url, description, imageURL } = creator;

    return (
        <article className="card">
            {imageURL && (
                <figure>
                    <img
                        src={imageURL}
                        alt={name}
                        className="radius"
                        style={{
                            width: '100%',
                            maxHeight: '180px',
                            objectFit: 'cover'
                        }}
                    />
                </figure>
            )}

            <h2>{name}</h2>

            <p>{description}</p>

            <footer className="flex">
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contrast"
                >
                    Visit ↗
                </a>

                <Link to={`/edit/${id}`} className="secondary">
                    Edit
                </Link>

                {onDelete && (
                    <button
                        type="button"
                        className="outline"
                        onClick={() => onDelete(id)}
                    >
                        Delete
                    </button>
                )}
            </footer>
        </article>
    );
}