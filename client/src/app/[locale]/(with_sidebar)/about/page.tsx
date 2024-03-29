import { AboutBlock } from "@/Modules/AboutPage/AboutBlock/AboutBlock";
import { Text16 } from "@/UI/TextSizes/Text16/Text16";
import { Text20 } from "@/UI/TextSizes/Text20/Text20";
import { useTranslations } from "next-intl";


export default function About ({ params: { locale } }: any) {
    const t = useTranslations('О журнале')
    return (
        <>
            <AboutBlock title={t("О журнале")}>
                <Text20>
                    {t('Описание')}
                </Text20>
            </AboutBlock>
            <AboutBlock title={t('Тематическая направленность')}>
                <Text20>
                    {t('1) Транспорт, транспортная инженерия')}
                </Text20>
                <Text20>
                    {t("2) Логистика на транспорте, организация перевозок")}
                </Text20>
            </AboutBlock>
            <AboutBlock title={t('Периодичность')}>
                <Text20>
                    {t('4 раза в год')}
                </Text20>
            </AboutBlock>
            <AboutBlock title={t("Издатель")}>
                <Text20>
                    {t('Казахстанско-Немецкий университет')}
                </Text20>
            </AboutBlock>
            <AboutBlock title={t('Цели и задачи')}>
                <Text20>
                    {t('Основными целями издания научного журнала «Supply Chain Management» является')}:
                </Text20>
                <Text16>
                    <ul>
                        <li>{t('информирование научной общественности по фундаментальным и прикладным исследованиям,')}</li>
                        <li>{t('содействие развитию научных исследований через освещение научной деятельности специалистов в научных областях, предусмотренных тематикой Журнала')}</li>
                        <li>{t('привлечение внимания ученых и специалистов к его проблемам')}</li>
                    </ul>
                </Text16>
                
                <Text20>
                    {t('Журнал издается для решения следующих задач')}:
                </Text20>
                <Text16>
                    <ul>
                        <li>{t('публикация оригинальных научных статей и обзоров;')}</li>
                        <li>{t('отражение основных результатов научно-исследовательских и опытно-конструкторских работ;')}</li>
                        <li>{t('пропаганда основных достижений науки;')}</li>
                        <li>{t('обеспечение эффективной научно-исследовательской деятельности в университета;')}</li>
                        <li>{t('формирование научного сообщества, объединенного тематикой журнала')}</li>
                    </ul>
                </Text16>
            </AboutBlock>
        </>
    );
}