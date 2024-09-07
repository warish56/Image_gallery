
import styles from './style.module.css';

type props = {
    height:number
}
export const ImageCardSkeleton = ({height}:props) => {
    return (
        <div style={{
            height:`${height}px`
        }} className={styles.container}></div>
    )
}