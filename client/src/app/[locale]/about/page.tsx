import { AboutBlock } from "@/Modules/AboutPage/AboutBlock/AboutBlock";
import { Text16 } from "@/UI/TextSizes/Text16/Text16";
import { Text20 } from "@/UI/TextSizes/Text20/Text20";
import initTranslations from "@/app/i18n";


export default async function About ({ params: { locale } }: any) {
    const {t} = await initTranslations(locale, ['aboutpage'])
    return (
        <>
            <AboutBlock title={t('maintitle')}>
                <Text20>
                    {t('description')}
                </Text20>
            </AboutBlock>
            <AboutBlock title={t('titles.theme')}>
                <Text20>
                    {t('journalinfo.topics.first')}
                </Text20>
                <Text20>
                    {t('journalinfo.topics.second')}
                </Text20>
            </AboutBlock>
            <AboutBlock title={t('titles.period')}>
                <Text20>
                    {t('journalinfo.period')}
                </Text20>
            </AboutBlock>
            <AboutBlock title={t('titles.author')}>
                <Text20>
                    {t('journalinfo.author')}
                </Text20>
            </AboutBlock>
            <AboutBlock title={t('titles.goals.maintitle')}>
                <Text20>
                    {t('titles.goals.first')}:
                </Text20>
                <Text16>
                    <ul>
                        <li>{t('journalinfo.goals.firstlist.first')}</li>
                        <li>{t('journalinfo.goals.firstlist.second')}</li>
                        <li>{t('journalinfo.goals.firstlist.third')}</li>
                    </ul>
                </Text16>
                
                <Text20>
                    {t('titles.goals.second')}:
                </Text20>
                <Text16>
                    <ul>
                        <li>{t('journalinfo.goals.secondlist.first')}</li>
                        <li>{t('journalinfo.goals.secondlist.second')}</li>
                        <li>{t('journalinfo.goals.secondlist.third')}</li>
                        <li>{t('journalinfo.goals.secondlist.fourth')}</li>
                        <li>{t('journalinfo.goals.secondlist.fifth')}</li>
                    </ul>
                </Text16>
            </AboutBlock>
        </>
    );
}