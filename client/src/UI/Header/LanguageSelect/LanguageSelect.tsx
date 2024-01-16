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
        KK = 'kk',
     }
  
     const anotherLocale = Object.values(ELangs).find((l) => l !== locale)
  
     const langsDict = {
        [ELangs.RU]: 'РУС',
        [ELangs.KK]: 'KAZ',
     }
    const handleChange = () => {
        router.push(`/${anotherLocale}${pathname}`)
    }
    return (
        <div >
            <Select
                onChange={handleChange}
                value={langsDict[locale as ELangs]}
                
                options={[
                    { value: 'ru', label: 'РУС' },
                    { value: 'kz', label: 'КАЗ' },
                    { value: 'en', label: 'ENG' }
                ]}
            />
        </div>
    );
}