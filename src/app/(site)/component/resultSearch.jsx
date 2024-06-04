import Image from "next/image";

export default function ResultSearch({ results, setData }) {
  const handleClick = (data) => {
    setData([data.target.getAttribute('data-uri'), data.target.getAttribute('data-waktu')]);
  };
  let menitWaktu;

  return (
    <div className="resultSearch">
      {results && results.map((x, i, a) => (
        menitWaktu = durationMusic(x.duration),
        <div key={i} className="container mx-auto px-20 py-2">
          <div className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2 drop-shadow-lg hover:drop-shadow-md transition" onClick={handleClick}>
            <div className="flex items-center justify-between" data-uri={x.uri} data-waktu={menitWaktu}>
              <div className="flex flex-col items-start">
                <div className="flex items-center" data-uri={x.uri} data-waktu={menitWaktu}>
                  <Image
                    src={x.image}
                    width={70}
                    height={70}
                    className="rounded-lg" data-uri={x.uri} data-waktu={menitWaktu}
                    alt={x.music_name}
                    priority={false}
                  />
                  <div className="ml-2" data-uri={x.uri} data-waktu={menitWaktu}>
                    <p className="font-bold text-lg" data-uri={x.uri} data-waktu={menitWaktu}>{x.music_name}</p>
                    <p className="text-sm" data-uri={x.uri} data-waktu={menitWaktu}>{x.artist_name}</p>
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