from fastapi import FastAPI
from app.routes import auth  # Importer les routes auth
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Monter les routes auth (signup et login)
app.include_router(auth.router)

@app.get("/")
def read_root():
    return {"message": "Bienvenue sur l'API FastAPI"}

# Ajoute ce middleware à ton application
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Remplace par l'URL de ton frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
