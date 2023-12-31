"use client";
import React, { useCallback, useState } from "react";


import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast/headless";
import Button from "../Button";
import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";

const LoginModal = () => {
  
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  const toogle = useCallback(()=>{
      loginModal.onClose(),
      registerModal.onOpen()
  },[loginModal,registerModal])

  const {
    register,   
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data:any) => {
    setIsLoading(true);

    signIn('credentials',{
        ...data,
        redirect:false,
        
    }).then((callback)=>{
        setIsLoading(false)

        if(callback?.ok){
            toast.success('Logged in!')
            router.refresh()
            loginModal.onClose()
        }
        if(callback?.error){
            toast.error(callback.error)
        }
    })
  };

  const bodyContent = (
    <div className=" flex flex-col gap-4">
      <Heading title="Welcome back to Airbnb!" subtitle="Login to your account" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
       <hr />
    
         <Button
         outline
         label="Continue with GitHub"
         icon={AiFillGithub}
         onClick={()=>{signIn('github')}}
         />
         <Button
         outline
         label="Continue with Google"
         icon={FcGoogle}
         onClick={()=>{signIn('google')}}
         />
        <div 
         className="
          text-neutral-500
          text-center
          mt-4
          font-light
         "
        >
         <div className=" flex flex-row items-center">
            <div>
              First time using Airbnb?
            </div>
            <div
            onClick={toogle} 
            className=" text-neutral-800 cursor-pointer hover:underline">
             Sign Up
            </div>

        </div>   
        </div> 
    </div>
  )
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Login"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
