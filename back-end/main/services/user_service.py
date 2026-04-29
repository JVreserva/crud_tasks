from jose import jwt, JWTError
from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from main.models.models import UserModel, HistoryModel
from main.validators.auth_user import (
    hash_password,
    authenticate_user,
    create_access_token,
    create_refresh_token
)
from decouple import config

SECRET_KEY = config("SECRET_KEY")
ALGORITHM = config("ALGORITHM")


def create_user(body, db: Session):
    try:
        hashed_password = hash_password(body.password)

        user = UserModel(
            des_email=body.email,
            des_senha=hashed_password
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        return {
            "message": "User registered successfully",
            "user": {
                "id": user.idt_usuario,
                "email": user.des_email
            }
        }

    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Erro ao criar usuário"
        )


def login_user(body, db: Session):
    user = authenticate_user(body.email, body.password, db)

    access_token = create_access_token({
        "sub": str(user.idt_usuario)
    })

    refresh_token = create_refresh_token({
        "sub": str(user.idt_usuario)
    })

    return {
        "message": "Login realizado com sucesso",
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }


def refresh_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        if payload.get("type") != "refresh":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token inválido"
            )

        user_id = payload.get("sub")

        new_access_token = create_access_token({
            "sub": user_id
        })

        return {
            "access_token": new_access_token,
            "token_type": "bearer"
        }

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido"
        )


def logout_user(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return {"message": "Logout realizado com sucesso"}
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido"
        )