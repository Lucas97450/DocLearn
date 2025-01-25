from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth  # Importer les routes auth (signup et login)
from contextlib import asynccontextmanager
from app.database import init_db
from app.routes import documents


# Initialisation de l'application FastAPI
app = FastAPI()

# Middleware CORS pour autoriser les requêtes du frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],  # Remplace par l'URL de ton frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Utilisation de lifespan pour gérer les événements de démarrage et d'arrêt
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Démarrage de l'application
    init_db()
    yield  # Le code avant "yield" s'exécute au démarrage
    # Arrêt de l'application (si nécessaire, ajouter des tâches de nettoyage ici)
    print("Application arrêtée proprement.")

app = FastAPI(lifespan=lifespan)

# Ajouter les routes auth
app.include_router(auth.router)

# Route racine
@app.get("/")
def read_root():
    return {"message": "Bienvenue dans ton application avec lifespan!"}

app.include_router(documents.router)