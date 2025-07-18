import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

export default function ViewCreator() {
    const { id } = useParams();         // 1) get the creator ID from URL
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

    // 3) delete handler (optional)
    const handleDelete = async () => {
        await supabase.from('creators').delete().eq('id', id);
        navigate('/');                 // back to list after delete
    };

    // 4) UI states
    if (loading) return <p>Loading…</p>;
    if (!creator) return <p>Creator not found.</p>;

    // 5) render the creator’s details
    return (
        <article className="card">
            {creator.imageurl && (
                <img
                    src={creator.imageurl}
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
                <Link to={`/edit/${id}`}>Edit</Link>
                <button onClick={handleDelete}>Delete</button>
            </footer>
        </article>
    );
}