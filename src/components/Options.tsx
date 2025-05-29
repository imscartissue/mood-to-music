// import Slider from "./Slider";

import CreatePlaylistBtn from "./CreatePlaylistBtn";

const Options = () => {
    return (
        <div className="flex-1 text-white">
            <h1 className="text-yellow-500 text-2xl font-semibold mb-5 ml-5 shrink-0">Options</h1>
            <ul className="bg-zinc-800 rounded-2xl p-4 text-md text-center space-y-3">

                <li>
                    Coming soon
                </li>

                <li>
                    <CreatePlaylistBtn />
                </li>
                
            </ul>
        </div>
    );
};

// <Slider text="No Of Songs" maxValue={50} />

export default Options;