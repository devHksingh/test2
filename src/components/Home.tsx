import {   ArrowLeftCircle, ArrowRightCircle, CircleX, SearchIcon } from "lucide-react"
import {  useCallback, useEffect, useState } from "react"
import useImgQuery from "../hooks/useImgQuery"


const Home = () => {
  const [searchQuery,setSearchQuery] = useState("space")
  const [isClick,setIsClick] = useState(false)
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [imgData,setImgData]= useState<{ imgSrc: string; description: string }[]>([])
  const [currectIndex,setCurrentIndex] = useState(0)
  const {data,isError,isLoading}= useImgQuery(debouncedQuery,5)
  const handleSearch  = (e:React.ChangeEvent<HTMLInputElement>)=>{
      setSearchQuery(e.target.value)
  }
  // debounce
  useEffect(()=>{
    const interval = setTimeout(()=>{
      if (searchQuery && (searchQuery !== debouncedQuery)) {
        setImgData([])
        setDebouncedQuery(searchQuery);
      }
    },800)
    return ()=>clearTimeout (interval)
  },[debouncedQuery, searchQuery])
  useEffect(()=>{
    if(!data || !Array.isArray(data)) return
    const transformedImgData = data.map((element)=>{
      return {
        imgSrc: element.urls.full,
        description: element.alt_description,
      }
    })
    setImgData(transformedImgData)
  },[data])
  const handleNextIndex = useCallback(()=>{
    if(imgData.length>0){
      setCurrentIndex((prevIndex)=>(prevIndex+1)%imgData.length)
    }
  },[imgData])

  const handlePrevIndex =()=>{
    if(data){
      setCurrentIndex((prevIndex)=>(prevIndex ===0? data.length-1:prevIndex-1))
    }
  }

  // carasole
  useEffect(()=>{
    const timer = setInterval(()=>{
      handleNextIndex()
    },4000)
    return ()=>clearInterval(timer)
  },[handleNextIndex])

  

  // bg-surface-tonal-a50
  if(isError){
    return (
      <div className="flex items-center justify-center min-h-screen p-2">
        <div className="flex items-center justify-center gap-2 p-2 bg-red-200 rounded-lg">
          <CircleX className="text-red-600" />
          <div className="bg-red-200">
            <h1 className="text-lg font-medium text-red-600">Error</h1>
            <p className="text-black">Error occured while fetching image details</p>
          </div>
          </div>
      </div>
    )
    
  }
  console.log(data);
  
  
  // if(data){
  //   console.log(typeof(data))
  //   data.forEach((element)=>{
  //     console.log(element.alt_description)
  //     console.log(element.urls.regular)
  //     const imgDetails ={
  //       imgSrc:element.urls.regular,
  //       description:element.alt_description
  //     }
  //     setImgData((prev)=>{
  //       return {...prev,imgDetails}
  //     })
  //   })
  // }
  
  return (
    <div className="h-screen bg-gradient-to-br from-blue-700 to-purple-700">
      <div className="mb-4 "><h1 className="text-2xl font-bold text-center text-white">Search Img</h1></div>
      
      <div className="flex justify-center ">
        <div className={`border transition-all duration-300 rounded-md  ${isClick?`w-[80%]`:`w-[40%]`}`} onClick={()=>setIsClick(!isClick)}>
          <label className="relative flex items-center px-2 py-1 "
          onClick={()=>setIsClick(!isClick)}
          >
            <span className=""><SearchIcon className="text-red-200" /></span>
            <input type="search" 
            placeholder="Enter search topic"
            className="w-full px-2 py-1 text-lg font-normal capitalize bg-transparent outline-none text-stone-200"
            value={searchQuery}
            onChange={(e)=>handleSearch (e)}
            />
          </label>
          
        </div>
        
      </div>
      
      {/* img */}
      {/* <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {imgData.map((img, index) => (
          <div key={index} className="p-4 bg-gray-900 rounded-lg">
            <img
              src={img.imgSrc}
              alt={img.description}
              className="w-full h-auto rounded-md"
            />
            <p className="mt-2 text-sm text-white">{img.description}</p>
          </div>
        ))}
      </div> */}
      <div className="w-full mx-auto md:w-[88%] lg:w-[64%]">
        {
          isLoading?<div className="w-full h-full bg-stone-400 animate-pulse"></div>:null
        }
        {imgData && (
        <div className="flex items-center  max-w-[86%] justify-center h-full mx-auto">
          <button onClick={handlePrevIndex}><ArrowLeftCircle size={40} className="text-stone-500 hover:text-stone-400"/></button>
            <div className="w-full h-auto ">
              <div className="w-full p-4">
                <img src={`${imgData[currectIndex]?.imgSrc}`} alt={imgData[currectIndex]?.description} 
                className="object-cover  max-w-[100%] rounded-md"
                />
              </div>
            <p className="mt-1 text-sm text-center text-white capitalize">{imgData[currectIndex]?.description}</p>
          </div>
          <button onClick={handleNextIndex}><ArrowRightCircle size={40} className="text-stone-500 hover:text-stone-400"/></button>
        </div>
          )}
        
      </div>
    </div>
  )
}

export default Home