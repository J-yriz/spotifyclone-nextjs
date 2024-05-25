import Image from "next/image";

export default function ResultSearch({ results }) {
  return (
    <main>
      {results && results.map((x, i, a) => (
        <div key={i} className="container mx-auto px-20 py-2">
          <div className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2 drop-shadow-lg hover:drop-shadow-md transition">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-start">
                <div className="flex items-center">
                  <Image
                    src={x.image}
                    width={70}
                    height={70}
                    className="rounded-lg"
                    alt={x.music_name}
                  />
                  <div className="ml-2">
                    <p className="font-bold text-lg">{x.music_name}</p>
                    <p className="text-sm">{x.artist_name}</p>
                  </div>
                </div>
              </div>
              <p className="mx-5">{(x.duration / 60000).toFixed(2)}</p>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}