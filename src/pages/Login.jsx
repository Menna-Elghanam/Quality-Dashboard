// import React, { useState } from "react";
// import {Form, Input, Button} from "@nextui-org/react";

// import { useAuth } from "../context/AuthContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:3000/api/auth/login", {
//         email,
//         password,
//       });

//       login(res.data.token, res.data.role);
//       navigate("/records"); // Redirect based on role
//     } catch (error) {
//       console.error(error);
//       alert("Login failed");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;


import "../app.css"
import React, { useState } from "react";
import { Form, Input, Button, Card, CardHeader, CardBody } from "@nextui-org/react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdEmail, MdLock, MdLogin } from "react-icons/md";

const Login = () => {
  const [action, setAction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    setAction(`Processing login: ${JSON.stringify(formData)}`);

    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", JSON.stringify(formData), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      login(res.data.token, res.data.role);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
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
              <Button 
                type="reset" 
                variant="flat"
                className="min-w-24"
              >
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

            {/* {action && (
              <div className="text-small text-default-500 mt-4 p-2 bg-default-100 rounded-medium">
                Status: <code>{action}</code>
              </div>
            )} */}

            <div className="text-center text-sm text-default-500 mt-4">
              Don't have an account?{" "}
              <Button 
                as="a" 
                href="/signup" 
                variant="light" 
                className="text-primary"
              >
                Sign up
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;