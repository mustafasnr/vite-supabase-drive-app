import { updateProfileAction } from "@/actions/auth";
import { deleteFile } from "@/actions/file";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteFileMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (fileName: string) => {
      return await deleteFile(fileName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userFiles"] });
      if (onSuccessCallback) onSuccessCallback();
    },
  });
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ values }: { values: any; }) => {
      return await updateProfileAction(values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
  });
}