"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { signUp, signInWithOAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Loader2, Linkedin } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Schema for form validation
const signUpSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const { control, handleSubmit } = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = async (data: SignUpFormValues) => {
        setLoading(true);
        setError(null);
        try {
            const response = await signUp(data.email, data.password);
            if (response?.user) {
                alert("Check your email for confirmation!");
                router.push("/login");
            } else {
                setError("Something went wrong. Please try again.");
            }
        } catch (err: any) {
            setError(err.message || "Failed to sign up.");
        } finally {
            setLoading(false);
        }
    };

    const handleLinkedInLogin = async () => {
        setLoading(true);
        try {
            await signInWithOAuth("linkedin_oidc");
        } catch (err: any) {
            setError(err.message || "OAuth login failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="max-w-md mx-auto mt-10 p-6">
            <CardHeader>
                <CardTitle>Create an Account</CardTitle>
            </CardHeader>
            <CardContent>
                {error && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Controller
                        name="email"
                        control={control}
                        render={({ field, fieldState }) => (
                            <div>
                                <Input type="email" placeholder="Email" {...field} />
                                {fieldState.error && (
                                    <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                )}
                            </div>
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field, fieldState }) => (
                            <div>
                                <Input type="password" placeholder="Password" {...field} />
                                {fieldState.error && (
                                    <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                )}
                            </div>
                        )}
                    />
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" /> : "Sign Up"}
                    </Button>
                </form>
                <div className="my-4 text-center text-sm text-gray-500">OR</div>
                <Button
                    className="w-full flex items-center justify-center gap-2"
                    variant="outline"
                    onClick={handleLinkedInLogin}
                    disabled={loading}
                >
                    {loading ? <Loader2 className="animate-spin" /> : <Linkedin className="h-5 w-5" />}
                    Continue with LinkedIn
                </Button>
            </CardContent>
        </Card>
    );
}
