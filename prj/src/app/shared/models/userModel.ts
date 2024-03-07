export interface user {
  name: string;
  email: string;
  password: string;
  img: string;
  playlists: {
    liked: string[];
  };
}
