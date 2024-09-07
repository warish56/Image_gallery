'use client';

import { useMemo } from "react"

import styles from './style.module.css'

type props = {
    text:string;
    delay: number;
}

declare module 'react' {
    interface CSSProperties {
        [key: `--${string}`]: string | number
    }
}

export const TextAnimation = ({text, delay}:props) => {
    const nodes = useMemo(() => {
        return text.split('').map((item ,idx) => (
            <span style={{
                '--idx': idx,
                paddingInlineStart: idx == 0 ? '20px' : item === ' ' ? '5px' : 0,
                paddingInlineEnd: idx == text.length-1 ? '20px' : item === ' ' ? '5px' : 0,
            }} className={styles.appear} key={`${item}_${idx}`}>{item}</span>
        ))
    }, [text])

    return (
        <div style={{
            '--delay': delay
        }} className={styles.container}>
            <div className={styles.content}>
                {nodes}
            </div>
        </div>
    )
}