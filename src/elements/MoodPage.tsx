import Navbar from "../components/Navbar";
import { db } from "../backend/firebase";
import { extractTrackId, getTrackInfo } from "../backend/spotify";

import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import { get, ref } from "firebase/database";
import Options from "../components/Options";
import SongList from "../components/SongList";

export interface Song {
    name: string;
    artist: string;
    duration: string;
    link: string;
    isExplicit: boolean;
    isChecked: boolean;
}

const loadingText: string = "Loading...";
const allowedMoods: string[] = ["calm", "happy", "romantic", "energetic", "focused", "sad", "confident", "angry", "motivated", "dreamy"];

const MoodPage = (): React.ReactNode => {

    const { moodName } = useParams();

    if (!allowedMoods.includes(String(moodName))) {
        // Optionally, redirect to home or show a custom 404
        return <Navigate to="/404" replace />;
    }

    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetching data from the database
    useEffect(() => {

        const docRef = ref(db, String(moodName));

        const fetchData = async () => {
            const fetchData = async () => {
	try {
		const docSnap = await get(docRef);

		if (docSnap.exists()) {
			const links = Object.values(docSnap.val()) as string[];

			const songsData: (Song | null)[] = await Promise.all(
				links.map(async (link: string) => {
					const trackId = extractTrackId(link);

					// Skip if trackId is missing or malformed (should be 22 chars alphanumeric)
					if (!trackId || !/^[a-zA-Z0-9]{22}$/.test(trackId)) {
						console.warn("Invalid or missing track ID:", link);
						return null;
					}

					try {
						const data = await getTrackInfo(trackId);

						const durationMin = Math.floor(data.duration_ms / 60000);
						const durationSec = Math.floor((data.duration_ms % 60000) / 1000)
							.toString()
							.padStart(2, "0");

						return {
							name: data.name,
							artist: Array.isArray(data.artists)
								? data.artists.map((a: any) => a.name).join(", ")
								: "",
							duration: `${durationMin}:${durationSec}`,
							link: link,
							isExplicit: data.explicit,
							isChecked: false
						} as Song;

					} catch (err) {
						console.warn("Failed to fetch Spotify data for:", trackId);
						return null;
					}
				})
			);

			setSongs(songsData.filter((song) => song !== null) as Song[]);
		}
	} catch (error) {
		console.error("Error fetching mood data:", error);
	} finally {
		setLoading(false);
	}
};

        };


        fetchData();

    }, []);

    return (
        <div className="min-h-screen flex flex-col">
	<Navbar />

	{/* Flex container for content */}
	<div className="flex-1 m-5 w-3/4 md:w-2/3 mx-auto flex flex-col md:flex-row gap-y-5 gap-x-4">

		{/* Make THIS scrollable */}
		<div className="flex-1 overflow-hidden max-h-[70vh] pr-2">
			<SongList
				moodName={moodName}
				songs={songs}
				loading={loading}
				loadingText={loadingText}
			/>
		</div>

		{/* Optional: Keep Options non-scrollable */}
		<div className="w-full md:w-72">
			<Options />
		</div>

	</div>
</div>


    );

};

export default MoodPage;
