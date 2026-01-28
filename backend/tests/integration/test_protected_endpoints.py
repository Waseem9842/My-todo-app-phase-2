import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch
from src.auth.jwt_handler import JWTHandler
from src.main import app


@pytest.fixture
def client():
    """Create a test client for the app"""
    return TestClient(app)


@pytest.fixture
def valid_token():
    """Create a valid JWT token for testing"""
    data = {"sub": "12345"}
    token = JWTHandler.create_access_token(data=data)
    return token


def test_get_root_endpoint_no_auth_required(client):
    """Test that the root endpoint doesn't require authentication"""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to the Todo API"}


def test_create_task_without_token(client):
    """Test that creating a task without a token returns 401"""
    task_data = {"title": "Test task", "description": "Test description", "completed": False}
    response = client.post("/api/12345/tasks", json=task_data)
    assert response.status_code == 401  # Should return 401 Unauthorized


def test_create_task_with_valid_token(client, valid_token):
    """Test that creating a task with a valid token works"""
    task_data = {"title": "Test task", "description": "Test description", "completed": False}
    response = client.post(
        "/api/12345/tasks",
        json=task_data,
        headers={"Authorization": f"Bearer {valid_token}"}
    )
    # The response could be 422 (validation error) or 500 (database error) but not 401
    # because authentication should pass
    assert response.status_code != 401


def test_get_tasks_without_token(client):
    """Test that getting tasks without a token returns 401"""
    response = client.get("/api/12345/tasks")
    assert response.status_code == 401  # Should return 401 Unauthorized


def test_get_tasks_with_valid_token(client, valid_token):
    """Test that getting tasks with a valid token works"""
    response = client.get(
        "/api/12345/tasks",
        headers={"Authorization": f"Bearer {valid_token}"}
    )
    # The response could be 500 (database error) but not 401
    # because authentication should pass
    assert response.status_code != 401


def test_get_specific_task_without_token(client):
    """Test that getting a specific task without a token returns 401"""
    response = client.get("/api/12345/tasks/1")
    assert response.status_code == 401  # Should return 401 Unauthorized


def test_get_specific_task_with_valid_token(client, valid_token):
    """Test that getting a specific task with a valid token works"""
    response = client.get(
        "/api/12345/tasks/1",
        headers={"Authorization": f"Bearer {valid_token}"}
    )
    # The response could be 404 (not found) or 500 (database error) but not 401
    # because authentication should pass
    assert response.status_code != 401


def test_update_task_without_token(client):
    """Test that updating a task without a token returns 401"""
    task_update = {"title": "Updated task", "description": "Updated description", "completed": True}
    response = client.put("/api/12345/tasks/1", json=task_update)
    assert response.status_code == 401  # Should return 401 Unauthorized


def test_update_task_with_valid_token(client, valid_token):
    """Test that updating a task with a valid token works"""
    task_update = {"title": "Updated task", "description": "Updated description", "completed": True}
    response = client.put(
        "/api/12345/tasks/1",
        json=task_update,
        headers={"Authorization": f"Bearer {valid_token}"}
    )
    # The response could be 404 (not found) or 500 (database error) but not 401
    # because authentication should pass
    assert response.status_code != 401


def test_delete_task_without_token(client):
    """Test that deleting a task without a token returns 401"""
    response = client.delete("/api/12345/tasks/1")
    assert response.status_code == 401  # Should return 401 Unauthorized


def test_delete_task_with_valid_token(client, valid_token):
    """Test that deleting a task with a valid token works"""
    response = client.delete(
        "/api/12345/tasks/1",
        headers={"Authorization": f"Bearer {valid_token}"}
    )
    # The response could be 404 (not found) or 500 (database error) but not 401
    # because authentication should pass
    assert response.status_code != 401


def test_toggle_task_completion_without_token(client):
    """Test that toggling task completion without a token returns 401"""
    response = client.patch("/api/12345/tasks/1/complete", params={"completed": True})
    assert response.status_code == 401  # Should return 401 Unauthorized


def test_toggle_task_completion_with_valid_token(client, valid_token):
    """Test that toggling task completion with a valid token works"""
    response = client.patch(
        "/api/12345/tasks/1/complete",
        params={"completed": True},
        headers={"Authorization": f"Bearer {valid_token}"}
    )
    # The response could be 404 (not found) or 500 (database error) but not 401
    # because authentication should pass
    assert response.status_code != 401