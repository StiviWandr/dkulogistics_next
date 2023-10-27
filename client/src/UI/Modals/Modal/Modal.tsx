'use client'
import { motion } from 'framer-motion'
import styles from "./Modal.module.css"
import Image  from "next/image"
import CloseIcon from "@/assets/icons/close.png"
import { Text24 } from '@/UI/TextSizes/Text24/Text24'
interface ModalProps {
    title: string,
    onClose: () => void,
    children: React.ReactNode,
    isOpen: boolean
}
export function Modal (props: ModalProps) {
    

   
    return (
        <>
           {    
            props.isOpen 
           
            &&

            <div className={styles.modal_wrapper}>
                <motion.div className={styles.modal_bg} onClick={props.onClose}
                    initial={{opacity: 0}}
                    animate={{opacity: .6}}
                    transition={{duration: .5}}
                ></motion.div>
                <motion.div className={styles.modal}
                    initial={{y: 100, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{'easeIn': 1, delay: .5}}
                >
                    <Image
                        style={{cursor: 'pointer'}}
                        height={20}
                        width={20}
                        onClick={props.onClose}
                        className={styles.close}
                        src={CloseIcon}
                        alt="Close modal"
                    />
                    <div className={styles.header}>
                        <Text24>{props.title}</Text24>
                    </div>
                    
                    {props.children}
                </motion.div>
            </div>
            }
        </>
    )
}