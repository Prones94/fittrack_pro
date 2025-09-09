"use client"
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import BrowseExercisesPage from '../../app/(public)/browse-exercises/page'
import { vi } from 'vitest'

// Mocks for the custom hooks
vi.mock('../../hooks/useBodyPartList', () => ({
  useBodyPartList: vi.fn(),
}))
vi.mock('../../hooks/useTargetList', () => ({
  useTargetList: vi.fn(),
}))
vi.mock('../../hooks/useEquipmentList', () => ({
  useEquipmentList: vi.fn(),
}))

import { useBodyPartList } from '../../hooks/useBodyPartList'
import { useTargetList } from '../../hooks/useTargetList'
import { useEquipmentList } from '../../hooks/useEquipmentList'

describe('BrowseExercisesPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders filter pills from each hook', () => {
    useBodyPartList.mockReturnValue({
      data: ['glutes', 'chest'],
      isLoading: false,
      isError: false,
    })
    useTargetList.mockReturnValue({
      data: ['quads', 'abs'],
      isLoading: false,
      isError: false,
    })
    useEquipmentList.mockReturnValue({
      data: ['dumbbell', 'barbell'],
      isLoading: false,
      isError: false,
    })

    render(<BrowseExercisesPage />)

    expect(screen.getByText('glutes')).toBeInTheDocument()
    expect(screen.getByText('chest')).toBeInTheDocument()
    expect(screen.getByText('quads')).toBeInTheDocument()
    expect(screen.getByText('abs')).toBeInTheDocument()
    expect(screen.getByText('dumbbell')).toBeInTheDocument()
    expect(screen.getByText('barbell')).toBeInTheDocument()
  })

  test('updates selected filter when a pill is clicked', () => {
    useBodyPartList.mockReturnValue({
      data: ['glutes', 'chest'],
      isLoading: false,
      isError: false,
    })
    useTargetList.mockReturnValue({ data: [], isLoading: false, isError: false })
    useEquipmentList.mockReturnValue({ data: [], isLoading: false, isError: false })

    render(<BrowseExercisesPage />)

    const glutesPill = screen.getByText('glutes')
    fireEvent.click(glutesPill)

    expect(glutesPill).toHaveClass('bg-primary')
  })

  test('only allows one selection per filter type', () => {
    useBodyPartList.mockReturnValue({
      data: ['glutes', 'chest'],
      isLoading: false,
      isError: false,
    })
    useTargetList.mockReturnValue({ data: [], isLoading: false, isError: false })
    useEquipmentList.mockReturnValue({ data: [], isLoading: false, isError: false })

    render(<BrowseExercisesPage />)

    const glutesPill = screen.getByText('glutes')
    const chestPill = screen.getByText('chest')

    fireEvent.click(glutesPill)
    expect(glutesPill).toHaveClass('bg-primary')

    fireEvent.click(chestPill)
    expect(glutesPill).not.toHaveClass('bg-primary')
    expect(chestPill).toHaveClass('bg-primary')
  })

  test('renders no pills when hooks return empty data', () => {
    useBodyPartList.mockReturnValue({ data: [], isLoading: false, isError: false })
    useTargetList.mockReturnValue({ data: [], isLoading: false, isError: false })
    useEquipmentList.mockReturnValue({ data: [], isLoading: false, isError: false })

    render(<BrowseExercisesPage />)

    expect(screen.getByText(/Filter By Body Part/i)).toBeInTheDocument()
    expect(screen.queryAllByTestId('filter-pill')).toHaveLength(0)
  })

  test('renders loading skeletons when data is loading', () => {
    useBodyPartList.mockReturnValue({ data: null, isLoading: true, isError: false })
    useTargetList.mockReturnValue({ data: null, isLoading: true, isError: false })
    useEquipmentList.mockReturnValue({ data: null, isLoading: true, isError: false })

    render(<BrowseExercisesPage />)

    const skeletons = screen.getAllByTestId('skeleton-pill')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  test('handles error state gracefully', () => {
    useBodyPartList.mockReturnValue({ data: null, isLoading: false, isError: true })
    useTargetList.mockReturnValue({ data: null, isLoading: false, isError: true })
    useEquipmentList.mockReturnValue({ data: null, isLoading: false, isError: true })

    render(<BrowseExercisesPage />)

    expect(screen.queryAllByTestId('filter-pill')).toHaveLength(0)
  })
})
