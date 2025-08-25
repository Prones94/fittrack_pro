"use client"
import React, { useState } from 'react';
import { useBodyPartList, useTargetList, useEquipmentList } from "@/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import FilterPill from '@/app/components/FilterPill'

export default function BrowseExercisesPage() {
  const [selectedBodyPart, setSelectedBodyPart] = useState(null)
  const [selectedTarget, setSelectedTarget] = useState(null)
  const [selectedEquipment, setSelectedEquipment] = useState(null)

  const {
    data: bodyParts,
    isLoading: bodyPartsLoading,
    isError: bodyPartsError,
  } = useBodyPartList()

  const {
    data: targets,
    isLoading: targetsLoading,
    isError: targetsError,
  } = useTargetList()

  const {
    data: equipment,
    isLoading: equipmentLoading,
    isError: equipmentError,
  } = useEquipmentList()

  if (bodyPartsLoading || targetsLoading || equipmentLoading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-6 w-48" />
      </div>
    )
  }

  if (bodyPartsError || targetsError || equipmentError) {
    return (
      <div className="p-6 text-red-600">
        Failed to load filters. Please try again.
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Body Parts</h2>
        <div className="flex flex-wrap gap-2">
          {bodyParts?.map(part => (
            <FilterPill key={part} label={part} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Targets</h2>
        <div className="flex flex-wrap gap-2">
          {targets?.map(target => (
            <FilterPill key={target} label={target} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Equipment</h2>
        <div className="flex flex-wrap gap-2">
          {equipment?.map(item => (
            <FilterPill key={item} label={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
