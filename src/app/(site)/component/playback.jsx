import Image from "next/image";
import { useState } from "react";

export default function PlayBack({ token, data }) {
    const [show, setShow] = useState(true);
    const [volume, setVolume] = useState(100);
    // buat untuk value dari show diambil dari playMusic yang dijalankan
    const [progress, setProgress] = useState(0);
    const [volumeUser, setVolumeUser] = useState(0);
    const [showVolume, setShowVolume] = useState(true);
    // buat untuk value dari volume dan showVolume diambil dari data user yang sudah login
    const simulateProgress = () => {
        setProgress(prev => (prev < 100 ? prev + 10 : 0));
    };
    const handleShow = () => {
        simulateProgress();
        setShow(!show);
    }
    const handleVolumeShowVolume = () => {
        setShowVolume(!showVolume);
        if (showVolume) setVolume(0); 
        else if (volumeUser <= 0) setVolume(100);
        else setVolume(volumeUser);
    }
    const handleVolume = (e) => {
        setVolume(e.target.value);
        setVolumeUser(e.target.value);
        e.target.value > 0 ? setShowVolume(true) : setShowVolume(false);
    }
    // Todolist tambahkan penyimanan volume user ke dalam bentuk json, jika user baru masuk add user baru dengan volume 100


    /**
     * 
     * data[0] = uri
     * data[1] = duration
     * data[2] = image
     * data[3] = music_name
     * data[4] = artist_name
     * 
     */
    return (
        <div className={`playBack`}>
            <div className={`playBack`}>
                <div className={`container mx-auto relative`}>
                    <div className={`fixed bottom-5 left-10 right-10 bg-gray-300 rounded-lg flex items-center p-2 justify-between`}>
                        <div className={`profileMusic flex items-center`}>
                            <Image
                                src={`${data?.[2] || ""}`}
                                height={70}
                                width={70}
                                className={`rounded-lg mr-2`}
                                alt={`${data?.[4].toLowerCase() || ''}`}
                            />
                            <div className="ml-2 absolute left-20">
                                <h1 className="font-bold">{data?.[3] || ''}</h1>
                                <h1 className="text-sm">{data?.[4] || ''}</h1>
                            </div>
                        </div>
                        <div className="actionMusic flex flex-col items-center">
                            <div className="doingMusic flex items-center">
                                <button className="mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path d="M9.195 18.44c1.25.714 2.805-.189 2.805-1.629v-2.34l6.945 3.968c1.25.715 2.805-.188 2.805-1.628V8.69c0-1.44-1.555-2.343-2.805-1.628L12 11.029v-2.34c0-1.44-1.555-2.343-2.805-1.628l-7.108 4.061c-1.26.72-1.26 2.536 0 3.256l7.108 4.061Z" />
                                    </svg>
                                </button>
                                <button className={`${show ? '' : 'hidden'} hover:scale-110 mr-1`} onClick={handleShow}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <button className={`${show ? 'hidden' : ''} hover:scale-110 mr-1`} onClick={handleShow}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path d="M5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v8.122c0 1.44 1.555 2.343 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256l-7.108-4.061C13.555 6.346 12 7.249 12 8.689v2.34L5.055 7.061Z" />
                                    </svg>
                                </button>
                            </div>
                            <div className={`progresBarr flex items-center`}>
                                <p className={`mr-5`}>1:38</p>
                                <div className={`w-96 max-w-xl bg-gray-200 rounded-full h-1 overflow-hidden`}>
                                    <div className={`bg-blue-600 h-1 rounded-full`} style={{ width: `${progress}%` }}></div>
                                </div>
                                <p className={`ml-5`}>{data?.[1] || "00:00"}</p>
                            </div>
                        </div>
                        <div className={`volumeMusic flex items-center mr-5`}>
                            <button className={showVolume ? '' : 'hidden'} onClick={handleVolumeShowVolume}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
                                    <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
                                </svg>
                            </button>
                            <button className={showVolume ? 'hidden' : ''} onClick={handleVolumeShowVolume}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z" />
                                </svg>
                            </button>
                            <input type="range" min={0} max={100} value={volume} onChange={handleVolume} className="ml-2 w-24 h-1 bg-gray-300 rounded-lg cursor-pointer accent-blue-600" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
