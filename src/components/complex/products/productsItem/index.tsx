import styles from './style.module.scss';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../../../../hooks/useFetch';
import { Product } from '../../../../types/products';
import Reviews from '../../../simple/reviews';
import Raiting from '../../../simple/raiting';
const ProductsItem = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, loading, error] = useFetch<Product>(`https://dummyjson.com/products/${id}`);
    const [showReviews, setShowReviews] = useState<boolean>(false);

    const handleReviews = () => {
        setShowReviews(!showReviews);
    };

    const [selectedImage, setSelectedImage] = useState<undefined | string>(undefined);


    useEffect(() => {
        setSelectedImage(data?.thumbnail)
    }, [data]);


    const handeChangeSelectedImage = (url: string) => {
        setSelectedImage(url)
    };


    return (
        <div className={styles.container}>
            {loading && <span className={styles.loading}>Loading...</span>}
            {error && <span className={styles.error}>{error}</span>}
            {data && (
                <div className={styles.card}>
                    <div className={styles.images}>
                        <img src={selectedImage} alt={data.title} className={styles.mainImage} />
                        <div className={styles.imageGallery}>
                            {data.images.map((img, index) => (
                                <img onClick={() => handeChangeSelectedImage(img)} key={index} src={img} alt="product" className={styles.thumbnail} />
                            ))}
                        </div>
                    </div>
                    <div className={styles.info}>
                        <h2 className={styles.title}>{data.title}</h2>
                        <p className={styles.description}>{data.description}</p>
                        <p><b>Category:</b> {data.category}</p>
                        <p><b>Brand:</b> {data.brand}</p>
                        <p><b>Price:</b> ${data.price}</p>
                        <p><b>Discount:</b> {data.discountPercentage}%</p>
                        <div className={styles.raiting}><b>Rating:</b> <Raiting rating={data.rating} /></div>
                        <p><b>SKU:</b> {data.sku}</p>
                        <p><b>Weight:</b> {data.weight} kg</p>
                        <p><b>Dimensions:</b> {data.dimensions.width} x {data.dimensions.height} x {data.dimensions.depth} cm</p>
                        <p><b>Warranty:</b> {data.warrantyInformation}</p>
                        <p><b>Shipping:</b> {data.shippingInformation}</p>
                        <p><b>Return Policy:</b> {data.returnPolicy}</p>
                        <p><b>Availability:</b> {data.availabilityStatus}</p>
                        <div className={styles.tags}>
                            {data.tags.map((tag, index) => (
                                <span key={index} className={styles.tag}>#{tag}</span>
                            ))}
                        </div>
                        <div className={styles.meta}>
                            <p><b>Created:</b> {new Date(data.meta.createdAt).toLocaleDateString()}</p>
                            <p><b>Updated:</b> {new Date(data.meta.updatedAt).toLocaleDateString()}</p>
                            <p><b>QR Code:</b></p>
                            <div className={styles.qr_block}>
                                <img src={data.meta.qrCode} alt="qrcode" />
                            </div>
                        </div>
                        <button className={styles.backButton} onClick={() => navigate(-1)}>Go Back</button>
                        <div onClick={handleReviews} className={styles.reviews}>
                            <span>Reviews ({data.reviews?.length || 0})</span>
                            {showReviews && <Reviews review={data.reviews} />}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsItem;
