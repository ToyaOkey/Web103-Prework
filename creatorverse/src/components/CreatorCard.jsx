// src/components/CreatorCard.jsx
import React from 'react';

export default function CreatorCard({ creator, onDelete }) {
    const { id, name, url, description, imageURL } = creator;

    return (
        <article className="card">
            {/* Image (optional) */}
            {imageURL && (
                <img
                    src={imageURL}
                    alt={name}
                    style={{ maxWidth: '100%', borderRadius: '8px' }}
                />
            )}

            {/* Name */}
            <h2 style={{ margin: '0.5em 0' }}>{name}</h2>

            {/* URL */}
            <p>
                <a href={url} target="_blank" rel="noopener noreferrer">
                    Visit {name} ↗
                </a>
            </p>

            {/* Description */}
            <p style={{ margin: '0.5em 0' }}>{description}</p>

            {/* Optional Delete button (if you pass onDelete) */}
            {onDelete && (
                <button
                    onClick={() => onDelete(id)}
                    style={{ marginTop: '0.5em' }}
                >
                    🗑️ Delete
                </button>
            )}
        </article>
    );
}