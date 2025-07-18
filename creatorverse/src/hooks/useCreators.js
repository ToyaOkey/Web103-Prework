import { useState, useEffect, useCallback } from "react";
import { supabase } from "../client";

export function useCreators() {
    const [creators, setCreators] = useState([]);
    const [loading,  setLoading ] = useState(true);

    /** Read all */
    const fetchCreators = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("creators")
            .select("*")
            .order("name");
        if (error) console.error(error);
        setCreators(data ?? []);
        setLoading(false);
    }, []);

    /** Create */
    const addCreator = async (payload) => {
        const { error } = await supabase.from("creators").insert(payload);
        if (!error) fetchCreators();
    };

    /** Update */
    const updateCreator = async (id, payload) => {
        const { error } = await supabase
            .from("creators")
            .update(payload)
            .eq("id", id);
        if (!error) fetchCreators();
    };

    /** Delete */
    const deleteCreator = async (id) => {
        const { error } = await supabase.from("creators").delete().eq("id", id);
        if (!error) fetchCreators();
    };

    useEffect(() => {
        fetchCreators();
    }, [fetchCreators]);

    return { creators, loading, addCreator, updateCreator, deleteCreator };
}