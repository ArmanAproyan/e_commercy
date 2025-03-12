import styles from './style.module.scss';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../../../hooks/useFetch';
import { Product } from '../../../../types/products';
import { useNavigate } from 'react-router-dom';

const ProductsItem = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, loading, error] = useFetch<Product>(`https://dummyjson.com/products/${id}`);
    const [showReviews, setShowReviews] = useState<boolean>(false);

    const handleReviews = () => {
        setShowReviews(!showReviews)
    }


    return (
        <div className={styles.container}>
            {loading && <span className={styles.loading}>Loading...</span>}
            {error && <span className={styles.error}>{error}</span>}
            {data && (
                <div className={styles.card}>
                    <div className={styles.imageWrapper}>
                        <img src={data.thumbnail} alt={data.title} className={styles.image} />
                    </div>

                    <div className={styles.content}>
                        <h2 className={styles.title}>{data.title}</h2>
                        <p className={styles.description}>{data.description}</p>
                        <p className={styles.price}>${data.price} <span className={styles.discount}>-{data.discountPercentage}%</span></p>
                        <p className={styles.category}>{data.category} • {data.brand}</p>
                        
                        <div className={styles.details}>
                            <p><strong>Stock:</strong> {data.stock}</p>
                            <p><strong>Rating:</strong> ⭐ {data.rating}</p>
                            <p><strong>SKU:</strong> {data.sku}</p>
                            <p><strong>Weight:</strong> {data.weight} kg</p>
                            <p><strong>Size:</strong> {data.dimensions.width} x {data.dimensions.height} x {data.dimensions.depth} cm</p>
                        </div>

                        <div className={styles.tags}>
                            {data.tags.map((tag, index) => (
                                <span key={index} className={styles.tag}>#{tag}</span>
                            ))}
                        </div>

                        <h3 onClick={handleReviews} className={styles.sectionTitle}>{data.reviews.length} Reviews</h3>
                        {showReviews && <ul className={styles.reviews}>
                            {data.reviews.map((review, index) => (
                                <li key={index} className={styles.review}>
                                    <p><strong>{review.reviewerName} ({review.reviewerEmail})</strong></p>
                                    <p>⭐ {review.rating}</p>
                                    <p>{review.comment}</p>
                                    <p className={styles.reviewDate}>{review.date}</p>
                                </li>
                            ))}
                        </ul>}

                        <h3 className={styles.sectionTitle}>Gallery</h3>
                        <div className={styles.imageGallery}>
                            {data.images.map((img, index) => (
                                <img key={data.id} src={img} alt={`Product image ${index + 1}`} className={styles.galleryImage} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsItem;
