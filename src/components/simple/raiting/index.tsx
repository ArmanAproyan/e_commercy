import styles from './style.module.scss'
const Raiting = ({rating}: {rating: number}) => {
    const star = ['★', '★', '★', '★', '★'];
    const ratingNumber = Math.floor(rating)


    return (
        <div style={{display: 'flex'}}>
            {star.map((val, index) => {
                return (
                    <div key={index} className={styles.rating} style={{color: index >= ratingNumber ? 'gray' :  '#f39c12' }}>{val}</div>
                )
            })}
        </div>
    )
}

export default Raiting