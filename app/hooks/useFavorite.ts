import axios from "axios";
import{useRouter} from 'next/navigation'
import React, { useCallback,useMemo } from "react";
import{toast} from 'react-hot-toast'

import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";

interface IUseFavorite{
    listingId:string,
    currentUser:SafeUser |null
}


const useFavorite = ({
    listingId,
    currentUser
}:IUseFavorite)=>{

    const router = useRouter()
    const loginModal = useLoginModal()

    const hasFavorited = useMemo(()=>{
        const list = currentUser?.favouriteIds||[]
        return list.includes(listingId)
    }
    ,[currentUser,listingId])

    const toogleFavorite = useCallback(async (e:React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if(!currentUser){
            return loginModal.onOpen()
        }

        try {
            let request

            if(hasFavorited){
                request= ()=>axios.delete(`/api/favorites/${listingId}`)
                
            }else{
                request = ()=>axios.post(`/api/favorites/${listingId}`)
            }
            await request()
            router.refresh()
            toast.success('success')
        } catch (error) {
            console.error('Oops error',error)
        }
        
    },[
        currentUser,
        loginModal,
        hasFavorited,
        router,
        listingId
    ])
}
export default  useFavorite
