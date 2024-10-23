import './App.css'
import { Sidebar } from "flowbite-react";
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/video');
        setVideos(response.data);
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
      <h1>App</h1>
      <div>
        {videos.length > 0 ? (
          videos.map((video) => (
            <div key={video.id} className="video-card">
              <h3>{video.title}</h3>
              <video src={`http://localhost:3000${video.path}`} width="500" height="auto" controls="controls">
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
