//Hook usado para filtrar arrays de datos

interface ResponseType<T> {
    dataArray: T[];
    key: keyof T;
    filterBy: any;
}
interface RangeResponseType<T> {
    dataArray: T[];
    key: keyof T;
    filterMin: any;
    filterMax: any;
}

const useFilter = () =>{
    const equalTo = <T>({dataArray, key, filterBy} :ResponseType<T>) : T[] => {
        return (dataArray.filter( data => data[key] === filterBy));
    }
    const moreThan = <T>({dataArray, key, filterBy} :ResponseType<T>) : T[] => {
        return (dataArray.filter( data => data[key] > filterBy));
    }
    const equalMoreThan = <T>({dataArray, key, filterBy} :ResponseType<T>) : T[] => {
        return (dataArray.filter( data => data[key] >= filterBy));
    }
    const lessThan = <T>({dataArray, key, filterBy} :ResponseType<T>) : T[] => {
        return (dataArray.filter( data => data[key] < filterBy));
    }
    const equalLessThan = <T>({dataArray, key, filterBy} :ResponseType<T>) : T[] => {
        return (dataArray.filter( data => data[key] <= filterBy));
    }
    const inRange = <T>({dataArray, key, filterMin, filterMax} :RangeResponseType<T>) : T[] => {
        return (dataArray.filter( (data) => data[key] <= filterMin && data[key] >= filterMax));
    }
    const byIndex = <T>({dataArray, filterBy} :ResponseType<T>) : T[] => {
        return (dataArray.filter( (_unused, i) => i === filterBy));
    }
    const lessThanIndex = <T>({dataArray, filterBy} :ResponseType<T>) : T[] => {
        return (dataArray.filter( (_unused, i) => i < filterBy));
    }
    const equalLessThanIndex = <T>({dataArray, filterBy} :ResponseType<T>) : T[] => {
        return (dataArray.filter( (_unused, i) => i <= filterBy));
    }
    const moreThanIndex = <T>({dataArray, filterBy} :ResponseType<T>) : T[] => {
        return (dataArray.filter( (_unused, i) => i > filterBy));
    }
    const equalMoreThanIndex = <T>({dataArray, filterBy} :ResponseType<T>) : T[] => {
        return (dataArray.filter( (_unused, i) => i >= filterBy));
    }
    const inIndexRange = <T>({dataArray, filterMin, filterMax} :RangeResponseType<T>) : T[] => {
        return (dataArray.filter( (_unused, i) => i <= filterMin && i >= filterMax));
    }

    return { 
        equalTo,
        moreThan, 
        equalMoreThan, 
        lessThan, 
        equalLessThan, 
        byIndex, 
        lessThanIndex,
        equalLessThanIndex,
        moreThanIndex,
        equalMoreThanIndex,
        inIndexRange, 
        inRange
    }
}

export default useFilter