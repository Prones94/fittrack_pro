import { useQuery } from "@tanstack/react-query";

async function fetchEquipmentList() {
  const res = await fetch("/api/exercises/equipmentList")
  if (!res.ok) throw new Error("Failed to fetch equipment list")
  return res.json()
}

export function useEquipmentList(){
  return useQuery({
    queryKey: ["equipmentList"],
    queryFn: fetchEquipmentList,
    staleTime: 5 * 60_000,
  })
}