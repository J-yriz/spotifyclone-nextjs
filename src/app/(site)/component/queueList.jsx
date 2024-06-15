import Link from "next/link";
import Image from "next/image";

export default function QueueList({ setShowModal, dataQueue, currentIndex, durationMusic }) {

    if (!dataQueue || dataQueue.length === 0 || (currentIndex === dataQueue.length - 1 && durationMusic[0] === durationMusic[1])) return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className={`queueList`}>
                            <div className={`flex items-center bg-gray-200 p-3 rounded-lg`}>
                                <p className={`mx-auto`}>No Data</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button onClick={() => setShowModal(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className={`queueList ${dataQueue.slice(currentIndex).length > 4 ? 'overflow-y-scroll h-96' : ''}`}>
                            <p className={`font-semibold mb-2`}>Now Playing</p>
                            {dataQueue && dataQueue.slice(currentIndex).map((x, i) => (
                                <div key={i}>
                                    <div className={`flex items-center bg-gray-200 hover:bg-gray-300 p-3 rounded-lg ${i > 0 ? 'mt-2' : ''}`}>
                                        <Image
                                            src={x[2]}
                                            height={70}
                                            width={70}
                                            className={`rounded-lg`}
                                            alt={x[4]}
                                        />
                                        <div className={`ml-2 flex flex-col`}>
                                            <Link className="font-bold hover:underline" href={x[6]} target="_blank">
                                                {x[3]}
                                            </Link>
                                            {/* artist */}
                                            <Link className="text-sm hover:underline" href={x[5]} target="_blank">
                                                {x[4]}
                                            </Link>
                                        </div>
                                        {/* albumClass */}
                                        <Link className={`mx-auto hover:underline`} href={x[6]} target="_blank">
                                            {x[7]}
                                        </Link>
                                        <p className={`mr-5`}>{x[1]}</p>
                                    </div>
                                    <p className={`font-semibold mt-5 ${i === 0 && currentIndex !== dataQueue.length - 1 ? '' : 'hidden'}`}>Next Song</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button onClick={() => setShowModal(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}