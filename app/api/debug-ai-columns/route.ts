import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET() {
  try {
    // Check if AI columns exist
    const { data: columns, error: columnsError } = await supabase.rpc("exec_sql", {
      sql: `
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns 
        WHERE table_name = 'athletes' 
        AND column_name IN ('generated_headline', 'generated_bio')
        ORDER BY column_name;
      `,
    })

    if (columnsError) {
      console.error("Columns check error:", columnsError)
    }

    // Try to add the columns
    const { data: addResult, error: addError } = await supabase.rpc("exec_sql", {
      sql: `
        DO $$ 
        BEGIN
            IF NOT EXISTS (
                SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'athletes' AND column_name = 'generated_headline'
            ) THEN
                ALTER TABLE athletes ADD COLUMN generated_headline TEXT;
            END IF;

            IF NOT EXISTS (
                SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'athletes' AND column_name = 'generated_bio'
            ) THEN
                ALTER TABLE athletes ADD COLUMN generated_bio TEXT;
            END IF;
        END $$;
      `,
    })

    if (addError) {
      console.error("Add columns error:", addError)
    }

    // Test update with AI fields
    const testData = {
      generated_headline: "Test Headline",
      generated_bio: "Test Bio",
    }

    const { data: updateResult, error: updateError } = await supabase
      .from("athletes")
      .update(testData)
      .eq("id", "ce1bf191-623d-46dd-a0ca-5929e85871f1")
      .select()

    return NextResponse.json({
      success: true,
      columnsExist: columns,
      columnsError,
      addResult,
      addError,
      updateResult,
      updateError: updateError?.message,
    })
  } catch (error) {
    console.error("Debug error:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
