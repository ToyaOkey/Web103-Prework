// src/pages/EditCreator.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../client';

export default function EditCreator() {
    const { id }       = useParams();
    const navigate     = useNavigate();

    // form state
    const [form, setForm]       = useState({
        name: '',
        url: '',
        description: '',
        imageURL: '',
    });
    const [loading, setLoading] = useState(true);

    // 1) load the existing creator data into the form
    useEffect(() => {
        async function loadCreator() {
            const { data, error } = await supabase
                .from('creators')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching creator:', error);
            } else {
                setForm({
                    name:        data.name,
                    url:         data.url,
                    description: data.description,
                    imageURL:    data.imageURL || '',
                });
            }
            setLoading(false);
        }

        loadCreator();
    }, [id]);

    // 2) handle input changes
    const handleChange = (e) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    // 3) submit updated data
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase
            .from('creators')
            .update({
                name:        form.name,
                url:         form.url,
                description: form.description,
                imageURL:    form.imageURL,
            })
            .eq('id', id);

        setLoading(false);

        if (error) {
            console.error('Error updating creator:', error);
            alert('Update failed – check console for details.');
        } else {
            navigate(`/creator/${id}`);
        }
    };

    if (loading) {
        return <p>Loading form…</p>;
    }

    return (
        <section>
            <header style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>Edit Creator</h2>
                <Link to={`/creator/${id}`}>← Back</Link>
            </header>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1em', marginTop: '1em' }}>
                <label>
                    Name
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    URL
                    <input
                        name="url"
                        value={form.url}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Description
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Image URL (optional)
                    <input
                        name="imageurl"
                        value={form.imageURL}
                        onChange={handleChange}
                    />
                </label>

                <button type="submit" disabled={loading}>
                    {loading ? 'Saving…' : 'Update Creator'}
                </button>
            </form>
        </section>
    );
}