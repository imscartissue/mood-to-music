// Callback.tsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const Callback = () => {
	const { hash } = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const params = new URLSearchParams(hash.substring(1));
		const token = params.get("access_token");
		const rawState = params.get("state");

		if (!token || !rawState) return;

		const { songs } = JSON.parse(decodeURIComponent(rawState));

		const createPlaylist = async () => {
			// 1. Get user ID
			const userRes = await fetch("https://api.spotify.com/v1/me", {
				headers: { Authorization: `Bearer ${token}` },
			});
			const userData = await userRes.json();

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

			// 3. Add songs
			await fetch(`https://api.spotify.com/v1/playlists/${playlistData.id}/tracks`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					uris: songs,
				}),
			});

			// 4. Redirect to playlist
			window.location.href = playlistData.external_urls.spotify;
		};

		createPlaylist();
	}, []);

	return <div>Creating your playlist…</div>;
};

export default Callback;
