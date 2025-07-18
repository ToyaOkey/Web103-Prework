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
        <main className="container flow-lg">
            {/* Hero / title area */}
            <header className="hero flow-sm">
                <p className="lead">
                    All of your favorite creators in one place.
                </p>
                <Link to="/new" className="contrast add-creator">
                    Add Creator
                </Link>
            </header>

            {/* Empty state */}
            {creators.length === 0 ? (
                <p className="text-center">
                    No creators to show. <Link to="/new">Add your first one!</Link>
                </p>
            ) : (
                <div className="grid columns-1 columns-sm-2 columns-md-3 gap-lg">
                    {creators.map((c) => (
                        <CreatorCard
                            key={c.id}
                            creator={c}
                            onDelete={async (id) => {
                                await supabase.from('creators').delete().eq('id', id);
                                setCreators((cur) => cur.filter((x) => x.id !== id));
                            }}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}