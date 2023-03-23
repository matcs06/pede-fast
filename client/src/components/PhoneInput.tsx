import InputMask from "react-input-mask";

interface InputType {
   placeholder: string;
   setValue: Function;
}

export default function PhoneInput({ placeholder, setValue }: InputType) {

   const handleSet = (event: any) => {
      setValue(event.target.value)
      console.log(event.target.value)
   }

   return (
      <div className="w-3/4 flex flex-col items-center justify-center border-light-gray-2 border-b-1/5 rounded-sm mb-3">
         <InputMask className="h-9 w-full flex pl-4 text-dark-gray" placeholder={placeholder} mask="(99) 99999-9999" onChange={handleSet} />
      </div>
   )
}