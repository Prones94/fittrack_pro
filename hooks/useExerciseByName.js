import { useQuery } from "@tanstack/react-query"

const fetchExercisesByName = async (name) => {
  const res = await fetch(`/app/exercises/name/${name}`)
  if (!res.ok) {
    throw new Error("Failed to fetch exercises by name")
  }
  return res.json()
}

export function useExercisesByName(name){
  return useQuery({
    queryKey: ["exercisesByName", name],
    queryFn: () => fetchExercisesByName(name),
    enabled: !!name,
  })
}