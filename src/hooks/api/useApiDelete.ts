import { ApiService } from './../../services/ApiServiceExtensible/ApiService-Class';
import { useCallback, useState} from "react";

const useApiDelete = <T>(endpoint:string) => {
    const [response, setResponse] = useState<T>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const deleteApiResponse = useCallback(async() =>{
        setLoading(true);
        const apiService = new ApiService<T>(endpoint,true);
        try{
            const data = await apiService.get();
            setLoading(false);
            setResponse(data);
        }catch(e:any){
            setError(e?.message);
        }
    }, [endpoint])

    return{ response, loading, error, deleteData:deleteApiResponse }
}

export default useApiDelete;