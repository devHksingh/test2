import { useEffect, useState } from "react"
import { databases } from "../appwrite/config"
import { useNavigate } from "react-router-dom"
// import { db } from "../appwrite/database"
// import useFormDataQuery from "../hooks/useFormDataQuery"


export interface Person{
  $id:string,
name:string,
email:string,
age:number
}

const ShowPage = () => {
  const [userData,setUserData]=useState<Person[]>([])
  const [isLoading,setIsLoading] = useState(false)
  const [isError,setIsError] = useState(false)
  const [errorMsg,setErrorMsg] = useState("")
  const navigate = useNavigate()
  const init = async ()=>{
    
      
    try {
      setIsLoading(true)
      const response = await databases.listDocuments(
        // require dbid collectionid
        // 
        import.meta.env.VITE_PUBLIC_DATABASE_ID,
        import.meta.env.VITE_PUBLIC_COLLECTION_ID_USER 
      )
      const formatedResponse = response.documents.map((doc)=>({
      $id:doc.$id,
      name:doc.name,
      email:doc.email,
      age:doc.age
    }))
    setUserData(formatedResponse)
    } catch (err:unknown) {
      setIsError(true)
      setErrorMsg("Error occured while fetching data.")
      console.log(err)
    }finally{
      setIsLoading(false)
    }
  }
  
  useEffect(()=>{init()},[])

  const handleDeleteBtn=async(id:string)=>{
     try {
      await databases.deleteDocument(
       import.meta.env.VITE_PUBLIC_DATABASE_ID,
       import.meta.env.VITE_PUBLIC_COLLECTION_ID_USER,
       id
     )
     
     setUserData([])
     init()
     } catch (error:unknown) {
      setIsError(true)
      setErrorMsg("Unable to delete userData .try it again!")
      console.log(error)
     }
  }
  const handleUpdate =(id:string)=>{
    navigate(`/update/${id}`)
  }
  return (
    <div className="w-full min-h-screen p-2">
      <h1 className="text-2xl font-semibold text-center">ShowPage</h1>
      {
        isError && (
          <div className="w-full">
            <p className="text-center ">{errorMsg}</p>
          </div>
        )
      }
      {
          isLoading && (
            <div className="grid items-center grid-cols-1 gap-6 mt-4 md:grid-cols-4">
              <div className="w-full h-[8rem] p-2 rounded-md shadow bg-stone-600 animate-pulse">
                
              </div>
              <div className="w-full h-[8rem] p-2 rounded-md shadow bg-stone-600 animate-pulse">
                
              </div>
              <div className="w-full h-[8rem] p-2 rounded-md shadow bg-stone-600 animate-pulse">
                
              </div>
              <div className="w-full h-[8rem] p-2 rounded-md shadow bg-stone-600 animate-pulse">
                
              </div>
              
            </div>
          )
        }
      <div className="grid items-center grid-cols-1 gap-6 mt-4 md:grid-cols-4">

      {userData && userData.map((item)=>(
        <div key={item.$id} className="flex flex-col justify-center p-4 rounded-md bg-surface-tonal-a10">
            <p className="capitalize">Name: {item.name}</p>
            <p>Email: {item.email}</p>
            <p>Age: {item.age}</p>
            <div className="flex gap-4 mt-2">
              <button className="px-2 py-0.5 bg-sky-600 rounded-md hover:bg-sky-800"
              onClick={()=>handleUpdate(item.$id)}
              >Update</button>
              <button className="px-2 py-0.5 bg-red-600 rounded-md hover:bg-red-800"
              onClick={()=>handleDeleteBtn(item.$id)}
              >Delete</button>
            </div>
        </div>
      ))}
        
      </div>
    </div>
  )
}

export default ShowPage