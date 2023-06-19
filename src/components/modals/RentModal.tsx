"use client";

import Modal from "./Modal";
import useRentModal from "@/hooks/useRentModat";
import { useState, useMemo } from "react";
import { categories } from "../Navbar/Categories";
import CategoryInput from "../CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import Heading from "./Heading";
import CountrySelect from "../CountrySelect";
import dynamic from "next/dynamic";

type Props = {};

const RentModal = (props: Props) => {
  const {
    register,
    reset,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<FieldValues>({
    defaultValues:{
        category:'',
        location:null,
        guestCount:1,
        roomCount:1,
        bathroomCount:1,
        imageSrc:'',
        price:1,
        title:'',
        description:''
    }
  });

  const category = watch('category')
  const location = watch('location')


  const Map = useMemo(()=>dynamic(()=>import('./Map'),{ssr:false}),[location])

  const setCustomValues = (id:string,value:any)=>{
    setValue(id,value,{
        shouldValidate:true,
        shouldDirty:true,
        shouldTouch:true,
    })
  }


  enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
  }

  const [step, setStep] = useState(STEPS.CATEGORY);

  const onBack = () => setStep((prev) => prev - 1);
  const onNext = () => setStep((prev) => prev + 1);
  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) return "Create";
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined;
    return "Back";
  }, [step]);
  const rentModal = useRentModal();

  let bodyContent = (
    <div className="flex flex-col gap-6">
      <div>
        <Heading title="  Which of these best desctibes your place?" description="Pick a category" /> 
        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[50vh] overflow-y-auto py-4 gap-3">
          {categories.map((el) => (
            <CategoryInput
              key={el.label}
              label={el.label}
              Icon={el.Icon}
              selected={category === el.label}
              onClick={(category) => setCustomValues('category',category)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  if(step === STEPS.LOCATION){
    bodyContent = (
        <div className="space-y-3">
            
                <Heading title="Where is your place located" description="Help guests find you!" />
                <CountrySelect
                value={location}
                onChange={(value)=>setCustomValues('location',value)}
                />
                <Map center={location?.latlng}/>
             
        
        </div>
    )
  }


  if(step === STEPS.INFO)
  {
    bodyContent = (
      <div>
        info
      </div>
    )
  }

  return (
    <Modal
      title="Airbnb is your home"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default RentModal;
