import { ApiService } from './../../services/ApiServiceExtensible/ApiService-Class';
import { useCallback, useState} from "react";


const useApiPost = <T>(endpoint:string, input:T) => {
    const [response, setResponse] = useState<T>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const postApiInput = useCallback(async() =>{
        setLoading(true);
        const apiService = new ApiService<T>(endpoint,true);

        try{
            const data = await apiService.post(input);
            setLoading(false);
            setResponse(data);
        }catch(e:any){
            setError(e?.message);
        }
    }, [endpoint, input])

    return{ response, loading, error, postData:postApiInput }
}

export default useApiPost;
