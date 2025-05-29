// Callback.tsx
import { useEffect } from "react";
import { useLocation } from "react-router";

const Callback = () => {
	const { hash } = useLocation();

	useEffect(() => {
		const params = new URLSearchParams(hash.substring(1));
		const token = params.get("access_token");
		const rawState = params.get("state");

		if (!token || !rawState) {
			console.error("Missing token or state");
			return;
		}

		const { songs } = JSON.parse(decodeURIComponent(rawState));
		console.log("Decoded songs:", songs);

		const createPlaylist = async () => {
			try {
				// 1. Get user ID
				const userRes = await fetch("https://api.spotify.com/v1/me", {
					headers: { Authorization: `Bearer ${token}` },
				});
				const userData = await userRes.json();
				console.log("User data:", userData);

				if (!userData.id) throw new Error("Failed to get user ID");

				// 2. Create playlist
				const playlistRes = await fetch(`https://api.spotify.com/v1/users/${userData.id}/playlists`, {
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: "My Mood Playlist",
						description: "Created with Mood2Music 🎵",
						public: true,
					}),
				});
				const playlistData = await playlistRes.json();
				console.log("Playlist created:", playlistData);

				if (!playlistData.id) throw new Error("Failed to create playlist");

				// 3. Add songs
				const addTracksRes = await fetch(
					`https://api.spotify.com/v1/playlists/${playlistData.id}/tracks`,
					{
						method: "POST",
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							uris: songs,
						}),
					}
				);
				const addTracksData = await addTracksRes.json();
				console.log("Tracks added:", addTracksData);

				// 4. Redirect to playlist
				window.location.href = playlistData.external_urls.spotify;
			} catch (err) {
				console.error("Error creating playlist:", err);
			}
		};

		createPlaylist();
	}, []);

	return <div>Creating your playlist…</div>;
};

export default Callback;
