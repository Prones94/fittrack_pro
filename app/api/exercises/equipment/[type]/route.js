export async function GET(request) {
  const type = request.nextUrl.pathname.split("/").pop();

  try {
    const res = await fetch(`https://exercisedb.p.rapidapi.com/exercises/equipment/${type}`, {
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
      }
    });

    if (!res.ok) {
      console.error("API error (equipment):", res.status, await res.text());
      return new Response("Failed to fetch exercises by equipment", { status: 500 });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    console.error("Server error (equipment):", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
