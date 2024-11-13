export const chekcDisable = (b: boolean) => {
   return b ? "disabled" : "";
};

export const sleep = (time: number) => new Promise((rs) => setTimeout(rs, time));
