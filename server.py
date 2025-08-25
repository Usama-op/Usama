from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import openai

app = FastAPI()
openai.api_key = "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"  # <- your API key

# Allow browser connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def chat(req: Request):
    data = await req.json()
    user_msg = data.get("message", "")
    lang = data.get("lang", "en")

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": f"You are a helpful assistant replying in {lang}."},
            {"role": "user", "content": user_msg}
        ]
    )
    return {"reply": response.choices[0].message.content}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)
