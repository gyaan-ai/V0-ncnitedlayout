import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: Request) {
  try {
    const { hometown } = await request.json()

    console.log("=== DIRECT DATABASE UPDATE ===")
    console.log("Setting hometown to:", hometown)

    // Direct update with minimal query
    const result = await sql`
      UPDATE athletes 
      SET hometown = ${hometown}, updated_at = NOW()
      WHERE id = 'b1adf5a8-7887-4af1-935d-07267f186df9'
      RETURNING id, first_name, last_name, hometown, updated_at
    `

    console.log("=== DATABASE RESULT ===", result)

    if (result.length === 0) {
      return Response.json({ error: "No rows updated" }, { status: 404 })
    }

    return Response.json({
      success: true,
      result: result[0],
      message: `Updated hometown to: ${result[0].hometown}`,
    })
  } catch (error) {
    console.error("Database error:", error)
    return Response.json(
      {
        error: "Database error",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
