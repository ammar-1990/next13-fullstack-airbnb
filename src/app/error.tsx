'use client'
import EmptyState from '@/components/EmptyState'
import { useEffect } from 'react'

type Props = {
    error:Error,

}

const error = ({error}: Props) => {

    useEffect(()=>{ console.log(error)},[error])
  return (
 <EmptyState title='Oops..' description='Somethins went wrong!' />
  )
}

export default error