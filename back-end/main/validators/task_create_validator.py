from pydantic import BaseModel, Field


class TaskCreateValidator(BaseModel):
    nom_tarefa: str = Field(..., min_length=1)
    des_tarefa: str = Field(..., min_length=1)
    idt_usuario: int
