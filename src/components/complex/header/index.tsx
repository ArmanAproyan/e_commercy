import styles from './style.module.scss'
import { MdFavoriteBorder } from "react-icons/md";
import { IoIosBasket } from "react-icons/io";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Product from '../../../types/products';

interface InavBarItem {
  id: number,
  name: string,
  navigate: string
};


interface IheaderProops {
  handleBasketModale: () => void,
  basketData: Product[] | null
}



const Header: React.FC<IheaderProops> = ({ handleBasketModale, basketData }) => {

  const [selectedNav, setSelectedNav] = useState<number | null>(null);
  const navigate = useNavigate();

  const navBarItems: InavBarItem[] = [
    { id: 1, name: 'Products', navigate: '/products' },
    { id: 2, name: 'Users', navigate: '/users' },
    { id: 3, name: 'Example1', navigate: '#' },
    { id: 4, name: 'Example2', navigate: '#' },

  ]

  const handleChnageNav = (index: number) => {
    setSelectedNav(index)
  };

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <div onClick={() => {
          navigate('/')
        }} className={styles.logo_item}>
          <img src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg" alt="" />
        </div>
      </div>
      <nav className={styles.navbar}>
        <ul>
          {navBarItems.map((val, index) => {
            return (
              <li
                key={val.id}
                onClick={() => {
                  handleChnageNav(index)
                  navigate(val.navigate)
                }}
                style={{ color: selectedNav == index ? 'gray' : '' }}
              >{val.name}</li>
            )
          })}
        </ul>
      </nav>
      <div className={styles.other}>
        <div onClick={handleBasketModale} className={styles.other_basket}>
          <IoIosBasket style={{ fontSize: '30px' }} />
          <span>{basketData?.length}</span>
        </div>
        <div className={styles.oter_favorites}>
          <MdFavoriteBorder style={{ fontSize: '30px' }} />
        </div>
      </div>
    </div>
  )
}

export default Header