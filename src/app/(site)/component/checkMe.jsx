import { useState, useEffect } from "react";

const BelajarUseEffect = () => {
    useEffect(() => {
        // Efek yang dijalankan setelah setiap render
        console.log('Component rendered or count changed');

        // Membersihkan efek
        return () => {
            console.log('return function useeffect muncul kapan ?', 'Cleaning up');
        };
    }, []);
    return <div>belajar useeffect</div>
}

const Main = () => {
    const [isRendered, setIsRendered] = useState(false)
    return (
        <div>
            <button onClick={() => setIsRendered(!isRendered)}>render</button>

            {isRendered && <BelajarUseEffect />}
        </div>
    );
}

export default Main;