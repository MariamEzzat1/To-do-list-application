import { Form, Button, Card, Collapse } from "react-bootstrap";
import { useState } from "react";

function TodoForm({ addTask }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskTags, setTaskTags] = useState("");
  const [details, setDetails] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      const tagsArray = taskTags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);
      addTask({
        title: taskTitle,
        description: taskDescription,
        tags: tagsArray,
      });
      setTaskTitle("");
      setTaskDescription("");
      setTaskTags("");
      setDetails(false);
    }
  };

  return (
    <Card className="shadow-sm p-4 mb-3 bg-body-tertiary">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="taskInput" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Write your task..."
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="form-control-lg"
            />
          </Form.Group>

          <Collapse in={details}>
            <div>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Extra details..."
                  className="shadow-sm"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Tags (comma-separated, e.g., work, important)"
                  className="shadow-sm"
                  value={taskTags}
                  onChange={(e) => setTaskTags(e.target.value)}
                />
              </Form.Group>
            </div>
          </Collapse>

          <div className="d-flex gap-2">
            <Button
              type="button"
              variant={details ? "secondary" : "outline-secondary"}
              className="rounded-pill"
              onClick={() => setDetails((prev) => !prev)}
            >
              {details ? "Hide details" : "Add more details"}
            </Button>
            <Button type="submit" variant="primary" className="rounded-pill">
              + Add Task
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default TodoForm;
