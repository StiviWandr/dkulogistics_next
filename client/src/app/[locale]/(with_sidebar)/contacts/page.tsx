'use client'
import { motion } from 'framer-motion'
import styles from "./ContactsModule.module.css"
import { Container } from '@/UI/Container/Container';
import { Text20 } from '@/UI/TextSizes/Text20/Text20';
import { Text16 } from '@/UI/TextSizes/Text16/Text16';
import { useTranslations } from 'next-intl';

export default function Contacts () {
    const t = useTranslations('Контакты')
    return (
        <div>
            <div className={styles.title_wrapper}>
                <motion.div>
                    {'Контакты'}   
                </motion.div>
            </div>
            <Container>
                <div className={styles.cards}>
                    <motion.div className={styles.card}>
                        <h4 className={styles.card_title}>
                            <Text20>
                                {t("Позвонить или написать")}
                            </Text20>
                        </h4>
                        <Text16>
                            <div>{t("Телефон")}: +7 727 355-05-51</div>
                            <div>Whatsapp: +7 700 355-05-51</div>
                            <div>E-Mail: info@dku.kz</div>
                        </Text16>
                    </motion.div>
                    <motion.div className={styles.card}>
                        <h4 className={styles.card_title}>
                            <Text20>
                                {t("Научное сотрудничество")}
                            </Text20>
                        </h4>
                        <Text16>
                            <div>+7 727 355-05-51 (вн. 238)</div>
                            <div>beimenbetov@dku.kz</div>
                            <div>tylyubayeva@dku.kz</div>
                        </Text16>
                    </motion.div>
                    <motion.div className={styles.card}>
                        <h4 className={styles.card_title}>
                            <Text20>
                                {t('Адрес главного корпуса А')}
                            </Text20>
                        </h4>
                        <Text16>
                            <div>{t('Пушкина')}</div>
                            <div>050010 {t("Алматы")}</div>
                            <div>{t("Казахстан")}</div>
                        </Text16>
                    </motion.div>
                    <motion.div className={styles.card}>
                        <h4 className={styles.card_title}>
                            <Text20>
                                {t('Адрес второго корпуса В')}
                            </Text20>
                        </h4>
                        <Text16>
                            <div>{t("Назарбаева")}</div>
                            <div>050010 {t("Алматы")}</div>
                            <div>{t("Казахстан")}</div>
                        </Text16>
                    </motion.div>
                </div>
                <div className={styles.map}>

                </div>
            </Container>
        </div>
    );
}