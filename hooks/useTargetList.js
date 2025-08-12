import { useQuery } from "@tanstack/react-query";

async function fetchTargetList(){
  const res = await fetch("/api/exercises/targetList")
  if (!res.ok) throw new Error("Failed to fetch target list")
  return res.json()
}

export function useTargetList() {
  return useQuery({
    queryKey: ["targetList"],
    queryFn: fetchTargetList,
    staleTim: 5 * 60_000,
  })
}