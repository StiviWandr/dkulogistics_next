'use client'
import React from 'react';

import styles from './FourthStepForm.module.css';
import { Text24 } from '@/UI/TextSizes/Text24/Text24';
import { Text16 } from '@/UI/TextSizes/Text16/Text16';

const FourthStepForm: React.FC = () => {

    return (
        <div className={styles.FourthStepForm}>
            <Text24>
                Спасибо вам за вашу заявку, она была подана на рецензию.
            </Text24>
            <Text16>После завершения рецензии вам на почту придет письмо о ее результатх</Text16>
        </div>
  );
};

export default FourthStepForm;
