
import Navbar from '@/components/Navbar/Navbar'
import './globals.css'
import {Nunito} from 'next/font/google'
import Modal from '@/components/modals/Modal'
import RegisterModal from '@/components/modals/RegisterModal'
import ToasterProvider from '@/providers/ToasterProvider'
import LoginModal from '@/components/modals/LoginModal'
import { getSession } from '@/actions/getCurrentUser'


export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}


const font = Nunito({
  subsets:['latin']
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

const currentUser = await getSession()

  return (
    <html lang="en">
      <body className={font.className}>
        <RegisterModal   />
     <LoginModal />
        <Navbar currentUser={currentUser} />
        {children}
        <ToasterProvider />
        </body>
    </html>
  )
}
