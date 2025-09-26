import { useNavigate } from "react-router-dom";
import {
  Card,
  Container,
  Row,
  Col,
  Form,
  Badge,
  Button,
} from "react-bootstrap";
function TodoList({
  tasks,
  toggleTaskCompletion,
  onEdit,
  onDelete,
  totalTasksCount,
}) {
  const navigate = useNavigate();

  const handleCardClick = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  if (tasks.length === 0) {
    if (totalTasksCount === 0) {
      return (
        <Container className="text-center mt-5">
          <h2>Your to-do list is empty.</h2>
          <p className="lead text-muted">
            Add a new task above to get started!
          </p>
        </Container>
      );
    }
    return (
      <Container className="text-center mt-5">
        <h2>No tasks found.</h2>
        <p className="lead text-muted">
          Try adjusting your filters or add a new task!
        </p>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        {tasks?.map((element) => (
          <Col lg={4} md={6} key={element.id} className="mb-4">
            <Card
              className={`shadow-sm h-100 todo-card ${
                element.isCompleted ? "completed-task" : ""
              }`}
              onClick={() => handleCardClick(element.id)}
            >
              <Card.Body className="d-flex">
                <Form.Check
                  type="checkbox"
                  id={`task-${element.id}`}
                  checked={element.isCompleted}
                  onChange={(e) => {
                    toggleTaskCompletion(element.id);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="me-3"
                />
                <div className="d-flex flex-column w-100">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1 text-center">
                      <Card.Title className="mb-1">{element.title}</Card.Title>
                    </div>
                    <div className="d-flex">
                      <Button
                        variant="link"
                        size="sm"
                        className="p-0 text-decoration-none"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(element);
                        }}
                      >
                        ✏️
                      </Button>
                      <Button
                        variant="link"
                        size="sm"
                        className="p-0 text-decoration-none text-danger ms-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(element.id);
                        }}
                      >
                        🗑️
                      </Button>
                    </div>
                  </div>
                  <Card.Text className="flex-grow-1">
                    {element.description}
                  </Card.Text>
                  <div className="mt-auto pt-2">
                    {element.tags?.map((tag) => (
                      <Badge pill bg="primary" key={tag} className="me-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
export default TodoList;
