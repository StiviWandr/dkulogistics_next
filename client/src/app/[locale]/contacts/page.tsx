'use client'
import { motion } from 'framer-motion'
import styles from "./ContactsModule.module.css"
import { useTranslation } from 'react-i18next';
import { Container } from '@/UI/Container/Container';
import { Text20 } from '@/UI/TextSizes/Text20/Text20';
import { Text16 } from '@/UI/TextSizes/Text16/Text16';

export default function Contacts () {
    const {t} = useTranslation(["contacts"])
    return (
        <div>
            <div className={styles.title_wrapper}>
                <motion.div>
                    {t("page_title")}   
                </motion.div>
            </div>
            <Container>
                <div className={styles.cards}>
                    <motion.div className={styles.card}>
                        <h4 className={styles.card_title}>
                            <Text20>
                                {t("titles.contact")}
                            </Text20>
                        </h4>
                        <Text16>
                            <div>{t("card_lines.phone")}: +7 727 355-05-51</div>
                            <div>Whatsapp: +7 700 355-05-51</div>
                            <div>E-Mail: info@dku.kz</div>
                        </Text16>
                    </motion.div>
                    <motion.div className={styles.card}>
                        <h4 className={styles.card_title}>
                            <Text20>
                                {t("titles.science_collaboration")}
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
                                {t("titles.first_address")}
                            </Text20>
                        </h4>
                        <Text16>
                            <div>{t("card_lines.pushkin")}</div>
                            <div>050010 {t("card_lines.almaty")}</div>
                            <div>{t("card_lines.kazakhstan")}</div>
                        </Text16>
                    </motion.div>
                    <motion.div className={styles.card}>
                        <h4 className={styles.card_title}>
                            <Text20>
                                {t("titles.second_address")}
                            </Text20>
                        </h4>
                        <Text16>
                            <div>{t("card_lines.nazarbaev")}</div>
                            <div>050010 {t("card_lines.almaty")}</div>
                            <div>{t("card_lines.kazakhstan")}</div>
                        </Text16>
                    </motion.div>
                </div>
                <div className={styles.map}>

                </div>
            </Container>
        </div>
    );
}