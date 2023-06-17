'use client'
import Container from "../Container"
import Categories from "./Categories"
import Logo from "./Logo"
import Search from "./Search"
import UserMenu from "./UserMenu"
import { safeUser } from "@/types"


type Props = {currentUser?:safeUser | null}

const Navbar = ({currentUser}: Props) => {
console.log(currentUser)
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
        <Categories />
    </div>
  )
}

export default Navbar