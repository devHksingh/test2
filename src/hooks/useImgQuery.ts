import { useQuery } from "@tanstack/react-query"
import { getSearchImg } from "../http/api/api"

const useImgQuery = (query: string, page: number) => {
    const { data, isError, isLoading,isSuccess } = useQuery({
        queryKey: ["img",query, page],
        queryFn: () => getSearchImg(query, page),
        staleTime: 8*60 * 1000,
        refetchIntervalInBackground:true,
        // Prevents unnecessary API calls when switching tabs or reloading
        refetchOnWindowFocus: false,
        refetchOnMount: false
    })
    return { data, isError, isLoading,isSuccess }
    // data, isError, isLoading,refetch
}

export default useImgQuery