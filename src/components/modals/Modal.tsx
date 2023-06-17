"use client";

import { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryLabel?: string;
};

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryLabel,
}: Props) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-neutral-800/70 z-50 flex items-center justify-center">
        <form onSubmit={onSubmit}
          className={`w-full md:w-4/6 lg:w-3/6 xl:w-2/6 h-full my-6 mx-auto md:h-auto bg-white  shadow-md md:rounded-lg flex flex-col ${
            showModal
              ? "opacity-100 translate-y-0 "
              : "opacity-0 translate-y-full"
          } duration-300`}
        >
          <div className={`relative items-center justify-center flex border-b p-5 font-semibold`}>
            <span
              className="absolute  left-6 cursor-pointer"
              onClick={handleClose}
            >
              <AiOutlineClose />
            </span>
            {title}
          </div>

          <div className="py-9 px-5">
{body}
          </div>

         

          <button disabled={disabled} className="bg-rose-500 text-white rounded-md py-3 m-5 disabled:opacity-50 ">{actionLabel}</button>

          <div className="px-5 py-10 border-t">
            {footer}
            </div>
        </form>


        
      </div>
    </>
  );
};

export default Modal;
