import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// import { db } from "../appwrite/database";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { databases } from "../appwrite/config";
import { ID } from "appwrite";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().min(1, "Age must be at least 1"),
  email: z.string().email("Invalid email address"),
});

interface FormData {
  name: string;
  age: number;
  email: string;
}

const FormPage = () => {
  const [isError,setIsError]=useState(false)
  const [isLoading,setIsLoading]=useState(false)
  // const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function postData(data:FormData){
    try {
      setIsLoading(true)
        await databases.createDocument(
        import.meta.env.VITE_PUBLIC_DATABASE_ID,
        import.meta.env.VITE_PUBLIC_COLLECTION_ID_USER,
        ID.unique(),
        data
      )
      reset()
      // navigate('/show') 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      setIsError(true)
      console.log(error);
      
    }finally{
      setIsLoading(false)
    }
  }

  const onSubmit = (data: FormData) => {
    console.log(data);
    postData(data)
    
    // reset()
  };

  return (
    <div className="max-w-4xl min-h-screen p-4 mx-auto space-y-4 text-center">
      <h2 className="text-2xl font-medium text-center">User Form</h2>
      {isError && (
        <span className="text-sm text-red-600">Something went wrong Resubmit data</span>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center max-w-xl gap-2 p-4 mx-auto border rounded-md"
      >
        <label className="flex flex-col items-start gap-1">
          <span className="block font-medium text-left opacity-80">UserName</span>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full p-1 text-black border-none rounded outline-none placeholder:text-stone-800 bg-stone-400"
            {...register("name")}
          />
          {errors.name?.message && (
          <span className="text-sm text-red-600 ">{errors.name.message}</span>
        )}
        </label>
        

        <label className="flex flex-col items-start gap-1">
          <span className="block font-medium text-left opacity-80">Age</span>
          <input
            type="number"
            placeholder="Enter your age"
            className="w-full p-1 text-black border-none rounded outline-none placeholder:text-stone-800 bg-stone-400"
            {...register("age", { valueAsNumber: true })}
          />
          {errors.age?.message && (
          <span className="text-sm text-red-600">{errors.age.message}</span>
        )}
        </label>
        

        <label className="flex flex-col items-start gap-1">
          <span className="block font-medium text-left opacity-80">Email</span>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-1 text-black border-none rounded outline-none placeholder:text-stone-800 bg-stone-400"
            {...register("email")}
          />
          {errors.email?.message && (
          <span className="text-sm text-red-600">{errors.email.message}</span>
        )}
        </label>
        

        <button className="flex justify-center w-full gap-2 p-1 px-2 mx-auto mt-2 bg-blue-500 rounded hover:bg-blue-600"
        disabled={isLoading}
        >
        {isLoading && (<LoaderCircle className="animate-spin" />)}
          Submit
        </button>
      </form>
      <p>
        To see user profile{" "}
        <Link
          to={"/show"}
          className="underline decoration-2 decoration-indigo-500 underline-offset-4"
        >
          
          Click Here
        </Link>
      </p>
    </div>
  );
};

export default FormPage;




// import z from 'zod'
// import {zodResolver} from '@hookform/resolvers/zod'
// import { useForm } from 'react-hook-form' 
// import { Link } from 'react-router-dom'

// const schema = z.object({
//   name: z.string().min(1, "Name is required"),
//   age: z.number().min(1, "Age must be at least 1"),
//   email: z.string().email("Invalid email address")
// });
// interface FormData{
//   name:string,
//   age:number,
//   email:string
// }
// // type FormData = 

// const FormPage = () => {
//   const {register,handleSubmit,formState:{errors}} = useForm({
//     resolver:zodResolver(schema)
//   })
  
//   const onSubmit = (data:FormData)=>{
//     console.log(data)
//   }
//   return (
//     <div className="max-w-4xl p-4 mx-auto space-y-4 text-center">
//       <h2 className="text-2xl font-medium text-center">User Form</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center max-w-xl gap-6 p-4 mx-auto border rounded-md">
//         <label>
//           <span className="block font-medium text-left opacity-80">UserName</span>
//           <input
//             type="text"
//             placeholder="Enter your name"
//             className="w-full p-1 text-black border-none rounded outline-none placeholder:text-stone-800 bg-stone-400"
//             {...register("name")}
//           />
//           {errors.name?.message && (
//             <span className="text-sm text-red-600">{errors.name?.message}</span>
//           )}
//         </label>
        
//         <label>
//           <span className="block font-medium text-left opacity-80">Age</span>
//           <input
//             type="number"
//             placeholder="Enter your age"
//             className="w-full p-1 text-black border-none rounded outline-none placeholder:text-stone-800 bg-stone-400"
//             {...register("age", { valueAsNumber: true })}
//           />
//           {errors.age?.message && (
//             <span className="text-sm text-red-600">{errors.age?.message}</span>
//           )}
//         </label>
        
//         <label>
//           <span className="block font-medium text-left opacity-80">Email</span>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="w-full p-1 text-black border-none rounded outline-none placeholder:text-stone-800 bg-stone-400"
//             {...register("email")}
//           />
//           {errors.email?.message && (
//             <span className="text-sm text-red-600">{errors.email?.message}</span>
//           )}
//         </label>
        
//         <button className="block w-full p-1 px-2 mx-auto bg-blue-500 rounded hover:bg-blue-600">
//           Submit
//         </button>
//       </form>
//       <p>
//         To see user profile{" "}
//         <Link
//           to={"/show"}
//           className="underline decoration-2 decoration-indigo-500 underline-offset-4"
//         >
//           Click Here
//         </Link>
//       </p>
      
//     </div>
//   )
// }

// export default FormPage