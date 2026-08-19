import asyncio
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .db import database

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8003",
        "http://127.0.0.1:8003",
        "http://localhost:4173",
        "https://jateng.apace-ai.com",
        "http://jateng.apace-ai.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def connect_database(retries: int = 10, delay: float = 1.0):
    last_error = None
    for attempt in range(1, retries + 1):
        try:
            await database.connect()
            return
        except Exception as exc:
            last_error = exc
            if database.is_connected:
                await database.disconnect()
            if attempt == retries:
                raise
            await asyncio.sleep(delay)
    raise last_error

@app.on_event("startup")
async def startup():
    await connect_database()

@app.on_event("shutdown")
async def shutdown():
    if database.is_connected:
        await database.disconnect()

@app.get("/api/health")
def health():
    return {"status": "ok"}

@app.get("/api/message")
def message():
    return {"message": "Hello from FastAPI backend!"}
