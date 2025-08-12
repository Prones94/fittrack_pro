import { useQuery } from "@tanstack/react-query"

async function fetchByEquipment(type) {
  const res = await fetch(`/api/exercises/equipment/${type}`)
  if (!res.ok) throw new Error("Failed to fetch exercises by equipment")
  return res.json()
}

export function useExercisesByEquipment(type){
  return useQuery({
    queryKey: ["exercisesByEquipment", type],
    queryFn: () => fetchByEquipment(type),
    enabled: !!type,
    staleTime: 60_000,
    keepPreviousData: true
  })
}