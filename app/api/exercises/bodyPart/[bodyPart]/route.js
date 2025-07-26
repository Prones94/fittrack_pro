export async function GET(request) {
  const bodyPart = request.nextUrl.pathname.split("/").pop();

  try {
    const res = await fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, {
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
      }
    });

    if (!res.ok) {
      console.error("API error (bodyPart):", res.status, await res.text());
      return new Response("Failed to fetch exercises by body part", { status: 500 });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    console.error("Server error (bodyPart):", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
