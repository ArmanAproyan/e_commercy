import styles from './style.module.scss';
import { Review } from '../../../types/products';

const Reviews = ({ review }: { review: Review[] }) => {

    return (
        <div className={styles.reviews_block}>
            {review && review.map((val, index) => {
                return (
                    <div key={index}>
                        <span>{val.reviewerName} -</span>
                        <span>{val.comment}</span>

                    </div>
                )
            })}
        </div>
    )
}

export default Reviews