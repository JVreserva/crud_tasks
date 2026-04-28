from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from fastapi import HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError

from main.validators.user_register_validator import UserRegisterValidator
from main.models.models import UserModel
from main.connection import get_db
from main.validators.auth_user import hash_password, authenticate_user, create_access_token, create_refresh_token
from decouple import config

users_routes = APIRouter(prefix="/users", tags=["users"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/login")

SECRET_KEY = config('SECRET_KEY')
ALGORITHM = config('ALGORITHM')

@users_routes.post("/register", status_code=status.HTTP_201_CREATED)
def register_user(
    body: UserRegisterValidator,
    db: Session = Depends(get_db)
):
    try:
        
        hashed_password = hash_password(body.password)

        user = UserModel(
            des_email=body.email,
            des_senha=hashed_password
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        #log abaixo
        print(f"User registered: {user.des_email}")

        return {
            "message": "User registered successfully",
            "user": {
                "id": user.idt_usuario,
                "email": user.des_email
            }
        }

    except IntegrityError:
        db.rollback()
        return {
            "message": "Email já cadastrado"
        }

    except Exception as e:
        db.rollback()
        return {
            "message": "Error registering user",
            "error": str(e)
        }
    

@users_routes.post("/login", status_code=status.HTTP_200_OK)
def login_user(
    body: UserRegisterValidator,
    db: Session = Depends(get_db)
):
    
    user = authenticate_user(body.email, body.password, db)

    token = create_access_token({
        "sub": str(user.idt_usuario)
    })

    refresh_token = create_refresh_token({
        "sub": str(user.idt_usuario)
    })


    return {
        "message": "Login realizado com sucesso",
        "access_token": token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

@users_routes.post("/refresh")
def refresh_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Token inválido")

        user_id = payload.get("sub")

        new_access_token = create_access_token({
            "sub": user_id
        })

        return {
            "access_token": new_access_token,
            "token_type": "bearer"
        }

    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido")