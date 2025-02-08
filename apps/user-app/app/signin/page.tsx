'use client'
import { TextInput } from '@repo/ui/textinput'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { motion } from 'framer-motion';

const page = () => {
  let [phone, setPhone] = useState('');
  let [password, setPassword] = useState('')
  const router = useRouter();

  const handlePhoneChange = (e: any) => {
    setPhone(e.target.value)
  }

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e:any) => {
    try {
      const res = await signIn('credentials', {
        phone: phone,
        password: password,
        redirect:false
      });
      console.log('res',res)
      router.push('/')
    }catch (error){
      console.log(error)
    }
    
  }
  return (
    <div className="bg-gradient-to-r from-emerald-600 to-teal-800 relative overflow-hidden p-8 rounded-lg shadow-xl">
      <section className="wrapper relative flex min-h-screen items-center justify-center overflow-hidden antialiased">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full transform -translate-x-1/2 translate-y-1/2" />
        <div className="bg-white rounded-lg shadow-lg p-5 relative z-10">
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
              type: 'spring',
              damping: 10,
            }}
            className="flex w-full flex-col justify-between gap-12 rounded-2xl bg-white p-8 sm:max-w-[26rem]"
          >
            <div className="flex flex-col text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-75"></span>
                  <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse delay-150"></span>
                </div>
              </div>
              
              <h1 className="text-4xl font-bold mb-2 tracking-tight text-teal-800 bg-clip-text text-transparent">
                Welcome to SecurePay
              </h1>
              <p className="bg-gradient-to-r from-emerald-400 to-teal-800 bg-clip-text text-transparent text-lg font-bold">
                Log in to access your account and manage your transactions securely
              </p>
            </div>

            <div className="flex flex-col gap-8">
              <div className="grid w-full items-center gap-4">
                <TextInput 
                  placeholder="22222222" 
                  label="Phone" 
                  onChange={handlePhoneChange}
                />
                <TextInput 
                  placeholder="••••••••" 
                  label="Password" 
                  onChange={handlePasswordChange}
                />
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 text-gray-600">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-emerald-600 hover:text-emerald-500">
                  Forgot password?
                </a>
              </div>

              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-emerald-600 to-teal-800 text-white py-2.5 px-5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign in
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                Phone: 2222222222
                Password: bob
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default page