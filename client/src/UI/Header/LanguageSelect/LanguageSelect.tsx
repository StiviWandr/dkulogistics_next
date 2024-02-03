'use client';
import { Select } from 'antd';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export  function LanguageSelect() {
    const locale = useLocale()
    let pathname = usePathname()
   
    const router = useRouter()
    enum ELangs {
        RU = 'ru',
        KZ = 'kz',
        EN = 'en',
     }
  
     const anotherLocale = Object.values(ELangs).find((l) => l !== locale)
  
     const langsDict = {
        [ELangs.RU]: 'РУС',
        [ELangs.EN]: 'ENG',
        [ELangs.KZ]: 'KAZ',
     }
     const handleChange = (value: ELangs) => {
        
        const newPathname = pathname.startsWith('/' + locale) 
            ? pathname.replace('/' + locale, '') 
            : pathname;
        router.push(`/${value}${newPathname}`);
    }
    return (
        <div>
        <Select
            onChange={handleChange} // Теперь handleChange вызывается с новым значением языка
            value={locale as ELangs}
            options={Object.values(ELangs).map((lang) => ({
                value: lang,
                label: langsDict[lang],
            }))}
        />
    </div>
    );
}