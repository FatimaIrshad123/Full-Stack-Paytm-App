'use client'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef } from 'react'

const page = () => {
  const phone = useRef('');
  const password = useRef('');
  const router = useRouter();

  const handlePhoneChange = (e: any) => {
    let value = e.target.value;
    phone.current = value
  }

  const handlePasswordChange = (e: any) => {
    let value = e.target.value;
    password.current = value
  }

  const handleSubmit = async (e:any) => {
    try {
      const res = await signIn('credentials', {
        username: phone.current,
        password: password.current,
        redirect: false,
      });
      //redirect('/dashboard')
      router.push('/')
      console.log('res',res)
    }catch (error){
      console.log(error)
    }
    
  }
  return (
    <div>
      <input onChange={handlePhoneChange}/>
      <input onChange={handlePasswordChange} />
      <button onClick={handleSubmit}>Signin</button>
    </div>
  )
}

export default page
