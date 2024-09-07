'use client';

import { useMemo, useState } from "react";
import styles from './style.module.css';

type props = {
 url:string;
 width:number;
 height:number;
}

export const ImageCard = ({url, width, height}:props) => {
   const [isLoading, setLoading] = useState(true);

   const extraWidth = 300;
   const extraHeight = 300;

   const {newUrl, blurredUrl} =  useMemo(() => {
        const urlParts = url.split('/');
        urlParts[urlParts.length-1] = ""+(height+extraHeight);
        urlParts[urlParts.length-2] = ""+(width+extraWidth);
        const newUrl = urlParts.join('/');
        const blurredUrl = newUrl+'?blur=10';
        return {newUrl, blurredUrl}
   }, [url, width, height])

   const onLoad = () => {
       setLoading(false);
   }

    return (
        <div className={styles.container}>
            {isLoading &&
            <div className={styles.fallback}>
               <img src={blurredUrl} alt="gallery random blurred pic"/>  
            </div>
            }
            <img onLoad={onLoad} src={newUrl} alt="gallery random pic"/>
        </div>
    )
}