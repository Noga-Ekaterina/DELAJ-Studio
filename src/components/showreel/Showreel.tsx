import { FC, useRef, useEffect, useState, useCallback } from 'react';
import './showreel.scss';
import { IWithClass } from '@/types';
import classNames from 'classnames';
import { observer } from "mobx-react-lite";
import store from "@/store/store";

interface Props extends IWithClass {
  video: string;
}

const Showreel: FC<Props> = observer((props) => {
  const { showMainScreen, isModalMenuOpened, isModalContactsOpened } = store;
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const playAttemptRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);
  const [isOpenCurtain, setIsOpenCurtain] = useState(false)
  const timeout=useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (timeout.current){
      clearTimeout(timeout.current)
      timeout.current=null

    }
    const hash=window.location.hash.slice(1)
    if((showMainScreen && (hash=="" || hash=="main-screen")) || isModalContactsOpened || isModalMenuOpened ){
      timeout.current= setTimeout(()=> setIsOpenCurtain(true), 600)
    }else {
      setIsOpenCurtain(false)
    }
  }, [showMainScreen, isModalContactsOpened, isModalMenuOpened ]);

  // Intersection Observer для отслеживания видимости
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Видео вошло в область видимости
              setIsVisible(true);
              if (!isOpenCurtain) {
                safePlay();
              }
            } else {
              // Видео вышло из области видимости
              setIsVisible(false);
              safePause();
            }
          });
        },
        {
          root: null, // viewport
          rootMargin: '50px', // Начинаем отслеживание заранее
          threshold: 0.3, // Видео считается видимым, когда 30% в области видимости
        }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isOpenCurtain]);

  // Функция безопасного воспроизведения
  const safePlay = useCallback(async () => {
    if (!videoRef.current || isPlayingRef.current) return;

    try {
      isPlayingRef.current = true;
      playAttemptRef.current++;
      const currentAttempt = playAttemptRef.current;

      // Небольшая задержка для стабильности
      await new Promise(resolve => setTimeout(resolve, 50));

      // Проверяем, что это еще актуальная попытка
      if (currentAttempt !== playAttemptRef.current) return;

      const video = videoRef.current;

      // Сброс видео на начало если оно уже закончилось
      if (video.currentTime >= video.duration - 0.1) {
        video.currentTime = 0;
      }

      video.muted = true;

      // Ждем готовности видео
      if (video.readyState < 3) {
        await new Promise<void>((resolve) => {
          const onCanPlay = () => {
            video.removeEventListener('canplay', onCanPlay);
            resolve();
          };
          video.addEventListener('canplay', onCanPlay);
        });
      }

      const playPromise = video.play();

      if (playPromise !== undefined) {
        await playPromise;
        setIsLoaded(true);
      }
    } catch (error) {
      console.log('Autoplay failed:', error);
    } finally {
      isPlayingRef.current = false;
    }
  }, []);

  // Функция безопасной паузы
  const safePause = useCallback(() => {
    if (!videoRef.current) return;

    playAttemptRef.current++;
    isPlayingRef.current = false;

    try {
      videoRef.current.pause();
    } catch (error) {
      console.log('Pause failed:', error);
    }
  }, []);

  // Сброс видео при скрытии
  useEffect(() => {
    if (isOpenCurtain && videoRef.current) {
      safePause();
      videoRef.current.currentTime = 0;
    }
  }, [isOpenCurtain, safePause]);

  // Управление воспроизведением при изменении isOpenCurtain
  useEffect(() => {
    if (!videoRef.current) return;

    if (!isOpenCurtain && isVisible) {
      safePlay();
    } else {
      safePause();
    }
  }, [isOpenCurtain, isVisible, safePlay, safePause]);

  // Обработчики событий видео
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      if (!isOpenCurtain && isVisible) {
        safePlay();
      }
    };

    const handleEnded = () => {
      if (isVisible && !isOpenCurtain) {
        video.currentTime = 0;
        safePlay();
      }
    };

    const handlePause = () => {
      isPlayingRef.current = false;
    };

    const handlePlay = () => {
      isPlayingRef.current = true;
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('pause', handlePause);
    video.addEventListener('play', handlePlay);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('play', handlePlay);
    };
  }, [safePlay, isOpenCurtain, isVisible]);

  return (
      <div
          ref={containerRef}
          className={classNames(props.className, 'showreel')}
      >
        <video
            ref={videoRef}
            className={classNames('showreel-main', {
              'loaded': isLoaded,
              'loading': !isLoaded
            })}
            width="320"
            height="240"
            controls={false}
            muted
            preload="metadata" // Только метаданные для быстрой загрузки
            autoPlay={false} // Убираем нативный autoplay
            loop
            playsInline
            style={{ display: isOpenCurtain ? "none" : "block" }}
        >
          <source
              media="(max-width: 640px)"
              src={`/Assets/Videos/showreel-${props.video}-vertical.mp4`}
              type="video/mp4"
          />
          <source
              media="(min-width: 641px)"
              src={`/Assets/Videos/showreel-${props.video}.mp4`}
              type="video/mp4"
          />
          Ваш браузер не поддерживает видео тег.
        </video>
      </div>
  );
});

export default Showreel;