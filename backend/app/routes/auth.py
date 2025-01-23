from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict
import bcrypt

# Créer un routeur pour les routes d'authentification
router = APIRouter()

# Simule une base de données avec un dictionnaire
fake_users_db: Dict[str, str] = {}

# Modèle des données d'inscription et de connexion
class User(BaseModel):
    email: str
    password: str

# Endpoint d'inscription
@router.post("/signup")
def signup(user: User):
    if user.email in fake_users_db:
        raise HTTPException(status_code=400, detail="Email déjà enregistré")
    
    # Hachage du mot de passe
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
    
    # Stocke le mot de passe haché
    fake_users_db[user.email] = hashed_password.decode('utf-8')
    return {"message": "Utilisateur créé avec succès"}

# Endpoint de connexion
@router.post("/login")
def login(user: User):
    if user.email not in fake_users_db:
        raise HTTPException(status_code=401, detail="Identifiants invalides")
    
    stored_password = fake_users_db[user.email].encode('utf-8')
    print("Mot de passe stocké :", stored_password)
    
    # Vérifie si le mot de passe correspond au hash
    if not bcrypt.checkpw(user.password.encode('utf-8'), stored_password):
        raise HTTPException(status_code=401, detail="Identifiants invalides")
    
    return {"message": "Connexion réussie"}
