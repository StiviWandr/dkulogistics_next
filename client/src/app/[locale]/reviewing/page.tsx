"use client"

import ReviewingArticles from "@/Modules/Reviewing/ReviewingArticles/ReviewingArticles";
import { createErrorNotify } from "@/helpers/functions/Toasts/toastsNotifications";
import { useAppSelector } from "@/helpers/hooks/redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ReviewArticles () {
    const {info} = useAppSelector(state => state.user)
    const router = useRouter()
    useEffect(()=>{
        if(info.role==='user'){
            createErrorNotify("Сюда нельзя")
            router.push("/")
        }
    }, [router, info?.role])
    return (
        <>
            <ReviewingArticles/>
        </>
    );
}