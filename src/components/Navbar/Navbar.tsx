
import Container from "../Container"
import Logo from "./Logo"
import Search from "./Search"
import UserMenu from "./UserMenu"


type Props = {}

const Navbar = (props: Props) => {
  return (
    <div className="fixed w-full bg-white shadow-sm z-10  py-4 border-b">
        <Container>
            <div className="flex justify-between items-center gap-4 lg:gap-0">
<Logo />
<Search />
<UserMenu />
            </div>
      
        </Container>
    </div>
  )
}

export default Navbar