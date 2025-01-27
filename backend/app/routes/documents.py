from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Document  # Assurez-vous que ce modèle existe

router = APIRouter()

@router.get("/documents")
def get_documents(db: Session = Depends(get_db)):
    try:
        documents = db.query(Document).all()
        return documents
    except Exception as e:
        print(f"Erreur : {e}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")