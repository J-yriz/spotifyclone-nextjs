import 'dotenv/config';

export default {
    client_id: '' || process.env.NEXT_PUBLIC_CLIENT_ID,
    client_secret: '' || process.env.NEXT_PUBLIC_CLIENT_SECRET,
    redirect_uri: '' || process.env.NEXT_PUBLIC_REDIRECT_URI,
    // Lavalink configuration
    lavalink: {
        host: 'http://localhost:' || process.env.NEXT_PUBLIC_HOST,
        port: '3000' || process.env.NEXT_PUBLIC_PORT,
        password: 'testingajah' || process.env.NEXT_PUBLIC_PASSWORD_LAVALINK,
        secure: true
    }
};
