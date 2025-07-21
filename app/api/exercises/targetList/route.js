export async function GET() {
  try {
    const res = await fetch("https://exercisedb.p.rapidapi.com/exercises/targetList", {
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
      }
    });

    if (!res.ok) {
      console.error("API error (targetList):", res.status, await res.text());
      return new Response("Failed to fetch target list", { status: 500 });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    console.error("Server error (targetList):", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}