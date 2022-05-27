import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { registerViaForm, loginWithGoogle } from "../redux/actions/authActions";
import Swal from 'sweetalert2';

const FormRegister = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, error } = useSelector((state) => state.auth);
    useEffect(() => {
        if (error) {
            alert(error);
        }
    }, [error]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === "") {
            Swal.fire({
                position: 'top',
                icon: 'warning',
                title: 'Please enter your email',
                showConfirmButton: false,
                timer: 1000
            });
        }
        else if (password === "") {
            Swal.fire({
                position: 'top',
                icon: 'warning',
                title: 'Please enter your password',
                showConfirmButton: false,
                timer: 1000
            });
        }
        else if (name === "") {
            Swal.fire({
                position: 'top',
                icon: 'warning',
                title: 'Please enter your name',
                showConfirmButton: false,
                timer: 1000
            });
        }
        else {
            dispatch(registerViaForm({ email, password, name }));
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            dispatch(loginWithGoogle(tokenResponse.access_token));
        },
        onError: (error) => {
            alert(error);
        },
    });

    return (
        <>
            {!isAuthenticated ? (

                <Container className="card-body-form">
                    <Form onSubmit={handleSubmit}>
                        <h3>Register</h3>
                        <Form.Group className="my-3">
                            <label className="labelLogin">Name</label>
                            <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="my-3">
                            <label className="labelLogin">Email</label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="my-3">
                            <label className="labelLogin">Password</label>
                            <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>
                        <p className="sign-up text-right">
                            Have an Account? <Link as={Link} to="/login">Sign In?</Link>
                        </p>
                        <Button type="submit" className="col-12 border-0 btn-form mt-3">
                            Sign up
                        </Button>
                        <Button type="button" onClick={() => googleLogin()} className="col-12 border-0 btn-form mt-2">
                            <i className="bi bi-google me-2"></i>Sign In with Google
                        </Button>
                        <p className="text-center mt-2">
                            <Link as={Link} to="/">Back To Home</Link>
                        </p>
                    </Form>
                </Container>

            ) : (
                <Navigate to="/" />
            )}
        </>
    );
};

export default FormRegister;
