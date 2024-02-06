'use client'
import styles from './AuthorRules.module.css'
import { Text16 } from "@/UI/TextSizes/Text16/Text16";
import { Text20 } from "@/UI/TextSizes/Text20/Text20";
import { Text24 } from "@/UI/TextSizes/Text24/Text24";
import { useTranslations } from 'next-intl';


export default function Contacts () {
    const t = useTranslations('Правила для авторов')
    return (
        <div>
            <div className={styles.title}>
                <Text24>
                    {t('Информация для авторов')}
                </Text24>
            </div>
            
            <div className={styles.content}>
               
                    <Text16>
                        <br/>{t('Редакция научного журнала')}
                        <br/>{t('Обращаем ваше внимание')}
                        <br/>{t('Автор не должен предлагать свою статью другим журналам и изданиям, если она принята редакцией')}
                        <br/>{t('Оформленная по Правилам')}

                    </Text16>
            </div>
        </div>
    );
}