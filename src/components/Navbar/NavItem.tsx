'use client'

type Props = {
    onClick:()=>void,
    label:string
}

const NavItem = ({onClick,label}: Props) => {
  return (
    <div className='p-4 cursor-pointer hover:bg-gray-200 duration-300 rounded-lg' onClick={onClick}>{label}</div>
  )
}

export default NavItem