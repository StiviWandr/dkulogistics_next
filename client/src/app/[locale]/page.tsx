import { AboutJournal } from "@/Modules/HomePage/AboutJournal/AboutJournal";

export default function Home({ params: { locale } }: any) {
    console.log(locale);
    
    return (
        <>
            <AboutJournal lang={locale}/>
        </>
    )
}
