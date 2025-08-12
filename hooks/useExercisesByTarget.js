import { useQuery } from "@tanstack/react-query"

async function fetchByTarget(target){
  const res = await fetch(`/api/exercises/target/${target}`)
  if (!res.ok) throw new Error("Failed to fetch exercises by target")
  return res.json()
}

export function useExercisesByTarget(target){
  return useQuery({
    queryKey:["exercisesByTarget", target],
    queryFn: () => fetchByTarget(target),
    enabled: !!target,
    staleTime: 60_000,
    keepPreviousData: true,
  })
}

