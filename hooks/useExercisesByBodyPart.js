import { useQuery } from "@tanstack/react-query"

async function fetchByBodyPart(bodyPart){
  const res = await fetch(`/api/exercises/bodyPart/${bodyPart}`)
  if (!res.ok) throw new Error("Failed to fetch exercises by body part")
  return res.json()
}

export function useExercisesByBodyPart(bodyPart){
  return useQuery({
    queryKey: ["exercisesByBodyPart", bodyPart],
    queryFn: () => fetchByBodyPart(bodyPart),
    enabled: !!bodyPart,
    staleTime: 60_000,
    keepPreviousData: true,
  })
}