'use client'

import Image from 'next/image'

export default function ExerciseCard({ exercise }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full h-40 mb-4">
        <Image
          src={exercise.gifUrl}
          alt={exercise.name}
          fill
          className="object-contain rounded"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
        />
      </div>
      <h3 className="text-lg font-semibold capitalize">{exercise.name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {exercise.bodyPart} {exercise.target}
      </p>
    </div>
  )
}