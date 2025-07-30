import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { GET } from "@/app/api/exercises/name/[name]/route";
import { Request } from "node-fetch";

// Polyfill for global.URL (needed for request.nextUrl)
global.URL = require("url").URL;

const mockExercises = [
  { id: "0001", name: "push-up" },
  { id: "0002", name: "pull-up" }
];

describe("GET /api/exercises/name/[name]", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
    process.env.RAPIDAPI_KEY = "test-api-key";
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns 200 and exercise data for valid name", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockExercises,
    });

    const request = new Request("http://localhost:3000/api/exercises/name/push");

    const response = await GET(request, {
      params: { name: "push" },
    });

    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result).toEqual(mockExercises);

    expect(fetch).toHaveBeenCalledWith(
      "https://exercisedb.p.rapidapi.com/exercises/name/push",
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
      status: 500,
    });

    const request = new Request("http://localhost:3000/api/exercises/name/push");

    const response = await GET(request);

    const result = await response.text();

    expect(response.status).toBe(500);
    expect(result).toBe("Failed to fetch exercises by name");
  });
});
