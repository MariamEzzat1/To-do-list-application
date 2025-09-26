import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Container, Button, Badge } from "react-bootstrap";

function TaskDetailView({ tasks }) {
  const { taskId } = useParams();
  const task = tasks.find((t) => t.id === Number(taskId));

  if (!task) {
    return (
      <Container className="mt-4 text-center">
        <h2>Task not found!</h2>
        <Button as={Link} to="/" variant="primary">
          Go Back Home
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Button as={Link} to="/" variant="outline-secondary" className="mb-3">
        &larr; Back to List
      </Button>
      <Card className="shadow-sm">
        <Card.Header
          as="h2"
          className="d-flex justify-content-between align-items-center"
        >
          {task.title}
          <Badge
            bg={task.isCompleted ? "success" : "warning"}
            className="fs-6 fw-normal"
          >
            {task.isCompleted ? "Completed" : "Pending"}
          </Badge>
        </Card.Header>
        <Card.Body>
          <p className="lead">{task.description || "No details provided."}</p>
        </Card.Body>
        <Card.Footer className="text-muted">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <strong>Tags: </strong>
              {task.tags?.length > 0
                ? task.tags.map((tag) => (
                    <Badge pill bg="primary" key={tag} className="me-1">
                      {tag}
                    </Badge>
                  ))
                : "None"}
            </div>
            <small>Created: {new Date(task.id).toLocaleString()}</small>
          </div>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default TaskDetailView;
