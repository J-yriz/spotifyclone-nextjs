import Image from "next/image";

export default function ResultSearch({ results, setData, lavalink, audioMusic }) {
  let menitWaktu;
  const { host, port } = lavalink;
  const handleClick = async (data) => {
    setData(data.target.getAttribute('data-music').split(','));
    await playMusic(data, audioMusic);
  };
  async function playMusic(data, audioMusic) {
    const uri = data.target.getAttribute('data-music').split(',')[0];
    const response = await fetch(`${host}${port}/audio-stream?url=${uri}`, {
      method: 'GET',
    });
    audioMusic.src = `${host}${port}/audio-stream?url=${uri}`;
    if (response.ok && audioMusic.src) {
      audioMusic.load();
      audioMusic.play();
    } else {
      console.error('Failed to play music:', response);
    }
  }

  return (
    <div className="resultSearch">
      {results && results.map((x, i, a) => (
        menitWaktu = durationMusic(x.duration),
        <div key={i} className="container mx-auto px-20 py-2">
          <div className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2 drop-shadow-lg hover:drop-shadow-md transition" onClick={handleClick}>
            <div className="flex items-center justify-between" data-music={[x.uri, menitWaktu, x.image, x.music_name, x.artist_name]}>
              <div className="flex flex-col items-start">
                <div className="flex items-center" data-music={[x.uri, menitWaktu, x.image, x.music_name, x.artist_name]}>
                  <Image
                    src={x.image}
                    width={70}
                    height={70}
                    className="rounded-lg" data-music={[x.uri, menitWaktu, x.image, x.music_name, x.artist_name]}
                    alt={x.music_name}
                    priority={false}
                  />
                  <div className="ml-2" data-music={[x.uri, menitWaktu, x.image, x.music_name, x.artist_name]}>
                    <p className="font-bold text-lg" data-music={[x.uri, menitWaktu, x.image, x.music_name, x.artist_name]}>{x.music_name}</p>
                    <p className="text-sm" data-music={[x.uri, menitWaktu, x.image, x.music_name, x.artist_name]}>{x.artist_name}</p>
                  </div>
                </div>
              </div>
              <p className="mx-5">{menitWaktu}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function durationMusic(durasi) {
  const hasilBagi = durasi / 60000;

  const jam = Math.floor(hasilBagi);
  const menit = Math.round((hasilBagi - jam) * 60) - 1;

  return jam + ":" + menit;
}