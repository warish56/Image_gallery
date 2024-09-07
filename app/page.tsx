
import { TextAnimation } from './components/Animation/TextAnimation';
import { ImageGallery } from './components/ImageGallery';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <img src='https://picsum.photos/id/20/200/300' 
        srcSet='https://picsum.photos/id/20/300/600?blur=2 300w, https://picsum.photos/id/20/700/600?blur=2 700w,  https://picsum.photos/id/20/1000/600?blur=2 1000w,  https://picsum.photos/id/20/1200/600?blur=2 1200w,  https://picsum.photos/id/20/1400/600?blur=2 1400w,  https://picsum.photos/id/20/1600/600?blur=2 1600w' 
        sizes='(max-width: 700px) 100vw, (min-width: 701px) and  (max-width: 999px) 700px, (min-width: 100px) and (max-width: 1200px) 1200px'
        alt="hero image"/>
        <TextAnimation delay={2} text='Welcome to the image gallery'/>
      </section>
      <main>
        <ImageGallery />
      </main>
    </div>
  );
}
