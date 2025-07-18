import { useQueryClient } from "@tanstack/react-query";

/**
 * Custom hook to clear query cache for specified query keys.
 * This is useful for scenarios where you want to remove specific queries from the cache,
 * such as when data is no longer relevant or has been updated.
 */
export const useClearQueryCache = () => {
  const queryClient = useQueryClient();
  
  /**
   * Clears the cache for the specified query keys.
   * @param queryKeys - An array of query keys to clear from the cache.
   */
  const clearCache = (queryKeys: string[])=>  {
    queryClient.removeQueries({
      queryKey: queryKeys,
    })
  };

  return { clearCache };
}
