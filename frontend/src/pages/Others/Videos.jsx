import { useEffect } from 'react';
import video1 from '../../assets/videos/MK - LOGOS.mp4';
import video2 from '../../assets/videos/MK - HOJAS MEMBRETADAS.mp4';
import video3 from '../../assets/videos/MK - TARJETA HORIZONTAL.mp4';
import video4 from '../../assets/videos/MK - TARJETA VERTICAL.mp4';

const listaDeVideos = [
  { id: 1, titulo: 'Video Logos', url: video1 },
  { id: 2, titulo: 'Video Hojas membretadas', url: video2 },
  { id: 3, titulo: 'Video Tarjeta Horizontal', url: video3 },
  { id: 4, titulo: 'Video Tarjeta Vertical', url: video4 },
];

function OtrosVideos() {
  useEffect(() => {
    const backgroundAudio = document.getElementById('background-music');
    const videos = document.querySelectorAll('video');

    const isAnyVideoPlaying = () =>
      Array.from(videos).some((video) => !video.paused && !video.ended);

    const tryResumeMusic = () => {
      if (!isAnyVideoPlaying() && backgroundAudio?.paused) {
        backgroundAudio.play().catch((err) => {
          console.warn('No se pudo reanudar la música:', err);
        });
      }
    };

    const handlePlay = () => {
      if (backgroundAudio && !backgroundAudio.paused) {
        backgroundAudio.pause();
      }
    };

    const handlePauseOrEnded = () => {
      if (!document.fullscreenElement) {
        tryResumeMusic();
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        tryResumeMusic();
      }
    };

    videos.forEach((video) => {
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePauseOrEnded);
      video.addEventListener('ended', handlePauseOrEnded);
    });

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      videos.forEach((video) => {
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePauseOrEnded);
        video.removeEventListener('ended', handlePauseOrEnded);
      });
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Vlog</h2>
      <div className="grid grid-cols-1 gap-8">
        {listaDeVideos.map((video) => (
          <div key={video.id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">{video.titulo}</h3>
            <div className="w-full h-[400px]">
              <video
                className="w-full h-full rounded"
                src={video.url}
                controls
                preload="none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OtrosVideos;