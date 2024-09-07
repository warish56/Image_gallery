import { useEffect, useRef, useState } from "react"
import { ImageList } from "../types/image";
import { AppCache } from "../utils/cache";

const IMAGE_LIST_URL='https://picsum.photos/v2/list';

type ImageData = {
    id: string;
    isLoading: boolean;
    url:string;
}

const imageCache = new AppCache<ImageList>()

export const useGetImages = (defaultValue?:ImageList|null|undefined) => {
    const [loading, setLoading] = useState<Record<number, boolean>>({});
    const [error, setError] = useState<Record<number, boolean>>({});
    const [data, setData] = useState<Partial<Record<number, ImageList|null>>>(() => {
        if(defaultValue){
            return {1: defaultValue}
        }
        return {}
    });

    const tempDataRef = useRef({
        currentPage:1,
        hasReachedEnd:false
    })

    const pageLimit = 30;


    const setLoadingStatus = (page:number, isLoading:boolean) => {
        setLoading((prevVal) => ({
            ...prevVal,
            [page]: isLoading
        }))
    }

    const setErrorStatus = (page:number, hasError:boolean) => {
        setError((prevVal) => ({
            ...prevVal,
            [page]: hasError
        }))
    }

    const setImageData= (page:number, data:ImageList) => {
        setData((prevVal) => ({
            ...prevVal,
            [page]: data
        }))
    }

    const imageFetcher = (page:number) => {
        return fetch(`${IMAGE_LIST_URL}?page=${page}`).then(resp => resp.json()) as Promise<ImageList>
    }

    const imageQuery = async (page:number) => {
        const cachedData = imageCache.getData(""+page)
        if(cachedData){
            console.log("==returning from cache==",page)
            return cachedData;
        }
        return imageFetcher(page);
    }

    const fetchImages = (page:number) => {
        setLoadingStatus(page, true);
        imageQuery(page).then(data => {
            imageCache.setData(""+page, data);
            setImageData(page, data);
            if(data.length === 0){
                tempDataRef.current.hasReachedEnd = true;
            }
        }).catch(() => {
            setErrorStatus(page, true)
        })
        .finally(() => {
            setLoadingStatus(page, false);
        })
    }

    const loadMoreImages = () => {
        if(tempDataRef.current.hasReachedEnd){
            return;
        }
        const nextPage = tempDataRef.current.currentPage + 1;
        tempDataRef.current.currentPage = nextPage;
        fetchImages(nextPage)
    }

    useEffect(() => {
        if(!defaultValue){
            fetchImages(1);
        }
    }, [])


    const currentPage = tempDataRef.current.currentPage;
    const imageList:ImageData[] = [];
    
    for(let i=1; i<=currentPage; i++){
        const page = i;
        const pageData = data[Number(page)];
        const isLoading = loading[Number(page)]
        if(isLoading){
            const val =  new Array(pageLimit).fill(0);
            const newVal = val.map((item, idx) => ({url:'', isLoading:true, id:`${i}_${idx}`}));
            imageList.push(...newVal)
        }else{
            const val =  pageData?.map(item => ({url:item.download_url,isLoading:false, id:item.download_url})) || []
            imageList.push(...val);
        }
    }

    return {
        currentPage,
        loadMoreImages,
        error,
        loading,
        imageList,
        pageLimit,
    }

}