import {useState, useEffect} from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error,setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, {signal: abortCont.signal})
            .then((getData) => {
                if(!getData.ok){
                    throw Error('Could not fetch data');
                }
                return getData.json();
            })
            .then((data) => {
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch((err) => {
                if(err.name !== 'AbortError'){
                    setIsPending(false);
                    setError(err.message);
                }            
            })
        return () => abortCont.abort();
        }, 100);
    },[url]);

    return {data, isPending, error};
}

export default useFetch;