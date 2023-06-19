import React from "react";
import { IconType } from "react-icons/lib";

type Props = {
  label: string;
  Icon: IconType;
  selected: boolean;
  onClick: (category:string) => void;
};

const CategoryInput = ({ label, Icon, selected, onClick }: Props) => {
  return (
    <div
    onClick={()=>onClick(label)}
      className={`border-2 ${
        selected ? "border-black" : "border-neutral-200"
      } hover:border-black p-4 flex  flex-col gap-2 cursor-pointer duration-300 rounded-xl`}
    >
        <Icon size={30} />
        <span className="font-semibold">{label}</span>

    </div>
  );
};

export default CategoryInput;
