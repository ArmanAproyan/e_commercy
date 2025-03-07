import Iproduct from "../../../../types/products";
import useFetch from "../../../../hooks/useFetch";
import styles from './style.module.scss';
import { Value } from "sass-embedded";

const Products = () => {
  const [data, loading, error] = useFetch<Iproduct>("https://dummyjson.com/products");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.productList}>
      {data?.products.map((val) => (
        <div className={styles.productCart} key={val.id}>
          <div className={styles.image}>
            {val.images.map((val) => {
              return (
                <img src={val} alt="" />
              )
            })}
          </div>
          <h3>{val.title}</h3>

        </div>
      ))}
    </div>
  );
};

export default Products;
