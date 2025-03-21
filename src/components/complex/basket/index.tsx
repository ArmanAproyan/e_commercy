import styles from './style.module.scss';
import useOutsideClick from '../../../hooks/useOutsideClick';
import { Product } from '../../../types/products';

interface Ibasket {
    isOpen: boolean;
    handleBasketModale: () => void;
    basketData: Product[] | null;
    incrementCount: (product: Product) => void;
    deleteProduct: (id: number) => void;
    decrementCount: (id: number) => void;
}

const Basket: React.FC<Ibasket> = ({ isOpen, handleBasketModale, basketData, incrementCount, decrementCount }) => {
    const ref = useOutsideClick(handleBasketModale);


    return isOpen ? (
        <div className={styles.container}>
            <div ref={ref} className={styles.basket}>
                <div className={styles.header}>
                    <h2>Your Basket</h2>
                    <button className={styles.close_button} onClick={handleBasketModale}>Close</button>
                </div>
                {basketData?.map((val) => (
                    <div key={val.id} className={styles.basket_data}>
                        <div className={styles.image_block}>
                            <img src={val.thumbnail} alt={val.title} />
                        </div>
                        <div className={styles.info_block}>
                            <div className={styles.product_info}>
                                <p><strong>{val.title}</strong></p>
                                <p>Brand: <span>{val.brand}</span></p>
                                <p>Price: <span>${val.price}</span></p>
                            </div>
                            <div className={styles.actions}>
                                <button onClick={() => incrementCount(val)} className={styles.action_button}>+</button>
                                <span className={styles.count}>{val.count}</span>
                                <button onClick={() => {decrementCount(val.id)}} className={styles.action_button}>-</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ) : null;
};

export default Basket;
