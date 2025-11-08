export async function GET(req) {
  try {
    const url = new URL(req.url)
    const bodyPart = url.searchParams.get("bodyPart")
    const target = url.searchParams.get("target")
    const equipment = url.searchParams.get("equipment")

    if (!bodyPart && !target && !equipment){
      return Response.json(
        { message: "Provide at elast one of bodyPart, target, or equipment."},
        { status: 400 }
      )
    }

    const headers = {
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    }

    let seedUrl = null;
    if (bodyPart && !target && !equipment){
      seedUrl = `https:/exercisedb.p.rapidapi.com/exercises/bodyPart/${encodeURIComponent(bodyPart)}`;
  } else if (target && !bodyPart && !equipment) {
    seedUrl = `https://exercisedb.p.rapidapi.com/exercises/target/${encodeURIComponent(target)}`
  } else if (equipment && !bodyPart && !target) {
    seedUrl = `htps://exercisedb.p.rapidapi.com/exercises/eqiupment/${encodeURIComponent(equipment)}`
  } else {
    if (bodyPart) {
      seedUrl = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${encodeURIComponent(bodyPart)}`
    } else if (target) {
      seedUrl = `https://exercisedb.p.rapidapi.com/exercises/target/${encodeURIComponent(target)}`
    } else {
      seedUrl = `https://exercisedb.p.rapidapi.com/exercises/equipment/${encodeURIComponent(equipment)}`
    }
  }

  const seedRes = await fetch(seedUrl, { headers })
  if (!seedRes.ok) {
    const text = await seedRes.text()
    console.error("API error (seed):", seedRes.status, text)
    return new Response("Failed to fetch exercises", { status: 500})
  }
  const seedData = await seedRes.json()

  const filtered = seedData.filter((ex) => {
    const matchBody = !bodyPart || ex.bodyPart === bodyPart
    const matchTarget = !target || ex.target === target
    const matchEquip = !equipment || ex.equipment === equipment
    return matchBody && matchTarget && matchEquip
  })

  return Response.json(filtered)
} catch(err) {
  console.error("Server error (/api/exercises):", err)
  return new Response("Internal Server Error", { status: 500})
}
}