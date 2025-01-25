from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Dict
from sqlalchemy.orm import Session
from app.models import User
from app.database import SessionLocal
from app.utils import hash_password, verify_password

# Créer un routeur pour les routes d'authentification
router = APIRouter()

# Obtenir une session de la base de données
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/signup")
def signup_user(email: str, password: str, db: Session = Depends(get_db)):
    # Vérifie si l'utilisateur existe déjà
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Crée un nouvel utilisateur
    hashed_password = hash_password(password)
    new_user = User(email=email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created successfully", "user_id": new_user.id}

# Endpoint de connexion
@router.post("/login")
def login_user(email: str, password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.hashed_password):  # Vérifie le mot de passe
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {"message": "Login successful", "user_id": user.id}
