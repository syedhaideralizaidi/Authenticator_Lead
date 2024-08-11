'use client'
// import { getCookie } from 'cookies-next'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import session from "@/lib/session";

const inter = Inter({ subsets: ['latin'] })

export default function Home({children}) {
  const router = useRouter();
  useEffect(()=>{
    if(window.location) {
      if (!session.getToken()) {
        router.push('/login')
      } else {
        router.push('/dashboard')
      }
    }
  },[])
  return (
      <main className={inter.className}>
        {children}
      </main>
  )
}