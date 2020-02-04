import { useState, useEffect } from "react";

const FetchData = ({ url, processData, onChange }) =>
{
  const [state, setState] = useState({
    loading: false,
    error: undefined,
    data: {}
  });

  useEffect(() =>
  {
    onChange(state);
  }, [onChange, state]);

  useEffect(() =>
  {
    const fetchData = async () =>
    {
      setState({
        loading: true,
        error: undefined,
        data: {}
      });
      
      try {
        const res = await fetch(url);
        const data = await res.json();
        
        setState({
          loading: false,
          error: undefined,
          data: processData ? processData(data) : data
        });
      } 
      catch (error) 
      {
        setState({
          loading: false,
          error,
          data: {}
        });
      } 
    }

    fetchData();
  }, [url]);

  return null;
}

export default FetchData;