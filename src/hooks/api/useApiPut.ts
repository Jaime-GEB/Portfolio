import { ApiService } from './../../services/ApiServiceExtensible/ApiService-Class';
import { useCallback, useState} from "react";


const useApiPut = <T>(endpoint:string, input:T) => {
    const [response, setResponse] = useState<T>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const putApiInput = useCallback(async() =>{
        setLoading(true);
        const apiService = new ApiService<T>(endpoint,true);

        try{
            const data = await apiService.put(input);
            setLoading(false);
            setResponse(data);
        }catch(e:any){
            setError(e?.message);
        }
    }, [endpoint, input])

    return{ response, loading, error, putData:putApiInput }
}
export default useApiPut;