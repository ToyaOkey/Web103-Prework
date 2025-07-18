// src/pages/ViewCreator.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

export default function ViewCreator() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [creator, setCreator] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOne() {
            const { data, error } = await supabase
                .from('creators')
                .select('*')
                .eq('id', id)
                .single();
            if (error) console.error(error);
            setCreator(data);
            setLoading(false);
        }
        fetchOne();
    }, [id]);

    const handleDelete = async () => {
        if (!confirm('Delete this creator?')) return;
        await supabase.from('creators').delete().eq('id', id);
        navigate('/');
    };

    if (loading) return <p className="text-center">Loading…</p>;
    if (!creator) return <p className="text-center">Not found.</p>;

    return (
        <main className="container flow">
            {/* Top nav */}
            <header className="flex justify-between items-center">
                <Link to="/" className="secondary">
                    ← Back
                </Link>
                <div className="flex gap-sm">
                    <Link to={`/edit/${id}`} className="contrast">
                        ✏️ Edit
                    </Link>
                    <button type="button" className="outline" onClick={handleDelete}>
                        🗑️ Delete
                    </button>
                </div>
            </header>

            {/* Creator card */}
            <article className="card flow">
                {creator.imageURL && (
                    <figure className="ratio ratio-16x9 radius">
                        <img src={creator.imageURL} alt={creator.name} />
                    </figure>
                )}

                <div className="flow-sm">
                    <h2>{creator.name}</h2>
                    <p>{creator.description}</p>
                </div>

                <footer>
                    <a
                        href={creator.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contrast"
                    >
                        Visit ↗
                    </a>
                </footer>
            </article>
        </main>
    );
}