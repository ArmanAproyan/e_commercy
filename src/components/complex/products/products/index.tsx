import Iproduct from "../../../../types/products";
import Product from '../../../../types/products';
import useFetch from "../../../../hooks/useFetch";
import Raiting from "../../../simple/raiting";
import styles from './style.module.scss';
import Slider from "../../../simple/slider";

interface Iproduct {
  addToBasket: (produuct: Product) => void
}

const Products: React.FC<Iproduct> = ({addToBasket}) => {
  const [data, loading, error] = useFetch<Product>("https://dummyjson.com/products");
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.productList}>
      {data?.products.map((val) => (
        <div className={styles.productCart} key={val.id}>
          <div className={styles.image}>
            <Slider id={val.id} images={val.images} />
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
            <button onClick={() => addToBasket(val)} className={styles.addToCartButton}>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
