import axios from 'axios';
import { useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import mapboxgl, { MapOptions } from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import './App.css'

const fetchStatistics = async () => {
  const url = 'http://localhost:8787/XIT001?year=2024&area=31'; // TODO: local
  const { data } = await axios.get(url);
  return data;
}

const initCenter: [number, number] = [139.4534, 35.4548];
const initZoom = 9;
const options: MapOptions = {
  accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
  container: 'mapbox-conatainer',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: initCenter,
  zoom: initZoom,
};

function App() {
  const map = useRef<mapboxgl.Map | null>(null);

  // Initialize map
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map(options);

    const language = new MapboxLanguage();
    if (map) map.current.addControl(language);
  }, []);

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
      <div id="mapbox-conatainer"></div>
    </>
  )
}

export default App
