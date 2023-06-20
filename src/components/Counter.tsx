'use client'
import { useCallback } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";

type Props = {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
};

const Counter = ({ title, subtitle, value, onChange }: Props) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [value, onChange]);

  const onReduce = useCallback(() => {
    if (value === 1) return;

    onChange(value - 1);
  }, [value, onChange]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <p>{title}</p>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="w-12 h-12 flex items-center justify-center border rounded-full cursor-pointer hover:opacity-70 duration-300 border-neutral-400"
          onClick={onReduce}
          >
<AiOutlineMinus  size={16} />

          </span>
          <p className="font-light text-neutral-600 text-lg">{value}</p>
          <span className="w-12 h-12 flex items-center justify-center border rounded-full cursor-pointer hover:opacity-70 duration-300 border-neutral-400"
                onClick={onAdd}
          >
          <AiOutlinePlus  />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Counter;
