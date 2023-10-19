'use client'

import styles from "./Modal.module.css"
import Image  from "next/image"
import CloseIcon from "@/assets/icons/close.png"
interface ModalProps {
    title: string,
    onClose: () => void,
    children: React.ReactNode,
    isOpen: boolean
}
export function Modal (props: ModalProps) {
  
     
    if(props.isOpen){
        return null;
    }
    return (
        <>
            <div className={styles.modal_wrapper}>
                <div className={styles.modal_bg}
                    onClick={props.onClose}
                ></div>
                <div className={styles.modal}
                >
                    <Image
                        height={20}
                        width={20}
                        className={styles.close}
                        src={CloseIcon}
                        alt="Close modal"
                    />
                    {props.children}
                </div>
            </div>
        </>
    )
}