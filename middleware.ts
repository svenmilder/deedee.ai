import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function middleware(req: NextRequest) {
    const session = await supabase.auth.getSession();

    if (!session.data.session) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"], // Protect specific routes
};
