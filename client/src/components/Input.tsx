interface InputType {
   placeholder: string;
   setValue: Function;
}

export default function Input({ placeholder, setValue }: InputType) {

   return (
      <div className="w-3/4 flex flex-col items-center border-light-gray-2 border-b-1/5 rounded-sm mb-3">
         <input onChange={(event: any) => { setValue(event?.target.value) }} className="h-9 p-4  w-full  text-dark-gray" type="text" placeholder={placeholder} />
      </div>
   )
}