import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { Routes } from "../backend/router";
import { wsClient } from "./wsClient";

export const useWSQuery = <
  TController extends keyof Routes,
  TAction extends keyof Routes[TController] & string,
>(
  action: `${TController}.${TAction}`,
  // @ts-expect-error We dont care since this is internal api
  payload: Routes[TController][TAction]["validate"]["_input"],
  enabled?: boolean,
): UseQueryResult<
  // @ts-expect-error We dont care since this is internal api
  Awaited<ReturnType<Routes[TController][TAction]["handler"]>>
> => {
  return useQuery({
    queryKey: [action, payload],
    queryFn: async () => {
      const result = await wsClient.dispatch(action, payload);
      return result;
    },
    enabled,
  });
};

export const useWSMutation = <
  TController extends keyof Routes,
  TAction extends keyof Routes[TController] & string,
>(
  action: `${TController}.${TAction}`,
  onSuccess?: (
    data: Awaited<
      // @ts-expect-error We dont care since this is internal api
      ReturnType<Routes[TController][TAction]["handler"]>
    >,
  ) => void,
) => {
  return useMutation({
    // @ts-expect-error We dont care since this is internal api
    mutationFn: async (
      // @ts-expect-error We dont care since this is internal api
      payload: Routes[TController][TAction]["validate"]["_input"],
    ) => {
      const result = await wsClient.dispatch(action, payload);
      return result;
    },
    onSuccess,
  });
};

export const useWSInvalidation = <
  TController extends keyof Routes,
  TAction extends keyof Routes[TController] & string,
>() => {
  const queryClient = useQueryClient();
  return (action: `${TController}.${TAction}`) => {
    queryClient.invalidateQueries({ queryKey: [action] });
  };
};
