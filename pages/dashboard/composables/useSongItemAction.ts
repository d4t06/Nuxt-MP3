import { API_ENDPOINT } from "~/share/libs/appHelper";

export default function useSongItemAction() {
   const { token, data } = useAuth();

   const toastStore = useToastStore();

   const isFetching = ref(false);

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
         if (!data.value?.token) throw new Error("");

         const headers = new Headers();
         headers.set("Authorization", token.value!);

         isFetching.value = true;

         switch (props.variant) {
            case "delete":
               break;

            case "edit":
               await useFetch(`${API_ENDPOINT}/songs/${props.id}`, {
                  method: "PUT",
                  body: JSON.stringify(props.song),
                  headers,
               });

               toastStore.setSuccessToast("Edit song successful");
               break;
         }
      } catch (error: any) {
         console.log({ message: error });
         toastStore.setErrorToast();
      } finally {
         isFetching.value = false;
      }
   };

   return { action, isFetching };
}
