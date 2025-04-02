import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen flex items-center flex-col justify-center w-full">
            <h1 className="text-4xl font-bold">DeeDee</h1>
            <Link className={buttonVariants({})} href="/auth/signin">
                Login
            </Link>
        </div>
    );
}
