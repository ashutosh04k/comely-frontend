import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Edit() {
    const [name, setname] = useState("");
    const [age, setage] = useState("");
    const [id, setid] = useState("");

    let history = useNavigate();

    useEffect(() => {
        setname(localStorage.getItem("Name"));
        setage(localStorage.getItem("Age"));
        setid(localStorage.getItem("id"));
    }, []);

    const handelSubmit = (e) => {
        e.preventDefault();
        if (name === "" || age === "") {
            alert("invalid input");
            return;
        }
        axios.put(`http://localhost:5000/users/${id}`, { name, age })
            .then(() => history("/"))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <Form className="d-grid gap-2" style={{ margin: "5rem" }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        type="text"
                        placeholder="Enter Name"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                        value={age}
                        onChange={(e) => setage(e.target.value)}
                        type="number"
                        placeholder="Age"
                    />
                </Form.Group>
                <Button onClick={(e) => handelSubmit(e)} variant="primary" type="submit" size="lg">
                    Update
                </Button>
                <Link className="d-grid gap-2" to="/">
                    <Button variant="warning" size="lg">
                        Home
                    </Button>
                </Link>
            </Form>
        </div>
    );
}

export default Edit;