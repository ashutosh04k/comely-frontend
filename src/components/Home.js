import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Home() {
    const [users, setUsers] = useState([]);
    let history = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error(error));
    }, []);

    function setID(id, name, age) {
        localStorage.setItem("id", id);
        localStorage.setItem("Name", name);
        localStorage.setItem("Age", age);
    }

    function deleted(id) {
        axios.delete(`http://localhost:5000/users/${id}`)
            .then(() => {
                setUsers(users.filter(user => user._id !== id));
                history("/");
            })
            .catch(error => console.error(error));
    }

    return (
        <div style={{ margin: "5rem" }}>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                                <td>
                                    <Link to={`/edit`}>
                                        <Button
                                            onClick={() =>
                                                setID(
                                                    user._id,
                                                    user.name,
                                                    user.age
                                                )
                                            }
                                            variant="info"
                                        >
                                            Update
                                        </Button>
                                    </Link>
                                </td>
                                <td>
                                    <Button
                                        onClick={() =>
                                            deleted(user._id)
                                        }
                                        variant="danger"
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <Link className="d-grid gap-2" to="/create">
                <Button variant="warning" size="lg">
                    Create
                </Button>
            </Link>
        </div>
    );
}

export default Home;