import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { GET } from "@/app/api/exercises/target/[target]/route";
import { Request } from "node-fetch";

// Polyfill for global.URL in test environment
global.URL = require("url").URL;

const mockExercises = [
  { id: "001", name: "tricep dip", target: "triceps" },
  { id: "002", name: "overhead tricep extension", target: "triceps" }
];

describe("GET /api/exercises/target/[target]", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
    process.env.RAPIDAPI_KEY = "test-api-key";
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns 200 and exercise data for valid target", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockExercises,
    });

    const request = new Request("http://localhost:3000/api/exercises/target/triceps");

    const response = await GET(request, {
      params: { target: "triceps" },
    });

    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result).toEqual(mockExercises);
    expect(fetch).toHaveBeenCalledWith(
      "https://exercisedb.p.rapidapi.com/exercises/target/triceps",
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

    const request = new Request("http://localhost:3000/api/exercises/target/triceps");

    const response = await GET(request);
    const result = await response.text();

    expect(response.status).toBe(500);
    expect(result).toBe("Failed to fetch exercises by target");
  });
});
