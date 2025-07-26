export async function GET(request) {
  const name = request.nextUrl.pathname.split("/").pop();

  try {
    const res = await fetch(`https://exercisedb.p.rapidapi.com/exercises/name/${name}`, {
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
      }
    });

    if (!res.ok) {
      console.error("API error (name):", res.status, await res.text());
      return new Response("Failed to fetch exercises by name", { status: 500 });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    console.error("Server error (name):", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
