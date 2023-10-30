'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18nConfig from '@/i18nConfig';
import { Select } from 'antd';
import { redirect } from 'next/navigation';
export  function LanguageSelect() {
    const { i18n } = useTranslation();
    const currentLocale = i18n.language;
    const router = useRouter();
    const currentPathname = usePathname();

    const handleChange =(e: any)=> {
        const newLocale = e;

        // set cookie for next-i18n-router
        const days = 30;
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = '; expires=' + date.toUTCString();
        document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    
        if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
            redirect('/' + newLocale + currentPathname);
        } else {
            redirect(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`));
        }

        router.refresh();
    };

    return (
        <div >
            <Select
                onChange={handleChange}
                value={currentLocale}
                
                options={[
                    { value: 'ru', label: 'РУС' },
                    { value: 'kz', label: 'КАЗ' },
                    { value: 'en', label: 'ENG' }
                ]}
            />
            {/* <option value="en">English</option>
            <option value="it">Italian</option>
            <option value="fr">French</option> */}
        </div>
    );
}