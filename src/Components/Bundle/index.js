import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    AppBar,
    Toolbar,
    Typography,
    Drawer,
} from '@mui/material';

import AddToBundle from './AddToBundle';
import LinearProgress from './LinearProgress';

import styles from './styles.module.scss';

const bottomBarHeight = '150px';

const items = [
    {
        id: 1,
        title: 'Probiotic Gel Cream',
        numOfReviews: 7,
        price: 40,
        starValue: 4,
        imgPath: '/images/download.jpg'
    },
    {
        id: 2,
        title: 'Creamy Foam Cleanser',
        numOfReviews: 146,
        price: 32,
        starValue: 1,
        imgPath: '/images/download.jpg'
    },
    {
        id: 3,
        title: 'Colume Mascara',
        numOfReviews: 25,
        price: 22,
        starValue: 5,
        imgPath: '/images/download.jpg'
    },
    {
        id: 4,
        title: 'Cleansing Balm',
        numOfReviews: 184,
        price: 38,
        starValue: 4.5,
        imgPath: '/images/download.jpg'
    }
];


export default class Bundle extends Component {
    state = {
        // key:value pairs, both keys (id) and values (number of items in a cart) are numbers
        selectedItems: {},
        bundlePrice: 0,
        savings: 0
    };

    onAdd = (id) => {
        const { selectedItems } = this.state;
        const countInCart = selectedItems[id];
        selectedItems[id] = Number.isInteger(countInCart) ? (countInCart + 1) : 1;
        this.setState({ 
            selectedItems,
            ...this.getBundlePrice(),
        });  
    }

    onRemove = (id) => {
        const { selectedItems } = this.state;
        const countInCart = selectedItems[id];
        selectedItems[id] = Number.isInteger(countInCart) && countInCart > 0 ? (countInCart - 1) : 0;
        this.setState({ 
            selectedItems,
            ...this.getBundlePrice(),
        });  
    }

    getBundlePrice = () => {
        const { selectedItems } = this.state;
        let bundlePrice = 0;
        let savings = 0;
        Object.entries(selectedItems).forEach(([id, countInCart]) => {
            const pricePerItemCount = items.find(item => item.id === parseInt(id))?.price * countInCart;
            bundlePrice = bundlePrice + pricePerItemCount;
        });

        if (bundlePrice >= 100) {
            savings = bundlePrice/10;
            bundlePrice = bundlePrice - savings;
        }
        return { bundlePrice, savings };
    }

    render() {
        const { selectedItems, bundlePrice, savings } = this.state;

        return (
            <>
                <div className={styles.container}>
                    {items.map(item =>
                        <div className={styles.bundle} key={item.id}>
                            <AddToBundle
                                title={item.title}
                                numOfReviews={item.numOfReviews}
                                price={item.price}
                                starValue={item.starValue}
                                onAdd={() => this.onAdd(item.id)}
                                onRemove={() => this.onRemove(item.id)}
                                imgPath={item.imgPath}
                                countInCart={selectedItems[item.id] || 0}
                            />
                        </div>
                    )}
                </div>
                <AppBar
                    position='fixed'
                    color='primary'
                    sx={{
                        top: 'auto',
                        bottom: bottomBarHeight,
                        borderRadius: '30px 30px 0 0',
                    }}
                >
                    <Toolbar sx={{ margin: 'auto' }}>
                        <Typography variant='h6' component='div'>
                            Add $100 to save 10%
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant='permanent'
                    anchor='bottom'
                    color='secondary'
                    PaperProps={{
                        sx: {
                            height: bottomBarHeight
                        }
                    }}
                >

                    <div style={{ padding: '1em' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'large' }}>
                            <div>Bundle Price</div>
                            <div>Your Savings</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'x-large', fontWeight: 'bold' }}>
                            <div>${bundlePrice}</div>
                            <div>${savings}</div>
                        </div>
                        <LinearProgress widthPercentage={50} />
                    </div>
                </Drawer>


            </>

        );
    }
}