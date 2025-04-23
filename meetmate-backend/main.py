from fastapi import FastAPI,Request
from fastapi.middleware.cors import CORSMiddleware
import os
import datetime

app = FastAPI()

# Enable CORS for all origins (be more restrictive in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (for development purposes)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Endpoint to accept POST request for transcriptions
@app.post("/transcripts")
async def receive_transcript(request: Request):
    try:
        payload = await request.json()
        print("🎙️ Transcription Received:", payload)

        # Extract the transcript (depends on the actual payload structure)
        transcript_text = payload.get("transcript") or str(payload)

        # Save to a local file (optional)
        now = datetime.datetime.now().strftime("%Y-%m-%d")
        os.makedirs("transcripts", exist_ok=True)
        with open(f"transcripts/{now}.txt", "a", encoding="utf-8") as f:
            f.write(transcript_text + "\n")

        return {"status": "received"}
    except Exception as e:
        return {"error": str(e)}

# Endpoint to return the live transcriptions (GET request)
@app.get("/transcripts")
def get_transcripts():
    try:
        now = datetime.datetime.now().strftime("%Y-%m-%d")
        file_path = f"transcripts/{now}.txt"
        
        if os.path.exists(file_path):
            with open(file_path, "r", encoding="utf-8") as file:
                transcripts = file.readlines()
                return {"transcripts": [line.strip() for line in transcripts]}
        else:
            return {"transcripts": []}
    except Exception as e:
        return {"error": str(e)}
