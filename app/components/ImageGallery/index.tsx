'use client';

import { useGetImages } from '@/app/hooks/useGetImages';
import styles from './style.module.css';
import { ImageCardSkeleton } from '../skeleton/ImageCard';
import { ImageCard } from '../Card/ImageCard';
import { useEffect, useRef } from 'react';

export const ImageGallery = () => {
    const {imageList, loadMoreImages} = useGetImages();
    const footerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const options = {
            rootMargin: "0px",
            threshold: 0.1,
        }

        const callback:IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                if(entry.isIntersecting){
                    loadMoreImages()
                }
            })
        }
        const observer = new IntersectionObserver(callback, options);
        footerRef.current &&  observer.observe(footerRef.current)
        return () => {
            observer.disconnect();
        }

    }, [])

    return (
        <section>
            <div className={styles.gallery}>
            {
                imageList.map(imageData => {
                    if(imageData.isLoading){
                        return <ImageCardSkeleton key={imageData.id} height={500}/>
                    }
                    return <ImageCard key={imageData.url} url={imageData.url} height={500} width={400}/>
                })
            }
            </div>
            <div ref={footerRef} className={styles.footer}></div>
        </section>
    )
}