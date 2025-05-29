import type { Song } from "../elements/MoodPage";
import SingleSong from "./SingleSong";

interface SongListParam {
    moodName: string | undefined,
    songs: Song[],
    loading: boolean,
    loadingText: string
}

function capitalizeFirstLetter(str: string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const SongList = ({ moodName, songs, loading, loadingText }: SongListParam) => {

    return (
        <div className="flex flex-col flex-2 mr-4">
            {/* Title stays fixed */}
            <div className="text-yellow-500 text-2xl font-semibold mb-5 ml-5 shrink-0">
                {capitalizeFirstLetter(moodName as string)}
            </div>

            {/* Scroll only this section */}
            <ul className="flex-1 overflow-y-auto text-gray-50 text-sm md:text-md bg-zinc-800 p-5 rounded-2xl hover:cursor-default max-h-[70vh] pb-20">
                {!loading ? (
                    songs.map((song, index) => (
                        <li key={index}>
                            <SingleSong song={song} index={index} />
                        </li>
                    ))
                ) : (
                    <p>{loadingText}</p>
                )}
            </ul>
        </div>

    );
};

export default SongList;