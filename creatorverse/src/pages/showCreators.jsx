// src/pages/ShowCreators.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import CreatorCard from '../components/CreatorCard';
import { Link } from 'react-router-dom';

export default function ShowCreators() {
    const [creators, setCreators] = useState([]);
    const [loading, setLoading]   = useState(true);

    useEffect(() => {
        supabase
            .from('creators')
            .select('*')
            .order('name', { ascending: true })
            .then(({ data, error }) => {
                if (error) console.error(error);
                else setCreators(data);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p className="text-center">Loading creators…</p>;
    }

    return (
        <section className="container flow">
            <header className="grid columns-2">
                <Link to="/new" className="contrast">
                    ➕ Add Creator
                </Link>
            </header>

            {creators.length === 0 ? (
                <p className="text-center">
                    No creators yet. <Link to="/new">Add one now!</Link>
                </p>
            ) : (
                /* Responsive grid: 1 column on xs, 2 on sm, 3 on md+ */
                <div className="grid columns-1 columns-sm-2 columns-md-3">
                    {creators.map((c) => (
                        <CreatorCard key={c.id} creator={c} onDelete={() => {
                            supabase.from('creators').delete().eq('id',c.id)
                                .then(() => setCreators((cur) => cur.filter(x=>x.id!==c.id)));
                        }} />
                    ))}
                </div>
            )}
        </section>
    );
}