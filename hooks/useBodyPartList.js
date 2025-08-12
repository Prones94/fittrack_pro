import { useQuery } from "@tanstack/react-query";

async function fetchBodyPartList() {
  const res = await fetch("/api/exercises/bodyPartList")
  if (!res.ok) throw new Error("Failed to fetch body part list")
  return res.json()
}

export function useBodyPartList(){
  return useQuery({
    queryKey: ["bodyPartList"],
    queryFn: fetchBodyPartList,
    staleTime: 5 * 60_000,
  })
}