export default function useSongItemAction() {
   const isFetching = ref(false);
   const { token, status } = useAuth();

   const config = useRuntimeConfig();

   type Delete = {
      variant: "delete";
      song: Song;
   };

   type Edit = {
      variant: "edit";
      id: number;
      song: Partial<Song>;
   };

   const action = async (props: Delete | Edit) => {
      try {
         if (!token.value) throw new Error("");

         const headers = new Headers();
         headers.set("Authorization", token.value);

         isFetching.value = true;

         switch (props.variant) {
            case "delete":
               break;

            case "edit":
               await useFetch(`${config.public.apiBase}/songs/${props.id}`, {
                  method: "PUT",
                  body: JSON.stringify(props.song),
                  headers,
               });
               break;
         }
      } catch (error: any) {
         console.log({ message: error });
      } finally {
         isFetching.value = false;
      }
   };

   return { action, isFetching };
}
