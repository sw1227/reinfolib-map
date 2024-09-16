import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import './App.css'

const fetchStatistics = async () => {
  const url = 'http://localhost:8787/XIT001?year=2024&area=31'; // TODO: local
  const { data } = await axios.get(url);
  return data;
}

function App() {
  const { data, error, isLoading, refetch } = useQuery({ enabled: false, queryKey: ['statistics'], queryFn: fetchStatistics });

  const handleClick = () => {
    refetch();
    console.log('TODO: data:', data);
    if (error) {
      console.log('TODO: error:', error);
    }
  }

  return (
    <>
      <button onClick={handleClick}>Fetch</button>
      {isLoading ? <div>Loading...</div> : <div>Not Loading</div>}
      {data ? <div>{JSON.stringify(data?.status)}</div> : null}
    </>
  )
}

export default App
