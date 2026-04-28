from pydantic import BaseModel, Field


class TaskHistoryValidator(BaseModel):
    idt_status: int = Field(..., gt=0)
