import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { GET } from "@/app/api/exercises/bodyPart/[bodyPart]/route";
import { Request } from "node-fetch";

// Polyfill for global.URL (needed for route.js to work properly in Node test env)
global.URL = require("url").URL;

const mockExercises = [
  { id: "0001", name: "chest press", bodyPart: "chest" },
  { id: "0002", name: "push-up", bodyPart: "chest" }
];

describe("GET /api/exercises/bodyPart/[bodyPart]", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
    process.env.RAPIDAPI_KEY = "test-api-key"
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns 200 and exercise data for valid body part", async () => {
    const mockExercises = [{ id: "1", name: "bench press" }];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockExercises,
    });

    const request = new Request("http://localhost:3000/api/exercises/bodyPart/chest");

    const response = await GET(request, {
      params: { bodyPart: "chest" },
    });

    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result).toEqual(mockExercises);

    expect(fetch).toHaveBeenCalledWith(
      "https://exercisedb.p.rapidapi.com/exercises/bodyPart/chest",
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

    const request = new Request("http://localhost:3000/api/exercises/bodyPart/chest");

    const response = await GET(request);
    const result = await response.text();

    expect(response.status).toBe(500);
    expect(result).toBe("Failed to fetch exercises by body part");
  });
});
