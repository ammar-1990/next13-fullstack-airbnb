"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import axios from "axios";
import Input from "../Input";
import toast from 'react-hot-toast'

type Props = {};

const RegisterModal = (props: Props) => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => registerModal.onClose())
      .catch((error) => toast.error('Something went wrong'))
      .finally(() => setIsLoading(false));
  };
  const bodyContent = (
    <div>
      <h1 className="text-xl font-semibold py-2">Welcome to Airbnb</h1>
      <p className="text-gray-500 text-xs py-2">Create an account!</p>
      <div className="space-y-2">
      <Input register={register} id="email" type="email" label="email" errors={errors} disabled={isLoading} required={true}/>
      <Input register={register} id="name" type="name" label="name" errors={errors} disabled={isLoading} required={true}/>
      <Input register={register} id="password" type="password" label="password" errors={errors} disabled={isLoading} required={true}/>
      </div>
    </div>
  );


  const footerContent = <p className="text-neutral-500">Already have an account ?  <span className="text-neutral-800 cursor-pointer" onClick={registerModal.onClose}>Login</span></p>

  return (
    <Modal
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      disabled={isLoading}
      title="Register"
      actionLabel="Continue"
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
