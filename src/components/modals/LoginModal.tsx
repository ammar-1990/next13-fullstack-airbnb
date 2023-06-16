"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Modal from "./Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import axios from "axios";
import Input from "../Input";
import toast from "react-hot-toast";
import {useRouter} from 'next/navigation'

type Props = {};

const LoginModal = (props: Props) => {
  const { isOpen, onClose } = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    setIsLoading(true);
    signIn("credentials", { ...data, redirect: false }).then((clalback) => {
      setIsLoading(false);
      if(clalback?.ok){ toast.success('you are logged in')
    router.refresh()
    loginModal.onClose()
    }

    if(clalback?.error) {

        toast.error(clalback.error)
    }
    });
  };
  const bodyContent = (
    <div>
      <h1 className="text-xl font-semibold py-2">Welcome back</h1>
      <p className="text-gray-500 text-xs py-2">Login to your account!</p>
      <div className="space-y-2">
        <Input
          register={register}
          id="email"
          type="email"
          label="email"
          errors={errors}
          disabled={isLoading}
          required={true}
        />
        <Input
          register={register}
          id="password"
          type="password"
          label="password"
          errors={errors}
          disabled={isLoading}
          required={true}
        />
      </div>
    </div>
  );

  const footerContent = (
    <p className="text-neutral-500">
      Already have an account ?{" "}
      <span className="text-neutral-800 cursor-pointer" onClick={onClose}>
        Login
      </span>
    </p>
  );
const router = useRouter()
  return (
    <Modal
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      disabled={isLoading}
      title="Login"
      actionLabel="Continue"
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
