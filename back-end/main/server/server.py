from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from main.routes.user_routes import users_routes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_credentials=True,
    allow_headers=["*"],
)

app.include_router(users_routes)