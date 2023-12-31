"use client";

import Modal from "./Modal";
import useRentModal from "@/hooks/useRentModat";
import { useState, useMemo } from "react";
import { categories } from "../Navbar/Categories";
import CategoryInput from "../CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "./Heading";
import CountrySelect from "../CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../Counter";
import ImageUpload from "../ImageUpload";
import Input from "../Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

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
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch('imageSrc')

  const Map = useMemo(
    () => dynamic(() => import("./Map"), { ssr: false }),
    [location]
  );

  const setCustomValues = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
  }

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

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
        <Heading
          title="  Which of these best desctibes your place?"
          description="Pick a category"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[50vh] overflow-y-auto py-4 gap-3">
          {categories.map((el) => (
            <CategoryInput
              key={el.label}
              label={el.label}
              Icon={el.Icon}
              selected={category === el.label}
              onClick={(category) => setCustomValues("category", category)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="space-y-3">
        <Heading
          title="Where is your place located"
          description="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValues("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Share some basics about your place"
          description="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => {
            setCustomValues("guestCount", value);
          }}
        />
        <hr/>
        <Counter
          title="Rooms"
          subtitle="How many Rooms do you have?"
          value={roomCount}
          onChange={(value) => {
            setCustomValues("roomCount", value);
          }}
        />
        <hr/>
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => {
            setCustomValues("bathroomCount", value);
          }}
        />
      </div>
    );
  }


  if (step === STEPS.IMAGES) {
bodyContent = (
  <div className="flex flex-col gap-4">
<Heading title="Add a photo of your place" description="Show guests what your place looks like!" />
<ImageUpload 
value={imageSrc}
onChange={(value)=>setCustomValues('imageSrc',value)}

/>
  </div>
)
  }


  if (step === STEPS.DESCRIPTION)  {
    bodyContent=(
      <div className="flex flex-col gap-4">
        <Heading
        title="How would you descripe your place?"
        description="Short and sweet works best"
        />

<Input
          register={register}
          id="title"
          type="text"
          label="Title"
          errors={errors}
          disabled={isLoading}
          required={true}
        />
        <hr/>
        <Input
          register={register}
          id="description"
          type="text"
          label="Description"
          errors={errors}
          disabled={isLoading}
          required={true}
        />
      </div>
    )
  }


  if (step === STEPS.PRICE) {
    bodyContent=(
      <div className="flex flex-col gap-4">
        <Heading 
        title="Now, set your price"
        description="How much do you charge per night?"
        />
              <Input
          register={register}
          id="price"
          type="number"
          label="Price"
          errors={errors}
          disabled={isLoading}
          required={true}
        />
      </div>
    )
  }

  const router = useRouter()

  const onSubmit :SubmitHandler<FieldValues> = (data)=>{

    if(step !== STEPS.PRICE) return onNext()

    setIsLoading(true)

    axios.post('/api/listings',data).then(()=>{
      toast.success('Listing Created')
      router.refresh()
      reset()
      setStep(STEPS.CATEGORY)
      rentModal.onClose()
    }).catch((error)=>{
      toast.error('Something went wrong')
      console.log(error)
    }).finally(()=>{
      setIsLoading(false)
    })
  }

  return (
    <Modal
      title="Airbnb is your home"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default RentModal;
