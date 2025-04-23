export async function GET() {
    try {
      const response = await fetch("http://localhost:8000/transcripts");  // Replace with your FastAPI URL
      if (!response.ok) {
        return new Response(JSON.stringify({ error: "Failed to fetch live transcriptions" }), { status: 500 });
      }
  
      const data = await response.json();
      return new Response(JSON.stringify({ transcripts: data.transcripts || [] }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error fetching live transcriptions:", error);
      return new Response(JSON.stringify({ error: "Failed to fetch live transcriptions" }), { status: 500 });
    }
  }
  