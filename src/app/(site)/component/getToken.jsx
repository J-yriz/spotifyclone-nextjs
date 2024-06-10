import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import config from "@/config";
const { client_id, client_secret, redirect_uri, lavalink: { host, port } } = config;

export default function GetToken() {
    const router = useRouter();
    const diGunakan = useRef(false);
    const getToken = async () => {
        if (diGunakan.current) return;
        diGunakan.current = true;

        try {
            const response = await fetch(`${host}${port}/callback`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    client_id,
                    client_secret
                }),
            });
            const data = await response.json();
            const token = Cookies.get("token");
            if (!token) {
                Cookies.set("token", data);
            } else {
                Cookies.remove("token");
                Cookies.set("token", data);
            }
            router.push("/spotify");
        } catch (error) {
            console.error("Failed to get access token:", error);
        }
    }
    useEffect(() => {
        if (!diGunakan.current) getToken();
    }, []);
}