from pydantic import BaseModel, EmailStr, Field

class UserRegisterValidator(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)