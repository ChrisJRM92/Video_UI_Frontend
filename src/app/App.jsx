import './App.css'
import { Sidebar } from "flowbite-react";
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const IPLOCAL = import.meta.env.VITE_IPV4;
  const PORT = import.meta.env.VITE_SERVERPORT;

  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${IPLOCAL}:${PORT}/api/v1/video`);
        setVideos(response.data.videos || []);
      } catch (error) {
        console.error('Error al obtener los videos:', error);
      }
    };

    fetchVideos();
  }, []);

  console.log(videos)
  // http://localhost:3000/uploads/videoplayback.mp4
  return (
    <>
      <h1>App mis curso</h1>
      <div>
        {videos.length > 0 ? (
          videos.map((video) => (
            <div key={video.id} className="video-card">
              <h3>{video.title}</h3>
              <video
                src={`${IPLOCAL}:${PORT}${video.path}`}
                width="500"
                height="auto"
                controls
              >
                Tu navegador no soporta la reproducción de video.
              </video>
            </div>
          ))
        ) : (
          <p>No hay videos disponibles</p>
        )}
      </div>
    </>
  )
}

export default App
