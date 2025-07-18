// src/pages/ViewCreator.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

export default function ViewCreator() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [creator, setCreator] = useState(null);
    const [loading, setLoading]   = useState(true);

    useEffect(() => {
        async function fetchOne() {
            setLoading(true);
            const { data, error } = await supabase
                .from('creators')
                .select('*')
                .eq('id', id)
                .single();                // grabs exactly one row

            if (error) {
                console.error('Error fetching creator:', error);
            } else {
                setCreator(data);
            }
            setLoading(false);
        }

        fetchOne();
    }, [id]);

    const handleDelete = async () => {
        await supabase.from('creators').delete().eq('id', id);
        navigate('/');
    };

    if (loading) return <p>Loading…</p>;
    if (!creator) return <p>Creator not found.</p>;

    return (
        <article className="card">
            {creator.imageURL && (
                <img
                    src={creator.imageURL}
                    alt={creator.name}
                    style={{ maxWidth: '100%', borderRadius: '8px' }}
                />
            )}

            <h2 style={{ margin: '0.5em 0' }}>{creator.name}</h2>

            <p>
                <a href={creator.url} target="_blank" rel="noopener noreferrer">
                    Visit {creator.name} ↗
                </a>
            </p>

            <p style={{ margin: '0.5em 0' }}>{creator.description}</p>

            <footer style={{ display: 'flex', gap: '1rem', marginTop: '1em' }}>
                <Link to={`/edit/${id}`}><button>Edit</button></Link>
                <button onClick={handleDelete}>Delete</button>
                <Link to="/" className="secondary">Back to list</Link>
            </footer>
        </article>
    );
}