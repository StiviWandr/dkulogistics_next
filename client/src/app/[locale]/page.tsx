import { AboutJournal } from "@/Modules/HomePage/AboutJournal/AboutJournal";

export default function Home({ params: { locale } }: any) {
    
    return (
        <>
            <AboutJournal locale={locale}/>
        </>
    )
}
