'use client'

import {GiHamburgerMenu} from 'react-icons/gi'
import Avatar from '../Avatar'
import { useState } from 'react'
import NavItem from './NavItem'
import useRegisterModal from '@/hooks/useRegisterModal'
import useLoginModal from '@/hooks/useLoginModal'



type Props = {}

const UserMenu = (props: Props) => {


    const [isOpen, setIsOpen] = useState(false)

const registerModal = useRegisterModal()
const loginModal = useLoginModal()

  return (
    <div className="flex gap-4 items-center relative">
        <div className="py-2 px-4 border rounded-full hover:bg-gray-200 cursor-pointer duration-300 hidden lg:block">Airbnb your home</div>
        <div className="rounded-full border flex items-center gap-2 px-4 lg:py-2 py-4 shadow-sm hover:shadow-md duration-300 cursor-pointer "
        onClick={()=>setIsOpen(prev=>!prev)}
        >
<GiHamburgerMenu /> 
<Avatar />



        </div>
        {isOpen && (
    <div className='w-[40vw]
lg:w-3/4
shadow-md
rounded-lg
bg-white
absolute
top-14
right-0
p-2'>

<>
<NavItem onClick={loginModal.onOpen} label='Login'/>
<NavItem onClick={registerModal.onOpen} label='Sign up'/>

</>


</div>
)}
    </div>
  )
}

export default UserMenu