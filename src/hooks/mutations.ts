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
    mutationFn: async ({ values, customHash }: { values: any; customHash: string }) => {
      return await updateProfileAction(values, customHash);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
  });
}