import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

import QueueList from "./queueList";

export default function PlayBack({ data, audioMusic, queueMusic, currentIndex, lyricsShow, setLyricsShow, setLyricsMusic }) {
    const simpanQueue = useRef([]);
    const [show, setShow] = useState(true);
    const [volume, setVolume] = useState(1);
    const [current, setCurrent] = useState(0);
    const [progress, setProgress] = useState(0);
    const [shuffle, setShuffle] = useState(true);
    const [volumeUser, setVolumeUser] = useState(0);
    const [duration, setDuration] = useState("0:00");
    const [image, setImage] = useState("/blank.png");
    const [showVolume, setShowVolume] = useState(true);
    const [nameMusic, setNameMusic] = useState(['', '']);
    const [nameArtist, setNameArtist] = useState(['', '']);
    const [loopingMusic, setLoopingMusic] = useState(false);
    const [showModalQueue, setShowModalQueue] = useState(false);
    const [arrayDataMusic, setArrayDataMusic] = useState(['', '']);

    const changeMusic = (direction) => {
        if (direction === 'next' ? currentIndex.current < queueMusic.current.length - 1 : currentIndex.current > 0) {
            currentIndex.current = direction === 'next' ? currentIndex.current + 1 : currentIndex.current - 1;
            if (show) setShow(false);
            if (currentIndex.current >= queueMusic.current.length - 2) setShuffle(true)
            const currentMusic = queueMusic.current[currentIndex.current];
            audioMusic.src = currentMusic[0];
            audioMusic.load();
            audioMusic.play();
            setLyricsMusic([currentMusic[3], currentMusic[4]]);
            setImage(currentMusic[2]);
            setNameMusic([currentMusic[3], currentMusic[6]]);
            setNameArtist([currentMusic[4], currentMusic[5]]);
            setDuration(currentMusic[1]);
        }
    };

    const previusMusic = () => changeMusic('previous');
    const nextMusic = () => changeMusic('next');

    const handleShow = () => {
        setShow(!show);
        show ? audioMusic.play() : audioMusic.pause();
    };

    const handleVolumeShowVolume = () => {
        setShowVolume(!showVolume);
        if (showVolume) setVolume(0);
        else if (volumeUser <= 0) setVolume(1);
        else setVolume(volumeUser);
    };

    const handleVolume = (e) => {
        const volumeValue = e.target.value;
        setVolume(volumeValue);
        setVolumeUser(volumeValue);
        setShowVolume(volumeValue > 0);
    };

    const handleShuffle = () => {
        if (queueMusic.current.length > 2 && shuffle && currentIndex.current < queueMusic.current.length - 2) {
            setShuffle(false);
            const shuffleArray = (array, startIndex) => {
                for (let i = startIndex + 1; i < array.length - 1; i++) {
                    const j = Math.floor(Math.random() * (array.length - i)) + i;
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            };
            const shuffledArray = shuffleArray(queueMusic.current, currentIndex.current);
            queueMusic.current = shuffledArray;
            simpanQueue.current = [...queueMusic.current];
        } else {
            setShuffle(true);
            queueMusic.current.length === simpanQueue.current.length ? queueMusic.current = [...simpanQueue.current] : queueMusic.current = queueMusic.current;
        }
    };

    const handleRepeat = () => {
        setLoopingMusic(!loopingMusic);
    };

    const handleLoopingMusic = () => {
        if (queueMusic.current.length === 0) return;
        audioMusic.src = queueMusic.current[currentIndex.current][0];
        audioMusic.load();
        audioMusic.play();
    }

    const handleLyrics = () => {
        if (queueMusic.current.length === 0) return;
        const currentMusic = queueMusic.current[currentIndex.current];
        setLyricsShow(!lyricsShow);
        setLyricsMusic([currentMusic[3], currentMusic[4]]);
    };

    function durationMusic(durasi) {
        if (durasi === 0) return "0:00";
        const hasilBagi = (durasi - 1) / 60;
        const jam = Math.floor(hasilBagi);
        const menit = (Math.round((hasilBagi - jam) * 60)).toString().padStart(2, '0');
        return `${jam}:${menit}`;
    }

    useEffect(() => {
        if (audioMusic) audioMusic.volume = volume;
    }, [volume, audioMusic]);

    useEffect(() => {
        const handdle = () => {
            setShow(false);
            const currentMusic = queueMusic.current[currentIndex.current];
            setImage(currentMusic[2]);
            setNameMusic([currentMusic[3], currentMusic[6]]);
            setNameArtist([currentMusic[4], currentMusic[5]]);
            setDuration(currentMusic[1]);
        }
        if ((data !== undefined && data === false) || (currentIndex.current >= 1 && data !== undefined && data === true)) handdle();
    }, [data, queueMusic, currentIndex]);

    useEffect(() => {
        if (audioMusic) {
            if (show && audioMusic.paused === true && audioMusic.currentTime === audioMusic.duration && currentIndex.current === (queueMusic.current.length - 1)) {
                nextMusic();
            }
        }
    }, [queueMusic, audioMusic, currentIndex, nextMusic, show]);

    useEffect(() => {
        const updateProgress = () => {
            if (audioMusic) {
                setCurrent(audioMusic.currentTime);
                setProgress((audioMusic.currentTime / audioMusic.duration) * 100);
                setArrayDataMusic([audioMusic.currentTime, audioMusic.duration]);
                if (audioMusic.paused === true && audioMusic.currentTime === audioMusic.duration && loopingMusic) handleLoopingMusic();
                if (audioMusic.paused === true && currentIndex.current === (queueMusic.current.length - 1)) setShow(true);
                if (audioMusic.paused === true && currentIndex.current !== (queueMusic.current.length - 1) && audioMusic.currentTime === audioMusic.duration) nextMusic();
            }
        };

        if (audioMusic) {
            audioMusic.addEventListener('timeupdate', updateProgress);
        };

        return () => {
            if (audioMusic) {
                audioMusic.removeEventListener('timeupdate', updateProgress);
            }
        };
    }, [audioMusic, queueMusic, currentIndex, handleLoopingMusic, nextMusic, loopingMusic]);

    return (
        <div className={`playBack`}>
            <div className={`container mx-auto relative`}>
                <div className={`fixed bottom-5 left-10 right-10 bg-gray-300 rounded-lg flex items-center p-2 justify-between`}>
                    <div className={`profileMusic flex items-center`}>
                        <Image
                            src={image}
                            height={70}
                            width={70}
                            className={`rounded-lg mr-2`}
                            alt={nameArtist[0].toLocaleLowerCase()}
                        />
                        <div className="miawmiaw ml-2 flex flex-col left-20">
                            {/* music name */}
                            <Link className="font-bold hover:underline" href={nameMusic[1]} target="_blank">
                                {nameMusic[0]}
                            </Link>
                            {/* artist */}
                            <Link className="text-sm hover:underline" href={nameArtist[1]} target="_blank">
                                {nameArtist[0]}
                            </Link>
                        </div>
                    </div>
                    <div className="actionMusic flex flex-col items-center">
                        <div className="doingMusic flex items-center">
                            {/* shuffle */}
                            <button className={`mr-2`} onClick={handleShuffle}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                                    <path fill="none" stroke={`${shuffle ? '#525252' : '#030712'}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="50" d="m400 304l48 48l-48 48m0-288l48 48l-48 48M64 352h85.19a80 80 0 0 0 66.56-35.62L256 256"></path>
                                    <path fill="none" stroke={`${shuffle ? '#525252' : '#030712'}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="50" d="M64 160h85.19a80 80 0 0 1 66.56 35.62l80.5 120.76A80 80 0 0 0 362.81 352H416m0-192h-53.19a80 80 0 0 0-66.56 35.62L288 208"></path>
                                </svg>
                            </button>
                            {/* previus */}
                            <button className={`mr-2`} onClick={previusMusic}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#525252" className="size-6">
                                    <path d="M9.195 18.44c1.25.714 2.805-.189 2.805-1.629v-2.34l6.945 3.968c1.25.715 2.805-.188 2.805-1.628V8.69c0-1.44-1.555-2.343-2.805-1.628L12 11.029v-2.34c0-1.44-1.555-2.343-2.805-1.628l-7.108 4.061c-1.26.72-1.26 2.536 0 3.256l7.108 4.061Z" />
                                </svg>
                            </button>
                            {/* pause */}
                            <button className={`${show ? '' : 'hidden'} hover:scale-110 mr-1`} onClick={handleShow}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-6">
                                    <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                                </svg>
                            </button>
                            {/* play */}
                            <button className={`${show ? 'hidden' : ''} hover:scale-110 mr-1`} onClick={handleShow}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-6">
                                    <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
                                </svg>
                            </button>
                            {/* next */}
                            <button className={`mr-2`} onClick={nextMusic}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#525252" className="size-6">
                                    <path d="M5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v8.122c0 1.44 1.555 2.343 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256l-7.108-4.061C13.555 6.346 12 7.249 12 8.689v2.34L5.055 7.061Z" />
                                </svg>
                            </button>
                            {/* repeat */}
                            <button onClick={handleRepeat}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 512 512">
                                    <path fill="none" stroke={`${loopingMusic ? '#030712' : '#525252'}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="50" d="m320 120l48 48l-48 48"></path>
                                    <path fill="none" stroke={`${loopingMusic ? '#030712' : '#525252'}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="50" d="M352 168H144a80.24 80.24 0 0 0-80 80v16m128 128l-48-48l48-48"></path>
                                    <path fill="none" stroke={`${loopingMusic ? '#030712' : '#525252'}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="50" d="M160 344h208a80.24 80.24 0 0 0 80-80v-16"></path>
                                </svg>
                            </button>
                        </div>
                        <div className={`progresBarr flex items-center`}>
                            <p className={`mr-5`}>{durationMusic(Math.round(current))}</p>
                            <div className={`w-96 max-w-xl bg-gray-200 rounded-full h-1 overflow-hidden`}>
                                <div className={`bg-blue-600 h-1 rounded-full`} style={{ width: `${progress}%` }}></div>
                            </div>
                            <p className={`ml-5`}>{duration}</p>
                        </div>
                    </div>
                    <div className={`lyricsMusic`}>
                        <button onClick={handleLyrics}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={`${lyricsShow ? '#030712' : '#525252'}`} className="size-6">
                                <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                                <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
                            </svg>
                        </button>
                    </div>
                    <div className={`queueMusic`}>
                        <button onClick={() => setShowModalQueue(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#525252" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                            </svg>
                        </button>
                    </div>
                    <div className={`volumeMusic flex items-center mr-5`}>
                        <button className={showVolume ? '' : 'hidden'} onClick={handleVolumeShowVolume}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#525252" className="size-6">
                                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
                                <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
                            </svg>
                        </button>
                        <button className={showVolume ? 'hidden' : ''} onClick={handleVolumeShowVolume}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#525252" className="size-6">
                                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z" />
                            </svg>
                        </button>
                        <input type="range" min={0} max={1} step={0.01} value={volume} onChange={handleVolume} className="ml-2 w-24 h-1 bg-gray-300 rounded-lg cursor-pointer accent-blue-600" />
                    </div>
                </div>
            </div>
            {showModalQueue && <QueueList setShowModal={setShowModalQueue} dataQueue={queueMusic.current} currentIndex={currentIndex.current} durationMusic={arrayDataMusic} />}
        </div>
    )
}
