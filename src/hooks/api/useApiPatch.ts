import { ApiService } from './../../services/ApiServiceExtensible/ApiService-Class';
import { useCallback, useState} from "react";

const useApiPatch = <T>(endpoint:string, input:T) => {
    const [response, setResponse] = useState<T>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const patchApiInput = useCallback(async() =>{
        setLoading(true);
        const apiService = new ApiService<T>(endpoint,true);

        try{
            const data = await apiService.patch(input);
            setLoading(false);
            setResponse(data);
        }catch(e:any){
            setError(e?.message);
        }
    }, [endpoint, input])

    return{ response, loading, error, patchData:patchApiInput }
}

export default useApiPatch;