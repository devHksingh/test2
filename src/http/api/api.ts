import axios from "axios"

const imgQuery = axios.create({
    baseURL:'https://api.unsplash.com',
    
})
// https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${Access_Key}
export const getSearchImg= async(query:string,perPage=5)=>{
    const res = await imgQuery.get("/search/photos",{
        params:{query,per_page:perPage,orientation:"landscape",client_id:`${import.meta.env.VITE_PUBLIC_IMG_ID}`}
    })
    return res.data.results
}