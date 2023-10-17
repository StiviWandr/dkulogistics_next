import { AboutJournal } from "@/Modules/HomePage/AboutJournal/AboutJournal";


export default async function Home({ params: { lang } }: any) {

    return (
        <>
            <AboutJournal lang={lang}/>
        </>
    )
}
