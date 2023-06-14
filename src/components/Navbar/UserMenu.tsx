'use client'

import {GiHamburgerMenu} from 'react-icons/gi'
import Avatar from '../Avatar'



type Props = {}

const UserMenu = (props: Props) => {
  return (
    <div className="flex gap-4 items-center">
        <div className="py-2 px-4 border rounded-full hover:bg-gray-200 cursor-pointer duration-300 hidden lg:block">Airbnb your home</div>
        <div className="rounded-full border flex items-center gap-2 px-4 lg:py-2 py-4 shadow-sm hover:shadow-md duration-300 cursor-pointer">
<GiHamburgerMenu /> 
<Avatar />
        </div>
    </div>
  )
}

export default UserMenu