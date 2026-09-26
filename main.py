from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from agent import chat

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: List[Message] = []

class ChatResponse(BaseModel):
    response: str
    history: List[Message] = []

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest) -> ChatResponse:
    """
    Chat endpoint that accepts a message and returns the agent's response.
    """
    # Convert message history to format expected by agent
    chat_history = [
        {"role": msg.role, "content": msg.content}
        for msg in request.history
    ]

    # Get response from agent
    response_text = chat(request.message, chat_history)

    # Build updated history
    updated_history = request.history + [
        Message(role="user", content=request.message),
        Message(role="assistant", content=response_text),
    ]

    return ChatResponse(
        response=response_text,
        history=updated_history,
    )

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
