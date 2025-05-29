const clientId: string = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret:string = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

export const getAccessToken = async () => {
	const response = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization:
				"Basic " +
				btoa(`${clientId}:${clientSecret}`), // base64 encoded client credentials
		},
		body: "grant_type=client_credentials",
	});

	const data = await response.json();
	return data.access_token;
};




// Getting track info from string
export const getTrackInfo = async (trackId: string) => {
	const token = await getAccessToken();

	const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const data = await response.json();
	return data; // contains name, artists, etc.
};


// Extracting track id from the spotify URL
export const extractTrackId = (url: string): string => {
	const match = url.match(/track\/([a-zA-Z0-9]+)/);
	return match ? match[1] : "";
};

