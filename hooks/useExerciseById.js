import { useQuery } from "@tanstack/react-query"

async function fetchById(id){
  const res = await fetch(`/api/exercises/${id}`)
  if (!res.ok) throw new Error("Failed too fetch exercise by id")
  return res.json()
}

export function useExerciseById(id){
  return useQuery({
    queryKey: ["exerciseById", id],
    queryFn: () => fetchById(id),
    enabled: !!id,
    staleTime: 60_000,
  })
}