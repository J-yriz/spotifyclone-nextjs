export default function CheckMe({ token }) {
    async function handleClick() {
        const respone = await fetch('https://api.spotify.com/v1/me/player', {
            headers: {
                Authorization: 'Bearer ' + token
            }
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