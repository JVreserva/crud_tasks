from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from main.validators.task_create_validator import TaskCreateValidator
from main.validators.task_history_validator import TaskHistoryValidator
from main.validators.auth_user import get_current_user
from main.models.models import UserModel
from main.connection import get_db

from ..services import task_service


tasks_routes = APIRouter(prefix="/tasks", tags=["tasks"])


@tasks_routes.post("/create", status_code=status.HTTP_201_CREATED)
def create_task(
	body: TaskCreateValidator,
	db: Session = Depends(get_db)
):
	return task_service.create_task(body, db)


@tasks_routes.post("/{idt_tarefa}/history", status_code=status.HTTP_201_CREATED)
def create_history(
	idt_tarefa: int,
	body: TaskHistoryValidator,
	db: Session = Depends(get_db),
	current_user: UserModel = Depends(get_current_user)
):
	return task_service.create_history(idt_tarefa, body, current_user, db)