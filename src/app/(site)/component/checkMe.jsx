export default function CheckMe({ music }) {
    async function handleClick() {
        const respone = await fetch('http://0.tcp.ap.ngrok.io:16113/take', {
            method: 'POST',
            headers: {
                Authorization: 'testingajah',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                track: `ytsearch:${music}`
            })
        })
        const data = await respone.json();
        console.log(data);
    }

    return (
        <div className={`checkMe`}>
            <button onClick={async() => await handleClick()}>
                Click Me
            </button>
        </div>
    )
}