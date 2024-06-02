import Image from "next/image";

export default function ResultSearch({ results, setUri }) {
  const handleClick = (uri) => {
    setUri([uri.target.getAttribute('data-uri')]);
    console.log(uri.target.getAttribute('data-uri'));
  };

  return (
    <div className="resultSearch">
      {results && results.map((x, i, a) => (
        <div key={i} className="container mx-auto px-20 py-2">
          <div className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2 drop-shadow-lg hover:drop-shadow-md transition" onClick={handleClick}>
            <div className="flex items-center justify-between" data-uri={x.uri}>
              <div className="flex flex-col items-start">
                <div className="flex items-center" data-uri={x.uri}>
                  <Image
                    src={x.image}
                    width={70}
                    height={70}
                    className="rounded-lg" data-uri={x.uri}
                    alt={x.music_name}
                  />
                  <div className="ml-2" data-uri={x.uri}>
                    <p className="font-bold text-lg" data-uri={x.uri}>{x.music_name}</p>
                    <p className="text-sm" data-uri={x.uri}>{x.artist_name}</p>
                  </div>
                </div>
              </div>
              <p className="mx-5">{(x.duration / 60000).toFixed(2)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}