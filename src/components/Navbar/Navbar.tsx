'use client'
import Container from "../Container"
import Categories from "./Categories"
import Logo from "./Logo"
import Search from "./Search"
import UserMenu from "./UserMenu"
import { safeUser } from "@/types"
import {useEffect , useState} from 'react'


type Props = {currentUser?:safeUser | null}

const Navbar = ({currentUser}: Props) => {
console.log(currentUser)
const [scroll,setScroll] = useState(false)
useEffect(()=>{

  const scrollFunc = ()=>{
    setScroll(window.scrollY > 10)
  }

  window.addEventListener('scroll',scrollFunc)

  return ()=> window.removeEventListener('scroll',scrollFunc)
},[])

  return (
    <div className="fixed w-full bg-white  z-10  ">
      <div className="border-b py-4 shadow-sm">
        <Container>
            <div className="flex justify-between items-center gap-4 lg:gap-0">
<Logo />
<Search />
<UserMenu currentUser={ currentUser} />
            </div>
      
        </Container>
        </div>
        <div className={`${scroll && 'shadow-sm'} duration-300 shadow-neutral-400`}>     <Categories /></div>
   
    </div>
  )
}

export default Navbar