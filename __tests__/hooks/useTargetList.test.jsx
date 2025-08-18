import { renderHook, waitFor} from "@testing-library/react"
import { vi, describe, it, beforeEach, afterEach, expect } from 'vitest'
import { createWrapper } from '../test-utils/react-query'
import { useTargetList } from "@/hooks/useTargetList"

describe('useTargetList', () => {
  beforeEach(() => { global.fetch = vi.fn() })
  afterEach(() => vi.restoreAllMocks())

  it('returns list on success', async () => {
    const mock = ['triceps', 'biceps', 'quads']
    fetch.mockResolvedValueOnce({ ok: true, json: async () => mock })

    const { result } = renderHook(() => useTargetList(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toEqual(mock)
    expect(fetch).toHaveBeenCalledWith('/api/exercises/targetList')
  })

  it('exposes error on failure', async () => {
    fetch.mockResolvedValueOnce({ ok:false})

    const { result } = renderHook(() => useTargetList(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error).toBeInstanceOf(Error)
  })
})