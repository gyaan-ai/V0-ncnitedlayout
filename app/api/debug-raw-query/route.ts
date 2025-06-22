import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    console.log("=== RAW DATABASE QUERY ===")

    const result = await sql`
      SELECT id, first_name, last_name, hometown, updated_at 
      FROM athletes 
      WHERE id = 'b1adf5a8-7887-4af1-935d-07267f186df9'
    `

    console.log("=== RAW RESULT ===", result)

    return Response.json({
      success: true,
      athlete: result[0] || null,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Query error:", error)
    return Response.json(
      {
        error: "Query error",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
