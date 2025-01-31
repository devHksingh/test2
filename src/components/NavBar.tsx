import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"


const NavBar = () => {
  const [isOn, setIsOn] = useState(false);
  const [theme,setTheme]=useState("")
  useEffect(()=>{
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    if(isDark){
      setTheme("dark")
      setIsOn(false)
      localStorage.setItem("theme","dark")
      document.body.classList.add("dark")
    }else{
      setTheme("light")
      setIsOn(true)
      localStorage.setItem("theme","light")
      document.body.classList.add("light")
    }
  },[])
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(isOn ? "light" : "dark");
    localStorage.setItem("theme", isOn ? "light" : "dark");
    setTheme(isOn ? "light" : "dark");
  }, [isOn]);
  return (
    <nav className="sticky bottom-0 flex items-center justify-around w-full p-4 bg-stone-600 bg-surface-tonal-a0" >
      <ul className="flex justify-center w-3/4 gap-12">
        <li><NavLink to="" className={({isActive})=>`text-primary-a10 font-medium text-lg hover:text-primary-a50 ${isActive?` border-b-2 border-orange-400 pb-0.5 `:``}`}>Home</NavLink></li>
        <li><NavLink to="/form" className={({isActive})=>`text-primary-a40 font-medium text-lg hover:text-primary-a50 ${isActive?`border-b-2 border-orange-400 pb-0.5`:``}`}>Form</NavLink></li>
        <li><NavLink to="/show" className={({isActive})=>`text-primary-a40 font-medium text-lg hover:text-primary-a50 ${isActive?`border-b-2 border-orange-400 pb-0.5`:``}`}>Show</NavLink> </li>
        {/* <li><NavLink to="/login" className={({isActive})=>`text-primary-a40 font-medium text-lg hover:text-primary-a50 ${isActive?`border-b-2 border-orange-400 pb-0.5`:``}`}>Login</NavLink></li> */}
        
      </ul>
      
      <div className="flex items-center">
        {/* container */}
        <div
        className={`w-16 h-7 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-all ${
          isOn ? "bg-yellow-800" : "bg-gray-600"
        }`}
        onClick={() => setIsOn(!isOn)}
      >
          <SunIcon className="w-6 h-4 text-white transition-all"/>
          <div className={`w-8 h-6 transition-all transform bg-white rounded-full ${isOn?`translate-x-5`:`translate-x-[-19px]`}`}></div>
          <MoonIcon className="w-6 h-4 text-white transition-all"/>
          
        </div>
        {/* Label */}
      <span className={`ml-3  capitalize transition-all text-sm`}>{theme} Mode
      </span>
      </div>
    
    </nav>
  )
}

export default NavBar

/*

*/ 