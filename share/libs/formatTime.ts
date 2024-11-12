export const formatTime = (time: number) => {
   const minutes = Math.round(time / 60);
   const seconds = Math.round(time % 60);
   return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
