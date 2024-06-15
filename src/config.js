import 'dotenv/config';

const config = {
    client_id: '' || process.env.NEXT_PUBLIC_CLIENT_ID,
    client_secret: '' || process.env.NEXT_PUBLIC_CLIENT_SECRET,
    redirect_uri: '' || process.env.NEXT_PUBLIC_REDIRECT_URI,
    // Lavalink configuration
    lavalink: {
        host: 'http://sg3.localto.net' || process.env.NEXT_PUBLIC_HOST,
        port: '7682' || process.env.NEXT_PUBLIC_PORT,
        password: 'testingajah' || process.env.NEXT_PUBLIC_PASSWORD_LAVALINK,
        secure: true
    }
}

export const getBackendHost = () => {
    if(config.lavalink.host.startsWith("https") && config.lavalink.port === "443") {
        return config.lavalink.host;
    }

    return `${config.lavalink.host}:${config.lavalink.port}`
}

export default config;