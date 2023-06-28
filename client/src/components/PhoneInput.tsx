import InputMask from "react-input-mask";

interface InputType {
   placeholder: string;
   setValue: Function;
   value: string
}

export default function PhoneInput({ placeholder, setValue, value }: InputType) {

   const handleSet = (event: any) => {
      setValue(event.target.value)
   }

   return (
      <div className="w-4/5 flex flex-col items-center justify-center border-light-gray-2 border-b-1/5 rounded-sm mb-3">
         <InputMask value={value} className="h-10 w-full flex pl-4 text-dark-gray" placeholder={placeholder} mask="(99) 99999-9999" onChange={handleSet} />
      </div>
   )
}