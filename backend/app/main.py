from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, documents  # Importer les routes auth et documents
from contextlib import asynccontextmanager
from app.database import init_db, Base, engine

# Utilisation de lifespan pour gérer les événements de démarrage et d'arrêt
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Démarrage de l'application
    print("Démarrage de l'application...")
    init_db()  # Initialisation de la base de données
    Base.metadata.create_all(bind=engine)  # Création des tables
    yield  # Point où l'application est en cours de fonctionnement
    # Arrêt de l'application
    print("Application arrêtée proprement.")

# Création de l'application FastAPI avec lifespan
app = FastAPI(lifespan=lifespan)

# Middleware CORS pour autoriser les requêtes du frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Remplace par l'URL de ton frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ajouter les routes auth et documents
app.include_router(auth.router)
app.include_router(documents.router)

# Route racine
@app.get("/")
def read_root():
    return {"message": "Bienvenue dans ton application avec lifespan!"}
