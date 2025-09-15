import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  type UseMutationResult,
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from "@tanstack/react-query";
import type { Routes } from "../backend/router";
import { wsClient } from "./wsClient";
import type { z } from "zod";

export const useWSQuery = <
  TController extends keyof Routes,
  TAction extends keyof Routes[TController] & string,
>(
  action: `${TController}.${TAction}`,
  // @ts-expect-error We dont care since this is internal api
  payload: z.input<Routes[TController][TAction]["validate"]>,
  enabled?: boolean,
): UseQueryResult<
  // @ts-expect-error We dont care since this is internal api
  Awaited<ReturnType<Routes[TController][TAction]["handler"]>>
> => {
  // @ts-expect-error We dont care since this is internal api
  return useQuery({
    queryKey: [action, payload],
    queryFn: async () => {
      const result = await wsClient.dispatch(action, payload);
      return result;
    },
    enabled,
    placeholderData: keepPreviousData,
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
): UseMutationResult<
  // @ts-expect-error We dont care since this is internal api
  Awaited<ReturnType<Routes[TController][TAction]["handler"]>>,
  unknown,
  // @ts-expect-error We dont care since this is internal api
  Routes[TController][TAction]["validate"]["_input"]
> => {
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

export const useInfiniteGames = (user: string | null | undefined) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["game.getGames", { user }],
      enabled: !!user,
      queryFn: async ({ pageParam }) => {
        const result = await wsClient.dispatch("game.getGames", {
          user: user!,
          page: pageParam,
        });
        return result;
      },
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialPageParam: 0,
    });
  return {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
};
