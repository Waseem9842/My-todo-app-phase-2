from sqlmodel import Session, select
from src.models.task_model import Task, TaskCreate, TaskUpdate, TaskRead
from typing import List, Optional
from fastapi import HTTPException


class TaskService:
    @staticmethod
    def create_task(session: Session, task_create: TaskCreate, user_id: int) -> Task:
        """Create a new task for a user"""
        db_task = Task(**task_create.dict(), owner_id=user_id)

        session.add(db_task)
        session.commit()
        session.refresh(db_task)
        return db_task

    @staticmethod
    def get_tasks_by_user(session: Session, user_id: int) -> List[Task]:
        """Get all tasks for a specific user"""
        statement = select(Task).where(Task.owner_id == user_id)
        tasks = session.exec(statement).all()
        return tasks

    @staticmethod
    def get_task_by_id(session: Session, task_id: int, user_id: int) -> Optional[Task]:
        """Get a specific task by ID for a specific user"""
        statement = select(Task).where(Task.id == task_id, Task.owner_id == user_id)
        task = session.exec(statement).first()
        return task

    @staticmethod
    def update_task(session: Session, task_id: int, user_id: int, task_update: TaskUpdate) -> Optional[Task]:
        """Update a specific task for a user"""
        statement = select(Task).where(Task.id == task_id, Task.owner_id == user_id)
        db_task = session.exec(statement).first()

        if not db_task:
            return None

        # Update only the fields that are provided
        for field, value in task_update.dict(exclude_unset=True).items():
            if hasattr(db_task, field):
                setattr(db_task, field, value)

        # Update the updated_at timestamp
        from datetime import datetime
        db_task.updated_at = datetime.now()

        session.add(db_task)
        session.commit()
        session.refresh(db_task)
        return db_task

    @staticmethod
    def toggle_task_completion(session: Session, task_id: int, user_id: int, completed: bool) -> Optional[Task]:
        """Toggle the completion status of a task for a user"""
        statement = select(Task).where(Task.id == task_id, Task.owner_id == user_id)
        db_task = session.exec(statement).first()

        if not db_task:
            return None

        db_task.completed = completed
        from datetime import datetime
        db_task.updated_at = datetime.now()

        session.add(db_task)
        session.commit()
        session.refresh(db_task)
        return db_task

    @staticmethod
    def delete_task(session: Session, task_id: int, user_id: int) -> bool:
        """Delete a specific task for a user"""
        statement = select(Task).where(Task.id == task_id, Task.owner_id == user_id)
        db_task = session.exec(statement).first()

        if not db_task:
            return False

        session.delete(db_task)
        session.commit()
        return True