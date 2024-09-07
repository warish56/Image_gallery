'use client';

import { SyntheticEvent, useMemo } from "react";
import styles from './style.module.css';

type props = {
 url:string;
 width:number;
 height:number;
}

export const ImageCard = ({url, width, height}:props) => {

   const extraWidth = 300;
   const extraHeight = 300;

   const {newHdUrl, blurredUrl} =  useMemo(() => {
        const urlParts = url.split('/');
        urlParts[urlParts.length-1] = ""+(height+extraHeight);
        urlParts[urlParts.length-2] = ""+(width+extraWidth);
        const newHdUrl = urlParts.join('/');

        urlParts[urlParts.length-1] = "400";
        urlParts[urlParts.length-2] = "400";
        const blurredUrl = urlParts.join('/')+'?blur=10';
        return {newHdUrl, blurredUrl}
   }, [url, width, height])

   const onLoad = (e:SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.parentElement?.firstElementChild?.remove();
   }

    return (
        <div className={styles.container}>
            <div className={styles.fallback}>
               <img fetchPriority="high" loading="eager" src={blurredUrl} alt="gallery random blurred pic"/>  
            </div>
            <img onLoad={onLoad} loading="lazy" src={newHdUrl} alt="gallery random pic"/>
        </div>
    )
}