export default function UpdateCart({ children, updatedValue = 0 }) {
   return (
      <div className="flex w-1/2 max-w-md select-none bg-secondary-orange h-9 cursor-pointer text-primary-bk font-medium items-center justify-center bottom-3 rounded-md shadow-lg">
         <p className="mr-4">{children}</p>
         {updatedValue > 0 && (
            <p className="text-sm font-bold rounded-full">R$ {updatedValue},00</p>
         )}
      </div>
   )
}