export interface user {
  name: string;
  email: string;
  password: string;
  img: string;
  playlists: {
    liked: {
      playlistName: string;
      playlistIcon: string;
      playlistSongs: string[];
    };
    [key: string]: {
      playlistName: string;
      playlistIcon: string;
      playlistSongs: string[];
    };
  };
}
export interface SelectedMusic {
  albumImg: string;
  musicName: string;
  duration: number;
  musicUrl: string;
}
