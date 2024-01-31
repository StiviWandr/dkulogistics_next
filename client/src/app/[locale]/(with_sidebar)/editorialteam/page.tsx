'use client'
import styles from './EditorialTeam.module.css'
import { Text16 } from "@/UI/TextSizes/Text16/Text16";
import { Text20 } from "@/UI/TextSizes/Text20/Text20";
import { Text24 } from "@/UI/TextSizes/Text24/Text24";


export default function Contacts () {
    
    return (
        <div>
            <Text24>
                Редакционная коллегия
            </Text24>
            <div className={styles.content}>
                <Text16>
                    <br/><br/>Ажибаева Асель Ауезовна – кандидидат экономических наук,  ректор Казахстанско-Немецкого университета
                    <br/><br/>Кегенбеков Жандос Кадырханович – кандидат технических наук, ассоциированный профессор,  декан факультета инжиниринга и информационных технологий Казахстанско-Немецкого университета
                    <br/><br/>Тюлюбаева Динара Муратбековна - кандидат технических наук, ассоциированный профессор, Руководитель отдела науки и инновационной деятельности Казахстанско-Немецкого университета
                    <br/><br/>Бекжанова Сауле Ертаевна – доктор технических наук, профессор Satbayev University 
                    <br/><br/>Толуев Юрий Иванович - Хабилитированный доктор естественных наук, доктор технических наук, профессор Института Транспорта и Телекоммуникаций (Латвия)
                    <br/><br/>Джаксон Илья -  доктор PhD Института Транспорта и Телекоммуникаций (Латвия)
                </Text16>
            </div>
           
        </div>
    );
}