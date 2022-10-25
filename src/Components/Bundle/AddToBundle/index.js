import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Stack 
} from '@mui/material';
import {
    AddShoppingCart,
    RemoveShoppingCart,
 } from '@mui/icons-material';
import ReactStars from 'react-rating-stars-component';
import styles from './styles.module.scss';

export default class AddToBundle extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        numOfReviews: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        starValue: PropTypes.number.isRequired,
        onAdd: PropTypes.func.isRequired,
        imgPath: PropTypes.string.isRequired,
    }

    render() {
        const { title, numOfReviews, price, onAdd, onRemove, starValue, imgPath, countInCart } = this.props;

        return (
            <Card
                sx={{ width: 270, borderRadius: '16px' }}
                raised
            >
                <CardMedia
                    component='img'
                    alt='green iguana'
                    height='240'
                    image={imgPath}
                />
                <CardContent>
                    <Typography gutterBottom variant='h6' className={styles.title}>
                        {title}
                    </Typography>
                    <div className={styles.reviews_container}>
                        <ReactStars
                            size={30}
                            count={5}
                            isHalf={true}
                            value={starValue}
                            color='Gainsboro'
                            activeColor='black'
                            onChange={newValue => console.log(`new value is ${newValue}`)}
                        />
                        <div className={styles.reviews}>{numOfReviews} reviews</div>
                    </div>

                    <Typography variant='h6' className={styles.priceAndCart}>
                        <div>${price}</div>
                        <div>In Cart: {countInCart}</div>
                    </Typography>
                </CardContent>
                <Stack direction="row" spacing={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <IconButton
                        color="primary"
                        aria-label="add to shopping cart"
                        variant='contained'
                        size='large'
                        onClick={onAdd}
                    >
                        <AddShoppingCart />
                    </IconButton>
                    <IconButton
                        color="primary"
                        aria-label="remove from shopping cart"
                        variant='contained'
                        size='large'
                        onClick={onRemove}
                    >
                        <RemoveShoppingCart />
                    </IconButton>
                </Stack>
            </Card>
        );
    }

}
