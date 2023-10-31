
"use client";
import isAuthenticated from "@/helpers/utils/authProtection";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useRouter } from 'next/navigation';


export default function AuthHoc(Component: any) {
    return function IsAuth(props: any) {
        const auth = isAuthenticated;
        const router = useRouter()
        useEffect(() => {
            if (!auth) {
                router.push("/");
            }
        }, []);


        if (!auth) {
            return null;
        }

        return <Component {...props} />;
    };
}