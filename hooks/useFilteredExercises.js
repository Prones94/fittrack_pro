"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export function useFilteredExercises({ bodyPart, target, equipment }) {
  const queryKey = ['filtered-exercises', { bodyPart, target, equipment }]

  return useQuery({
    queryKey,
    queryFn: async () => {
      const params = {}
      if (bodyPart) params.bodyPart = bodyPart
      if (target) params.target = target
      if (equipment) params.equipment = equipment

      console.log("/api/exercises params:", params);
      const { data } = await axios.get("/api/exercises", { params })
      console.log("filtered data length:", Array.isArray(data) ? data.length : "n/a");
      return data
    },
    enabled: Boolean(bodyPart || target || equipment),
    keepPreviousData: true,
    staleTime: 60_000,
  })
}