'use client'
import { Button } from '@repo/ui/button'
import { Card } from '@repo/ui/card'
import { TextInput } from '@repo/ui/textinput'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion';


const page = () => {
  let [phone, setPhone] = useState('');
  let [password, setPassword] = useState('')
  //const phone = useRef('');
  //const password = useRef('');
  const router = useRouter();

  const handlePhoneChange = (e: any) => {
    console.log('eeeeeeeeeeeeeeee',e.value)
    let value = e.target.value;
    setPhone(e.target.value)
    console.log('value',value)
    //phone.current = value;
    console.log('phone.current',phone)
  }

  const handlePasswordChange = (e: any) => {
    let value = e.target.value;
    setPassword(e.target.value);
    console.log('password',password)
  }

  const handleSubmit = async (e:any) => {
    try {
      const res = await signIn('credentials', {
        phone: phone,
        password: password,
      });
      router.push('/')
      console.log('res',res)
    }catch (error){
      console.log(error)
    }
    
  }
  return (
    <section className="wrapper relative flex min-h-screen items-center justify-center overflow-hidden antialiased">
      <Card title='Signin'>
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
            type: 'spring',
            damping: 10,
          }}
          className="flex w-full flex-col justify-between gap-12 rounded-2xl bg-primary/5 p-8 sm:max-w-[26rem]"
        >
          <div className="flex flex-col text-center">
            <h2 className="text-3xl font-semibold tracking-tighter xl:text-4xl">
              Welcome to{' '}
              <span className="bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text pr-1 font-black tracking-tighter text-transparent">
                Paytm
              </span>
            </h2>
            <p className="text-lg font-medium tracking-tighter text-primary/75 md:text-xl">
              Log in to access your account!
            </p>
          </div>
          <div className="flex flex-col gap-8">
            <div className="grid w-full items-center gap-4">
              <TextInput placeholder={'Phone Number'} label={'Phone'} onChange={handlePhoneChange}/>
              <TextInput placeholder={'Password'} label={'Password'} onChange={handlePasswordChange}/>
            </div>
            <button onClick={handleSubmit} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Signin</button>
          </div>
      </motion.div>
      </Card>
    </section>
  )
}

export default page
