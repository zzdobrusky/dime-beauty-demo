import React, { Component } from 'react';

import {
    AppBar,
    Toolbar,
    Typography,
    Drawer,
    LinearProgress,
    Box
} from '@mui/material';

import AddToBundle from './AddToBundle';
import SavingsProgress from './SavingsProgress';

import styles from './styles.module.scss';

const bottomBarHeight = '150px';

const data = [
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
        items: [], // TODO: this will get populated from api
        selectedItems: {}, // key:value pairs, both keys (id) and values (number of items in a cart) are numbers
        bundlePrice: 0,
        savings: 0,
        loading: false,
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
        const { selectedItems, items } = this.state;
        let bundlePrice = 0;
        let savings = 0;
        Object.entries(selectedItems).forEach(([id, countInCart]) => {
            const pricePerItemCount = items.find(item => item.id === parseInt(id))?.price * countInCart;
            bundlePrice = bundlePrice + pricePerItemCount;
        });

        if (bundlePrice >= 100) {
            savings = bundlePrice / 10;
            bundlePrice = bundlePrice - savings;
        }
        return { bundlePrice, savings };
    }

    componentDidMount() {
        // TODO: loading data from api instead, using timout to simulate
        this.setState({ loading: true });
        setTimeout(() => this.setState({ items: data, loading: false }), 2000);
    }

    render() {
        const { selectedItems, bundlePrice, savings, items, loading } = this.state;

        return loading
            ?
            <Box sx={{ width: '60%', margin: '50% auto auto auto' }}>
                <LinearProgress />
            </Box>
            
            :
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
                        <SavingsProgress widthPercentage={savings > 0 ? 50 : 0} />
                    </div>
                </Drawer>
            </>;
    }
}