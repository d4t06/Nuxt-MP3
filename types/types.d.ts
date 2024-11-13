type Song = {
   image_file_path: string;
   song_url: string;
   singer: string;
   size: number;
   song_file_path: string;
   name: string;
   duration: number;
   id: number;
   image_url: string;
};

type Tab = "playing" | "queue" | "lyric";

type Lyric = {
   start: number;
   end: number;
   text: string;
};

type SongLyric = {
   id: number | null;
   song_id: number;
   base_lyric: string;
   lyrics: string;
};

type LyricStatus = "active" | "done" | "coming";

type Toast = {
   variant: "success" | "error";
   desc: string;
   id: string;
};
