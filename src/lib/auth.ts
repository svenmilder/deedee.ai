import { supabase } from "./supabase";

// Sign Up Function
export const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
};

// Sign In Function
export const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) throw error;
    return data;
};

// OAuth Sign In (LinkedIn, Google, GitHub, etc.)
export const signInWithOAuth = async (provider: "linkedin_oidc" | "google" | "github") => {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: "linkedin_oidc",
        options: { redirectTo: `${window.location.origin}/dashboard` },
    });

    if (error) throw new Error(error.message);
};

// Sign Out Function
export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
};
