import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo} from 'react'
import { toast } from "react-hot-toast";
import { safeUser } from "@/types";
import useLoginModal

from "./useLoginModal";

type Props = {
    currentUser?: safeUser | null,
    listingId:string
}


const useFavorite = ({currentUser,listingId}:Props)=>{
const router = useRouter()
const loginModal = useLoginModal()

const hasFavorited = useMemo(()=>{

    const list = currentUser?.favoritIds || []

    return list.includes(listingId)
},[currentUser,listingId])



const toggleFavorite = useCallback(async(e:React.MouseEvent<HTMLDivElement>)=>{
e.stopPropagation();
if(!currentUser) return loginModal.onOpen()

try {
    
let request
if(hasFavorited){

    request = ()=>axios.delete(`/api/favorites/${listingId}`)
}else{

    request = ()=>axios.post(`/api/favorites/${listingId}`)
}

await request()
router.refresh()
toast.success('Success')

} catch (error) {
    
toast.error('Something went wrong')

}

},[currentUser,hasFavorited,router,loginModal,listingId])


return {hasFavorited,toggleFavorite}

}


export default useFavorite