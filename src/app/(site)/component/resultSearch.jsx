import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Popover = ({ potition, handleAddQueue, dataMusic }) => {
  return (
    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" style={{ top: potition.top, left: potition.left }}>
      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <button onClick={() => handleAddQueue(dataMusic)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Add Queue</button>
      </div>
    </div>
  )
}

export default function ResultSearch({ results, setData, getUrlBackend, audioMusic, queueMusic, currentIndex }) {

  let menitWaktu;
  let dataMusic;
  const [showOption, setShowOption] = useState(false);
  const [dataMusicOption, setDataMusicOption] = useState(null);
  const [potitionPopover, setPotitionPopover] = useState({ top: 0, left: 0 });

  const handleClick = async (data) => {
    if (data.target.getAttribute('data-music')) {
      const dataTarget = data.target.getAttribute('data-music').split(',');
      if (audioMusic) {
        if (queueMusic.current.length === 0) {
          queueMusic.current.push([`${getUrlBackend()}/audio-stream?url=${dataTarget[0]}`, ...dataTarget.slice(1)]);
          audioMusic.src = queueMusic.current[0];
          audioMusic.load();
          audioMusic.play();
          setData(audioMusic.paused);
        } else {
          currentIndex.current++;
          queueMusic.current.splice(currentIndex.current, 0, [`${getUrlBackend()}/audio-stream?url=${dataTarget[0]}`, ...dataTarget.slice(1)]);
          audioMusic.src = queueMusic.current[currentIndex.current];
          audioMusic.load();
          audioMusic.play();
          setData(!audioMusic.paused);
        }
      } else {
        console.error('Failed to play music:', response);
      }
    }
  };

  const handleAddQueue = async (data) => {
    queueMusic.current.push([`${getUrlBackend()}/audio-stream?url=${data[0]}`, ...data.slice(1)]);
    const response = await fetch(queueMusic.current[currentIndex.current], { method: 'GET' });
    if (response.ok && audioMusic) {
      if (queueMusic.current.length <= 1) {
        audioMusic.src = queueMusic.current[0];
        audioMusic.load();
        audioMusic.play();
        setData(audioMusic.paused);
      }
    } else {
      console.error('Failed to play music:', response);
    }
  }

  const handleAddQueueOption = (data) => {
    const dataTargetMusic = data.target.getAttribute('data-btn-music').split(',');
    setDataMusicOption(dataTargetMusic);
    setShowOption(!showOption);
    setPotitionPopover({ top: data.clientY + window.scrollY, left: data.clientX + window.scrollX });
  }

  return (
    <div className={`resultSearch`}>
      {results && results.map((x, i) => (
        menitWaktu = durationMusic(x.duration),
        dataMusic = [x.uri, menitWaktu, x.image, x.music_name, x.artist_name, x.artist_url, x.album_url, x.album_name],
        <div key={i} className="container mx-auto px-20 py-2">
          <div className={`flex items-center justify-between bg-gray-100 hover:bg-gray-200 rounded-lg p-2 drop-shadow-lg hover:drop-shadow-md transition`}
            data-music={dataMusic} onClick={handleClick}>
            <div className="flex items-center" data-music={dataMusic}>
              <Image
                src={x.image}
                width={70}
                height={70}
                className="rounded-lg" data-music={dataMusic}
                alt={x.music_name}
                priority={false}
              />
              <div className="ml-2" data-music={dataMusic}>
                <p className="font-bold text-lg" data-music={dataMusic}>{x.music_name}</p>
                <p className="text-sm">
                  <Link href={x.artist_url} target="_blank" className={`hover:underline`}>
                    {x.artist_name}
                  </Link>
                </p>
              </div>
            </div>
            <p className={`mx-auto`}>
              <Link href={x.album_url} target="_blank" className={`hover:underline`}>
                {x.album_name}
              </Link>
            </p>
            <p className={`mr-5`}>{menitWaktu}</p>
            <button onClick={handleAddQueueOption} className={`mr-5`} data-btn-music={dataMusic}>•••</button>
          </div>
          {showOption && <Popover potition={potitionPopover} handleAddQueue={handleAddQueue} dataMusic={dataMusicOption} />}
        </div>
      ))}
    </div>
  );
}

function durationMusic(durasi) {
  const hasilBagi = durasi / 60000;
  let jam = Math.floor(hasilBagi);
  let menit = (Math.round((hasilBagi - jam) * 60) - 1).toString().padStart(2, '0');
  if (menit === "-1") {
    jam = jam - 1;
    menit = "59";
  }
  return `${jam}:${menit}`
}