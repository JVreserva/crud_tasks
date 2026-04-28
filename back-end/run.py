import uvicorn
import os

if __name__ == "__main__":
    reload = os.getenv("ENV", "production") == "development"
    uvicorn.run(
        "main.server.server:app",
        host="0.0.0.0",
        port=8000,
        reload=reload,
    )