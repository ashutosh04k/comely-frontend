import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Create = () => {
    const [name, setname] = useState("");
    const [age, setage] = useState("");

    let history = useNavigate();

    const handelSubmit = (e) => {
        e.preventDefault();
        if (name === "" || age === "") {
            alert("invalid input");
            return;
        }
        axios.post('http://localhost:5000/users', { name, age })
            .then(() => history("/"))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <Form className="d-grid gap-2" style={{ margin: "5rem" }}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        onChange={(e) => setname(e.target.value)}
                        type="text"
                        placeholder="Enter Name"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAge">
                    <Form.Control
                        onChange={(e) => setage(e.target.value)}
                        type="number"
                        placeholder="Age"
                        required
                    />
                </Form.Group>
                <Button onClick={(e) => handelSubmit(e)} variant="primary" type="submit">
                    Submit
                </Button>
                <Link className="d-grid gap-2" to="/">
                    <Button variant="info" size="lg">
                        Home
                    </Button>
                </Link>
            </Form>
        </div>
    );
};

export default Create;