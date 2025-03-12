import Iproduct from "../../../../types/products";
import useFetch from "../../../../hooks/useFetch";
import Raiting from "../../../simple/raiting";
import styles from './style.module.scss';
import Slider from "../../../simple/slider";

const Products = () => {
  const [data, loading, error] = useFetch<Iproduct>("https://dummyjson.com/products");
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  return (
    <div className={styles.productList}>
      {data?.products.map((val) => (
        <div className={styles.productCart} key={val.id}>
          <div className={styles.image}>
            <Slider images={val.images} />
          </div>
          <h3 className={styles.productTitle}>{val.title}</h3>
          <div className={styles.prodctBrand}>
            <span>{val.brand}</span>
          </div>
          <p className={styles.productDescription}>{val.description}</p>

          <div className={styles.productDetails}>
            <span className={styles.productPrice}>${val.price}</span>
            <span className={styles.productDiscount}>-{val.discountPercentage}%</span>
            <div className={styles.productRating}>
              <Raiting rating={val.rating} />
            </div>


          </div>
          <div className={styles.productReviews}>
            <span>Reviews {val.reviews.length}</span>
          </div>

          <div className={styles.productFooter}>
            <button className={styles.addToCartButton}>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
