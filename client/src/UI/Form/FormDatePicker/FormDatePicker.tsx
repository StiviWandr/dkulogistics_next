import { DatePicker } from "antd";
import styles from "./FormDatePicker.module.css"
import React from "react";
import type { Moment } from 'moment';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
interface IFormDatePickerProps {
    value: Moment,
    onChange: any
}

export const MomentDatePicker = DatePicker.generatePicker<Moment>(momentGenerateConfig);

export function FormDatePicker (props: IFormDatePickerProps) {

    return (
        <>
            <MomentDatePicker className={styles.wrapper} onChange={props.onChange} value={props.value} format={'DD.MM.YYYY'} />
        </>
    );
}