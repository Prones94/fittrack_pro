import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { GET } from "@/app/api/exercises/exercises/[id]/route";
import { Request } from "node-fetch";

// Polyfill for URL if needed
global.URL = require("url").URL;

const mockExercise = [
  { id: "0001", name: "squat", bodyPart: "legs" }
];

describe("GET /api/exercises/[id]", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
    process.env.RAPIDAPI_KEY = "test-api-key"; // Mock your env key
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns 200 and exercise data for a valid id", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockExercise,
    });

    const request = new Request("http://localhost:3000/api/exercises/0001");

    const response = await GET(request, {
      params: { id: "0001" },
    });

    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result).toEqual(mockExercise);

    expect(fetch).toHaveBeenCalledWith(
      "https://exercisedb.p.rapidapi.com/exercises/exercise/0001",
      expect.objectContaining({
        headers: expect.objectContaining({
          "X-RapidAPI-Key": expect.any(String),
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        }),
      })
    );
  });

  it("returns 500 if API call fails", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      text: async () => "Mock API failure",
      status: 500
    });

    const request = new Request("http://localhost:3000/api/exercises/0001");

    const response = await GET(request);
    const result = await response.text();

    expect(response.status).toBe(500);
    expect(result).toBe("Failed to fetch exercise by ID");
  });
});
