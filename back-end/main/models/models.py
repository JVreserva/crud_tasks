from sqlalchemy import Column, String, Integer
from ..connection import Base

class UserModel(Base):
    __tablename__ = "t_usuario"

    idt_usuario = Column(Integer, primary_key=True, index=True)
    des_email = Column(String(255), unique=True, index=True, nullable=False)
    des_senha = Column(String(255), nullable=False)