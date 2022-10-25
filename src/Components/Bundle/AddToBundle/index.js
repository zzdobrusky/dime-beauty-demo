import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardContent,
    CardMedia,
    Typography
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
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
        const { title, numOfReviews, price, onAdd, starValue, imgPath, isSelected } = this.props;

        return (
            <Card
                sx={{ width: 300, borderRadius: '16px' }}
                raised
            >
                <CardMedia
                    component='img'
                    alt='green iguana'
                    height='240'
                    image={imgPath}
                />
                <CardContent>
                    <Typography gutterBottom variant='h5' className={styles.title}>
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

                    <Typography variant='h5' className={styles.price}>
                        ${price}
                    </Typography>
                </CardContent>
                <div style={{ padding: '1em' }}>
                    <LoadingButton
                        variant='contained'
                        fullWidth
                        size='large'
                        onClick={onAdd}
                        disabled={isSelected}
                    >
                        {isSelected ? 'In Bunde' : 'Add to Bundle'}
                    </LoadingButton >
                </div>
            </Card>
        );
    }

}
