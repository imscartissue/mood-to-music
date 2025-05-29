import { useEffect, useState } from "react";
import { useCheckedSongList } from "./store";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = "https://mood-to-music.vercel.app/callback";
const SCOPES = ["playlist-modify-public", "playlist-modify-private"];

const CreatePlaylistBtn = () => {

    const [isDisabled, setIsDisabled] = useState(true);

    const checkedSongList = useCheckedSongList((state) => state.songs);

    useEffect(() => {
        setIsDisabled(checkedSongList.length === 0);
        console.log(checkedSongList);
    }, [checkedSongList]);

    function spotifyUrlToUri(url: string): string | null {
        const regex = /https:\/\/open\.spotify\.com\/(track|album|playlist)\/([a-zA-Z0-9]+)/;
        const match = url.match(regex);

        if (!match) return null;

        const type = match[1]; // track, album, or playlist
        const id = match[2];   // Spotify ID

        return `spotify:${type}:${id}`;
    }

    const createPlaylist = () => {
        const state = encodeURIComponent(JSON.stringify({
            songs: checkedSongList.map((s) => spotifyUrlToUri(s.link)),
        }));

        const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES.join(" "))}&state=${state}`;

        window.location.href = authUrl;
    }

    return (
        <button onClick={createPlaylist} className="bg-yellow-700 rounded-2xl p-1 sm:p-2 hover:bg-yellow-800 hover:cursor-pointer transition-colors duration-50 ease-in-out text-center disabled:cursor-not-allowed" disabled={isDisabled}>Create playlist</button>
    );
};

export default CreatePlaylistBtn;
