"use client"
import React, { useState } from 'react';
import { useBodyPartList } from '../../../hooks/useBodyPartList';
import { useTargetList } from '../../../hooks/useTargetList';
import { useEquipmentList } from '../../../hooks/useEquipmentList';
import { Skeleton } from "../../../components/ui/skeleton";
import FilterPill from '../../components/FilterPill'

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
        <Skeleton data-testid="skeleton-pill" className="h-6 w-48" />
        <Skeleton data-testid="skeleton-pill" className="h-6 w-48" />
        <Skeleton data-testid="skeleton-pill" className="h-6 w-48" />
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
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      <section>
        <h2 className="text-xl font-bold mb-4">Filter by Body Part</h2>
        <div className="flex flex-wrap gap-2">
          {bodyPartsLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} data-testid="skeleton-pill" className="h-8 w-20 rounded-full" />
              ))
            : bodyParts?.map((item) => (
                <FilterPill
                  key={item}
                  label={item}
                  selected={selectedBodyPart === item}
                  onClick={() => setSelectedBodyPart(item)}
                />
              ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Filter by Target</h2>
        <div className="flex flex-wrap gap-2">
          {targetsLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} data-testid="skeleton-pill" className="h-8 w-24 rounded-full" />
              ))
            : targets?.map((item) => (
                <FilterPill
                  key={item}
                  label={item}
                  selected={selectedTarget === item}
                  onClick={() => setSelectedTarget(item)}
                />
              ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Filter by Equipment</h2>
        <div className="flex flex-wrap gap-2">
          {equipmentLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} data-testid="skeleton-pill" className="h-8 w-28 rounded-full" />
              ))
            : equipment?.map((item) => (
                <FilterPill
                  key={item}
                  label={item}
                  selected={selectedEquipment === item}
                  onClick={() => setSelectedEquipment(item)}
                />
              ))}
        </div>
      </section>
    </div>
  )
}
