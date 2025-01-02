import "../app.css";
import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock, MdLogin } from "react-icons/md";
import { post } from "../services/http";
import { useLayoutEffect } from "react";

const Login = () => {
  const [action, setAction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user,login } = useAuth();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    localStorage.getItem("token") && navigate("/dashboard");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = Object.fromEntries(new FormData(e.currentTarget));
    setAction(`Processing login: ${JSON.stringify(formData)}`);

    try {
      const res = await post(
        "/api/auth/login",
        formData,
      );
      login(res.token, res.role); 
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Login failed. Please try again.");
      setAction(`Login failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-2 p-6">
          <div className="flex items-center justify-center gap-2">
            <MdLogin className="text-primary text-3xl" />
            <h2 className="text-2xl font-bold">Welcome Back</h2>
          </div>
          <p className="text-sm text-default-500 text-center">
            Please sign in to your account
          </p>
        </CardHeader>
        <CardBody>
          <Form
            className="flex flex-col gap-4"
            validationBehavior="native"
            onSubmit={handleSubmit}
            onReset={() => {
              setAction("Form reset");
              setIsLoading(false);
            }}
          >
            <Input
              isRequired
              label="Email"
              labelPlacement="outside"
              name="email"
              placeholder="Enter your email"
              type="email"
              errorMessage="Please enter a valid email"
              startContent={
                <MdEmail className="text-default-400 text-xl flex-shrink-0" />
              }
            />

            <Input
              isRequired
              label="Password"
              labelPlacement="outside"
              name="password"
              placeholder="Enter your password"
              type="password"
              errorMessage="Password is required"
              startContent={
                <MdLock className="text-default-400 text-xl flex-shrink-0" />
              }
            />

            <div className="flex gap-2 justify-end mt-4">
              <Button type="reset" variant="flat" className="min-w-24">
                Reset
              </Button>
              <Button
                color="primary"
                type="submit"
                isLoading={isLoading}
                className="min-w-24"
                startContent={!isLoading && <MdLogin className="text-xl" />}
              >
                {isLoading ? "loging in..." : "Log in"}
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
