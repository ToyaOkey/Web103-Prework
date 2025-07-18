import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';

export default function AddCreator() {
    const [form, setForm]   = useState({
        name: '',
        url: '',
        description: '',
        imageURL: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate              = useNavigate();

    // Keep form values in component state
    const handleChange = (e) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    // On submitting, insert into Supabase and redirect home
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase
            .from('creators')
            .insert([form]);

        setLoading(false);
        if (error) {
            console.error('Error adding creator:', error);
            alert('Failed to add—check console for details.');
        } else {
            navigate('/');   // go back to the list
        }
    };

    return (
        <section>
            <h2>Add a New Creator</h2>
            <form onSubmit={handleSubmit}>
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
                        name="imageURL"
                        value={form.imageURL}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        type="url"
                    />
                </label>

                <button type="submit" disabled={loading}>
                    {loading ? 'Saving…' : 'Add Creator'}
                </button>
            </form>
        </section>
    );
}