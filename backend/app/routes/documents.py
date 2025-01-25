from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Document
import shutil
import os

router = APIRouter(prefix="/documents", tags=["Documents"])

UPLOAD_DIR = "./uploaded_files"

# Crée le dossier si non existant
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Endpoint pour uploader un document
@router.post("/upload")
async def upload_document(user_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        
        # Sauvegarder le fichier sur le serveur
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Ajouter le fichier dans la base de données
        document = Document(user_id=user_id, filename=file.filename, filepath=file_path)
        db.add(document)
        db.commit()
        db.refresh(document)

        return {"message": "File uploaded successfully", "document_id": document.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error uploading file")

# Endpoint pour récupérer tous les documents d'un utilisateur
@router.get("/")
def list_documents(user_id: int, db: Session = Depends(get_db)):
    documents = db.query(Document).filter(Document.user_id == user_id).all()
    return {"documents": documents}

# Endpoint pour supprimer un document
@router.delete("/{document_id}")
def delete_document(document_id: int, db: Session = Depends(get_db)):
    document = db.query(Document).filter(Document.id == document_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")

    # Supprimer le fichier du serveur
    if os.path.exists(document.filepath):
        os.remove(document.filepath)

    # Supprimer l'entrée de la base de données
    db.delete(document)
    db.commit()

    return {"message": "Document deleted successfully"}
