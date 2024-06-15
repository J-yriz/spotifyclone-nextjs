import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import LyricsMusic from "./lyricsMusic";

const Popover = ({ potition, handleAddQueue, dataMusic }) => {
  return (
    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" style={{ top: potition.top, left: potition.left }}>
      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <button onClick={() => handleAddQueue(dataMusic)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Add Queue</button>
      </div>
    </div>
  )
}

export default function ResultSearch({ results, dataAudio, setDataAudio, getUrlBackend, audioMusic, queueMusic, currentIndex, lyricsShow, lyricsMusic }) {

  let menitWaktu;
  let dataMusic;
  const [showOption, setShowOption] = useState(false);
  const [doubleClick, setDoubleClick] = useState(null);
  const [dataMusicOption, setDataMusicOption] = useState(null);
  const [potitionPopover, setPotitionPopover] = useState({ top: 0, left: 0 });

  const handleClick = async (data, index) => {
    const musicData = data.target.getAttribute('data-music')?.split(',');
    if (!musicData || !audioMusic) {
      return;
    }

    const handlePlay = () => {
      const musicUrl = [`${getUrlBackend()}/audio-stream?url=${musicData[0]}`, ...musicData.slice(1)];
      const isQueueEmpty = queueMusic.current.length === 0;
      if (isQueueEmpty) {
        queueMusic.current.push(musicUrl);
      } else {
        currentIndex.current++;
        queueMusic.current.splice(currentIndex.current, 0, musicUrl);
      }
      audioMusic.src = queueMusic.current[currentIndex.current];
      audioMusic.load();
      audioMusic.play();
      setDataAudio(isQueueEmpty ? audioMusic.paused : !dataAudio);
    }

    if (queueMusic.current.length > 0) {
      if (doubleClick !== index) {
        setDoubleClick(index);
      } else {
        setDoubleClick(null);
        musicData[3] !== queueMusic.current[currentIndex.current][3] ? handlePlay() : null;
      }
    } else {
      handlePlay();
    }
  };

  const handleAddQueue = async (data) => {
    queueMusic.current.push([`${getUrlBackend()}/audio-stream?url=${data[0]}`, ...data.slice(1)]);
    if (queueMusic.current.length <= 1 && audioMusic) {
      const response = await fetch(queueMusic.current[currentIndex.current], { method: 'GET' });
      if (response.ok) {
        audioMusic.src = queueMusic.current[0];
        audioMusic.load();
        audioMusic.play();
        setDataAudio(audioMusic.paused);
      } else {
        console.error('Failed to play music:', response);
      }
    }
    setShowOption(!showOption);
  }

  const handleAddQueueOption = (data) => {
    const dataTargetMusic = data.target.getAttribute('data-btn-music').split(',');
    setDataMusicOption(dataTargetMusic);
    setShowOption(!showOption);
    setPotitionPopover({ top: data.clientY + window.scrollY, left: data.clientX + window.scrollX });
  }

  return (
    <>
      {lyricsShow === false && <div className={`resultSearch`}>
        {results && results.map((x, i) => (
          menitWaktu = durationMusic(x.duration),
          dataMusic = [x.uri, menitWaktu, x.image, x.music_name, x.artist_name, x.artist_url, x.album_url, x.album_name],
          <div key={i} className={`container mx-auto ${i === results.length - 1 ? 'mb-28' : ''} px-20 py-2`}>
            <div className={`flex items-center justify-between ${doubleClick === i ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-200'} rounded-lg p-2 drop-shadow-lg hover:drop-shadow-md transition`}
              data-music={dataMusic} onClick={(e) => handleClick(e, i)}>
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
      </div>}
      {lyricsShow === true && <LyricsMusic getUrlBackend={getUrlBackend} lyricsMusic={lyricsMusic} />}
    </>
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