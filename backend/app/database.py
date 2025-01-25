from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session
from contextlib import contextmanager

DATABASE_URL = "sqlite:///./app.db"  # Utilise SQLite pour l'instant

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def init_db():
    # Logique pour initialiser la base de données
    Base.metadata.create_all(bind=engine)

@contextmanager
def get_db():
    """Génère une session de base de données."""
    db = SessionLocal()  # Crée une session locale à partir de `SessionLocal`
    try:
        yield db  # Fournit la session à l'appelant
    finally:
        db.close()  # Ferme la session à la fin