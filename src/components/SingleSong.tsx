import { useState } from "react";
import type { Song } from "../elements/MoodPage";
import { useCheckedSongList } from "./store";

interface SingleSongParams {
    song: Song,
    index: number,
}

const SingleSong = ({ song, index }: SingleSongParams): React.ReactNode => {

    const [checked, setChecked] = useState(false);

    const addCheckedSongList = useCheckedSongList((state) => state.add);
    const removeCheckedSongList = useCheckedSongList((state) => state.remove);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        song.isChecked = event.target.checked;

        if (song.isChecked) {
            addCheckedSongList(song);
        } else {
            removeCheckedSongList(song.name);
        }
    };

    const handleClick = () => {
        window.open(song.link, "_blank");
    }

    return (
        <div className="p-2 sm:mb-3 flex items-start border-b border-slate-500">

            <div className="self-center mr-3">
                <input type="checkbox" className="w-5 h-5 accent-[#d79921] border-2 border-[#928374] rounded focus:ring-2 focus:ring-[#fabd2f] bg-zinc-800" checked={checked}
                    onChange={handleChange} />
            </div>

            <div className="text-yellow-500 mr-3 text-xl">{index + 1}</div>

            <div className="hover:cursor-pointer" onClick={handleClick}>
                <strong>{song.name}</strong>{" "}
                {song.isExplicit ? (
                    <strong className="text-yellow-500">[E]</strong>
                ) : null}{" "}
                — {song.duration}
                <div className="text-md">{song.artist}</div>
            </div>

        </div>
    );
};

export default SingleSong;