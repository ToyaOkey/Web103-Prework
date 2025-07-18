// src/components/CreatorCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function CreatorCard({ creator, onDelete }) {
    const { id, name, url, description, imageURL } = creator;

    return (
        <article className="card flow-sm">
            {/* 16×9 aspect-ratio image header */}
            {imageURL && (
                <figure className="ratio ratio-16x9 radius">
                    <img src={imageURL} alt={name} />
                </figure>
            )}

            {/* Title + description with small flow spacing */}
            <div className="flow-xs">
                <h3 className="capitalize">{name}</h3>
                <p className="text-sm text-gray-600">{description}</p>
            </div>

            {/* Footer with Visit link and action buttons */}
            <footer className="flex justify-between items-center">
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contrast"
                >
                    Visit ↗
                </a>
                <div className="flex gap-xs">
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
                </div>
            </footer>
        </article>
    );
}
