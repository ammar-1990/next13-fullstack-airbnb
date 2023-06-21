import Container from '@/components/Container'
import EmptyState from '@/components/EmptyState'
import Image from 'next/image'

export default function Home() {
const isEmpty = true


if(isEmpty) return <EmptyState  showReset/>

  return (
   <div className=''>

    <Container>
      <div className='
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      gap-8
      '>
<div>my feature listings</div>
      </div>
    </Container>
   </div>
  )
}
