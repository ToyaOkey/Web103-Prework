// src/pages/ShowCreators.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import CreatorCard from '../components/CreatorCard';
import { Link } from 'react-router-dom';

export default function ShowCreators() {
    const [creators, setCreators] = useState([]);
    const [loading, setLoading]   = useState(true);

    // Step 5a: fetch all creators from the DB
    useEffect(() => {
        async function fetchCreators() {
            const { data, error } = await supabase
                .from('creators')
                .select('*')
                .order('name', { ascending: true });

            if (error) {
                console.error('Error loading creators:', error);
            } else {
                setCreators(data);
            }
            setLoading(false);
        }

        fetchCreators();
    }, []);

    // Loading state
    if (loading) {
        return <p>Loading creators…</p>;
    }

    // No-data state
    if (creators.length === 0) {
        return (
            <p>
                No creators yet.{' '}
                <Link to="/new">Add your first creator</Link>
            </p>
        );
    }

    // Data state: map each record to a CreatorCard
    return (
        <section>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>All Creators</h2>
                <Link to="/new" className="contrast">
                    ➕ Add Creator
                </Link>
            </header>

            <div className="grid" style={{ gap: '1rem', marginTop: '1rem' }}>
                {creators.map((c) => (
                    <CreatorCard key={c.id} creator={c} />
                ))}
            </div>
        </section>
    );
}