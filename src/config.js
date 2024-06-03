import 'dotenv/config';

export default {
    client_id: '' || process.env.NEXT_PUBLIC_CLIENT_ID,
    client_secret: '' || process.env.NEXT_PUBLIC_CLIENT_SECRET,
    redirect_uri: '' || process.env.NEXT_PUBLIC_REDIRECT_URI,
    // Lavalink configuration
    lavalink: {
        host: 'http://0.tcp.ap.ngrok.io:' || process.env.NEXT_PUBLIC_HOST,
        port: '16447' || process.env.NEXT_PUBLIC_PORT,
        password: 'testingajah' || process.env.NEXT_PUBLIC_PASSWORD_LAVALINK,
        secure: true
    }
};
