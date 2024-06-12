import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ResultSearch({ results, setData, lavalink, audioMusic, queueMusic }) {
  let menitWaktu;
  const { host, port } = lavalink;
  const [showOption, setShowOption] = useState(false);
  const handleClick = async (data) => {
    if (data.target.getAttribute('data-music')) {
      const dataTarget = data.target.getAttribute('data-music').split(',');
      queueMusic.current.push([`${host}${port}/audio-stream?url=${dataTarget[0]}`, dataTarget[1], dataTarget[2], dataTarget[3], dataTarget[4], dataTarget[5], dataTarget[6]]);
      const response = await fetch(queueMusic.current[0], {
        method: 'GET',
      });
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
  };

  return (
    <div className="resultSearch">
      {results && results.map((x, i) => (
        menitWaktu = durationMusic(x.duration, x.music_name),
        <div key={i} className="container mx-auto px-20 py-2">
          <div className={`flex items-center justify-between bg-gray-100 hover:bg-gray-200 rounded-lg p-2 drop-shadow-lg hover:drop-shadow-md transition`}
            data-music={[x.uri, menitWaktu, x.image, x.music_name, x.artist_name, x.artist_url, x.album_url]} onClick={handleClick} onMouseEnter={() => setShowOption(true)} onMouseLeave={() => setShowOption(false)}>
            <div className="flex items-center" data-music={[x.uri, menitWaktu, x.image, x.music_name, x.artist_name, x.artist_url, x.album_url]}>
              <Image
                src={x.image}
                width={70}
                height={70}
                className="rounded-lg" data-music={[x.uri, menitWaktu, x.image, x.music_name, x.artist_name, x.artist_url, x.album_url]}
                alt={x.music_name}
                priority={false}
              />
              <div className="ml-2" data-music={[x.uri, menitWaktu, x.image, x.music_name, x.artist_name, x.artist_url, x.album_url]}>
                <p className="font-bold text-lg" data-music={[x.uri, menitWaktu, x.image, x.music_name, x.artist_name, x.artist_url, x.album_url]}>{x.music_name}</p>
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
            {/* <button className={`mr-5`}>•••</button> */}
          </div>
        </div>
      ))}
    </div>
  );
}

function durationMusic(durasi, nama) {
  const hasilBagi = durasi / 60000;


  let jam = Math.floor(hasilBagi);
  let menit = (Math.round((hasilBagi - jam) * 60) - 1).toString().padStart(2, '0');
  if (menit === "-1") {
    jam = jam - 1;
    menit = "59";
  }

  return jam + ":" + menit;
}