import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AddToBundle from '../AddToBundle';

import styles from './styles.module.scss';

const data = [
    {
        title: 'Probiotic Gel Cream',
        numOfReviews: 7,
        price: 40,
        starValue: 4,
        imgPath: '/images/download.jpg'
    },
    {
        title: 'Creamy Foam Cleanser',
        numOfReviews: 146,
        price: 32,
        starValue: 1,
        imgPath: '/images/download.jpg'
    },
    {
        title: 'Colume Mascara',
        numOfReviews: 25,
        price: 22,
        starValue: 5,
        imgPath: '/images/download.jpg'
    },
    {
        title: 'Cleansing Balm',
        numOfReviews: 184,
        price: 38,
        starValue: 4.5,
        imgPath: '/images/download.jpg'
    }
];


export default class Bundle extends Component {
    render() {
        return (
            <div className={styles.bundle_container}>
                {data.map(item =>
                    <div className={styles.bundle}>
                        <AddToBundle
                            title={item.title}
                            numOfReviews={item.numOfReviews}
                            price={item.price}
                            starValue={item.starValue}
                            onAdd={() => null}
                            imgPath={item.imgPath}
                        />
                    </div>
                )}
            </div>

        );


    }
}