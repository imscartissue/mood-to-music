import { useEffect, useState } from "react";
import { useCheckedSongList } from "./store";

const CreatePlaylistBtn = () => {

    const [isDisabled, setIsDisabled] = useState(true);

    const checkedSongList = useCheckedSongList((state) => state.songs);

    useEffect(() => {
        setIsDisabled(checkedSongList.length === 0);
        console.log(checkedSongList);
    }, [checkedSongList]);

    const handleClick = () => {
        alert("Coming soon");
    }

    return (
        <button onClick={handleClick} className="bg-yellow-700 rounded-2xl p-1 sm:p-2 hover:bg-yellow-800 hover:cursor-pointer transition-colors duration-50 ease-in-out text-center disabled:cursor-not-allowed" disabled={isDisabled}>Create playlist</button>
    );
};

export default CreatePlaylistBtn;
