from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from main.models.models import TaskModel, HistoryModel, UserModel, StatusModel


def create_task(body, db: Session):
	try:
		# Verifica se o usuário existe
		user = db.query(UserModel).filter(UserModel.idt_usuario == body.idt_usuario).first()
		if not user:
			raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Usuário não encontrado")

		task = TaskModel(
			nom_tarefa=body.nom_tarefa,
			des_tarefa=body.des_tarefa,
			idt_usuario=body.idt_usuario,
			ind_ativo="True"
		)

		db.add(task)
		db.commit()
		db.refresh(task)

		# Cria histórico inicial com status = 1
		history = HistoryModel(
			idt_status=1,
			idt_tarefa=task.idt_tarefa
		)
		db.add(history)
		db.commit()
		db.refresh(history)

		return {
			"message": "Tarefa criada com sucesso",
			"task": {
				"id": task.idt_tarefa,
				"nom_tarefa": task.nom_tarefa,
				"idt_status": 1
			}
		}

	except HTTPException:
		raise
	except Exception:
		db.rollback()
		raise HTTPException(
			status_code=status.HTTP_400_BAD_REQUEST,
			detail="Erro ao criar tarefa"
		)


def create_history(idt_tarefa: int, body, current_user, db: Session):
	try:
		task = db.query(TaskModel).filter(TaskModel.idt_tarefa == idt_tarefa).first()

		if not task:
			raise HTTPException(
				status_code=status.HTTP_404_NOT_FOUND,
				detail="Tarefa não encontrada"
			)

		if task.idt_usuario != current_user.idt_usuario:
			raise HTTPException(
				status_code=status.HTTP_403_FORBIDDEN,
				detail="Acesso negado: você não é o dono desta tarefa"
			)

		status_exists = db.query(StatusModel).filter(StatusModel.idt_status == body.idt_status).first()
		if not status_exists:
			raise HTTPException(
				status_code=status.HTTP_400_BAD_REQUEST,
				detail="Status não encontrado"
			)

		history = HistoryModel(
			idt_status=body.idt_status,
			idt_tarefa=idt_tarefa
		)

		db.add(history)
		db.commit()
		db.refresh(history)

		return {
			"message": "Histórico criado com sucesso",
			"history": {
				"id": history.idt_historico,
				"idt_tarefa": history.idt_tarefa,
				"idt_status": history.idt_status
			}
		}

	except HTTPException:
		raise
	except Exception:
		db.rollback()
		raise HTTPException(
			status_code=status.HTTP_400_BAD_REQUEST,
			detail="Erro ao criar histórico"
		)
