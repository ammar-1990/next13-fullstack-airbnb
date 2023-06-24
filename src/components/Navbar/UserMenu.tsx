'use client'

import {GiHamburgerMenu} from 'react-icons/gi'
import Avatar from '../Avatar'
import { useState ,useEffect ,useCallback} from 'react'
import NavItem from './NavItem'
import useRegisterModal from '@/hooks/useRegisterModal'
import useLoginModal from '@/hooks/useLoginModal'
import { safeUser } from "@/types"
import {signOut} from 'next-auth/react'
import useRentModal from '@/hooks/useRentModat'
import { useRouter } from 'next/navigation'



type Props = {currentUser?:safeUser | null }

const UserMenu = ({currentUser}: Props) => {


    const [isOpen, setIsOpen] = useState(false)
    const [show, setShow] = useState(isOpen)

    useEffect(()=>{
      setShow(isOpen)
    },[isOpen])

const registerModal = useRegisterModal()
const loginModal = useLoginModal()
const rentModal = useRentModal()


const handleRent = useCallback(()=>{

if(!currentUser) return loginModal.onOpen()
rentModal.onOpen()
},[currentUser,loginModal,rentModal])

const router = useRouter()

  return (
    <div className="flex gap-4 items-center relative">
        <div onClick={handleRent} className="py-2 px-4 border rounded-full hover:bg-gray-200 cursor-pointer duration-300 hidden lg:block">Airbnb your home</div>
        <div className="rounded-full border flex items-center gap-2 px-4 lg:py-2 py-4 shadow-sm hover:shadow-md duration-300 cursor-pointer "
        onClick={()=>{
          
          if(show)
         { 
          setShow(false)
          setTimeout(()=>{ ; setIsOpen(false)},300)}
        else{
       
          setIsOpen(true)
        }
        
        
        }}
        >
<GiHamburgerMenu /> 
<Avatar />



        </div>
        {isOpen && (
    <div className={`w-[40vw] lg:w-3/4 shadow-md rounded-lg bg-white absolute top-14 right-0 p-2 duration-300 ${show ? 'opacity-100 translate-y-2' : "opacity-0 -translate-y-4"}`}>

<>

{currentUser ? (
  <>
  <NavItem onClick={()=>{router.push('/trips');setIsOpen(false)}} label='My trips'/>
  <NavItem onClick={()=>{setIsOpen(false);router.push('/favorites')}} label='My favorites'/>
  <NavItem onClick={()=>{router.push('/reservations');setIsOpen(false)}} label='My reservations'/>
  <NavItem onClick={()=>{rentModal.onOpen();setIsOpen(false)}} label='Airbnb home'/>
  <hr className='my-1 block'/>
  <NavItem onClick={()=>{signOut();setIsOpen(false)}} label='Logout'/>
  </>
) : 
(
<>
<NavItem onClick={()=>{loginModal.onOpen();setIsOpen(false)}} label='Login'/>
<NavItem onClick={()=>{registerModal.onOpen();setIsOpen(false)}} label='Sign up'/>
</>
)}


</>


</div>
)}
    </div>
  )
}

export default UserMenu