"use client"
import React, { useState } from "react"
import { useBodyPartList } from "../../../hooks/useBodyPartList"
import { useTargetList } from "../../../hooks/useTargetList"
import { useEquipmentList } from "../../../hooks/useEquipmentList"
import { Skeleton } from "@/components/ui/skeleton"
import FilterPill from "@/app/components/FilterPill"
import ExerciseCard from "@/app/components/ExerciseCard"
import { useFilteredExercises } from "@/hooks/useFilteredExercises"

export default function BrowseExercisesPage() {
  const [selectedFilters, setSelectedFilters] = useState({
    bodyPart: null,
    target: null,
    equipment: null,
  })

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

  const { data: exercises, isLoading: loadingExercises, isError: errorExercises } = useFilteredExercises({
    bodyPart: selectedFilters.bodyPart,
    target: selectedFilters.target,
    equipment: selectedFilters.equipment,
  })

  const handleFilterClick = (type, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [type]: prev[type] === value ? null : value,
    }))
  }

  const clearAllFilters = () => setSelectedFilters({ bodyPart: null, target: null, equipment: null})

  const renderFilterSection = (title, type, data, loading) => (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {loading
          ? Array.from({ length: 8 }).map((_, idx) => (
              <Skeleton key={idx} data-testid="skeleton-pill" className="h-8 w-20 rounded-full" />
            ))
          : data?.map(item => (
              <FilterPill
                key={item}
                label={item}
                selected={selectedFilters[type] === item}
                onClick={() => handleFilterClick(type, item)}
              />
            ))}
      </div>
    </section>
  )

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
      {renderFilterSection("Filter by Body Part", "bodyPart", bodyParts, bodyPartsLoading)}
      {renderFilterSection("Filter by Target", "target", targets, targetsLoading)}
      {renderFilterSection("Filter by Equipment", "equipment", equipment, equipmentLoading)}

      <section>
      <div className="mb-4 flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-xl font-bold mb-4">Exercises</h2>
        {(selectedFilters.bodyPart || selectedFilters.target || selectedFilters.equipment) && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1 rounded"
          >
            Clear All Filters
          </button>
        )}
      </div>

        {loadingExercises && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_,idx) => (
              <Skeleton key={idx} className="h-40 w-full rounded-md" />
            ))}
          </div>
        )}

        {!loadingExercises && errorExercises && (
          <div className="text-red-600">
            <h3>Failed to load exercises.Please try again.</h3>
          </div>
        )}

        {!loadingExercises && !errorExercises && (exercises?.length ?? 0) === 0 & (
          <div
            className="flex flex-col items-center justify-center gap-4 py-12 text-center text-muted-foreground"
            data-testid="no-results"
          >
            <p className="text-lg font-medium">No exercises found.</p>
            <p className="text-sm max-w-md">
              Try adjusting your filters or clera them to see all available exercises.
            </p>
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded">
              Clear All Filters
            </button>
          </div>
        )}
        {!loadingExercises && !errorExercises && (exercises?.length ?? 0) > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {exercises.map((ex) => (
              <ExerciseCard key={ex.id} exercise={ex} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
