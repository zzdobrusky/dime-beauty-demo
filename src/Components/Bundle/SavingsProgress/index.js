import React from 'react';

import styles from './styles.module.scss';

export default function SavingsProgress(props) {
    const { widthPercentage } = props;

    return (
    <div className={styles.container}>
        <div className={styles.inner} style={{ width: `${widthPercentage}%`}} />
        <div style={{ textAlign: 'center', fontWeight: 'bold'}}>10%</div>
    </div>
    );
  }