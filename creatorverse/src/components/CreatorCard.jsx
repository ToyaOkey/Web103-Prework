import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function CreatorCard({ creator, onDelete }) {
    const { id, name, url, description, imageURL } = creator;
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/creator/${id}`);
    };

    const stop = (e) => e.stopPropagation();

    return (
        <article
            className="card flow-sm"
            onClick={handleCardClick}
            style={{ cursor: 'pointer' }}
        >
            {imageURL && (
                <figure className="ratio ratio-16x9 radius">
                    <img src={imageURL} alt={name} />
                </figure>
            )}

            <div className="flow-xs">
                <h3 className="capitalize">{name}</h3>
                <p className="text-sm text-gray-600">{description}</p>
            </div>

            <footer className="flex justify-between items-center" onClick={stop}>

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