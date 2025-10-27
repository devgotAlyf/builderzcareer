import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { exec } from 'https://deno.land/x/execute@v2.0.0/mod.ts'

serve(async (req) => {
  try {
    const { resumeData, theme = 'flat' } = await req.json()

    // Validate input
    if (!resumeData) {
      return new Response(
        JSON.stringify({ error: 'Resume data is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Create temporary directory
    const tempDir = `/tmp/resume-${Date.now()}`
    await Deno.mkdir(tempDir, { recursive: true })

    // Save resume data to JSON file
    const resumeJsonPath = `${tempDir}/resume.json`
    await Deno.writeTextFile(resumeJsonPath, JSON.stringify(resumeData, null, 2))

    try {
      // Generate PDF using resume-cli
      const outputPath = `${tempDir}/resume.pdf`
      const command = `resume export ${outputPath} --theme ${theme} --resume ${resumeJsonPath}`
      
      await exec(command, {
        cwd: tempDir,
        env: {
          ...Deno.env.toObject(),
          PATH: Deno.env.get('PATH') || '',
        }
      })

      // Read the generated PDF
      const pdfData = await Deno.readFile(outputPath)

      // Clean up temporary files
      try {
        await Deno.remove(tempDir, { recursive: true })
      } catch {
        // Ignore cleanup errors
      }

      // Return PDF as response
      return new Response(pdfData, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="resume-${theme}.pdf"`,
        },
      })
    } catch (error) {
      // Clean up on error
      try {
        await Deno.remove(tempDir, { recursive: true })
      } catch {
        // Ignore cleanup errors
      }

      console.error('PDF generation error:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to generate PDF', details: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }
  } catch (error) {
    console.error('Server error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})

