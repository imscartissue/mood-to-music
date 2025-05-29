import { create } from "zustand";
import type { Song } from "../elements/MoodPage";

type CheckedSongList = {
    songs: Array<Song>;
    add: (song: Song) => void;
    remove: (name: string) => void;
};

export const useCheckedSongList = create<CheckedSongList>((set) => ({
    songs: [],
    add: (song: Song) => set((state) => ({songs: [...state.songs, song]})),
    remove: (name: string) => set((state) => ({ songs: state.songs.filter((s) => s.name !== name) })),
}));