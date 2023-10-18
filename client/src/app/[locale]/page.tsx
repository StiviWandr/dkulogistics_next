import { AboutJournal } from "@/Modules/HomePage/AboutJournal/AboutJournal";
import { Promo } from "@/Modules/HomePage/Promo/Promo";

export default function Home({ params: { locale } }: any) {
    
    return (
        <>
            <Promo locale={locale}/>
            <AboutJournal locale={locale}/>
        </>
    )
}
