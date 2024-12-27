import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import { post } from "../services/http";
import Loader from "../components/Loader";
import { ToastContainer , toast } from "react-toastify";

function Configration() {
  const [streamUrl, setStreamUrl] = useState("");
  const [aIUrl, setAIUrl] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const [isLoading, setIsLoading] = useState();

  async function handleSubmitConfigration() {
    try {
      setIsLoading(true);

      if (!streamUrl || !aIUrl || !secretKey) {
        toast.error("All fields are required",
          {
            position : "bottom-right",
          }
        );
        setIsLoading(false);
        return;
      }
      
      await post("/api/config", {
        streamUrl,
        aIUrl,
        secretKey,
      });

      setIsLoading(false);

      toast.success("Configration Done Successfully",
        {
          position : "bottom-right",
        }
      );


      // console.log(response);
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong",
        {
          position : "bottom-right",
        }
      );
      console.error(error);
    }
  }

  async function handleSubmitUser() {
    try {
      setIsLoading(true);
      if (!name || !email || !password || !confirmPassword || !role) {
        toast.error("All fields are required",
          {
            position : "bottom-right",
          }
        );
        setIsLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Passwords do not match",
          {
            position : "bottom-right",
          }
        );
        setIsLoading(false);
        return;
      }
      await post("/api/auth/register", {
        name,
        email,
        password,
        role,
      });
      toast.success("User created successfully",
        {
          position : "bottom-right",
        }
      );
      setIsLoading(false);

    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong",
        {
          position : "bottom-right",
        }
      );
      console.error(error);
    }
  }

  return (
    <div className="p-10">
      <Loader isLoading={isLoading} />
      <ToastContainer />
      <Card className="p-10" shadow>
        <CardHeader>Configration</CardHeader>
        <CardBody>
          <Form isRequired onSubmit={handleSubmitConfigration} className="grid grid-cols-2 gap-6">
            <Input
              isRequired
              onChange={(e) => setStreamUrl(e.target.value)}
              label="Stream Url"
              placeholder="Enter your Stream Url"
            />
            <Input
              isRequired
              onChange={(e) => setAIUrl(e.target.value)}
              label="AI Url"
              placeholder="Enter your AI Url"
            />
            <Input
              isRequired
              onChange={(e) => setSecretKey(e.target.value)}
              label="Secret Key"
              placeholder="Enter your Secret Key"
            />
          </Form>
        </CardBody>
        <CardFooter>
          <Button onPress={handleSubmitConfigration} color="primary">
            Submit
          </Button>
        </CardFooter>
      </Card>
      {/* <Divider className="my-4" /> */}
      <Card className="p-10 mt-10">
        <CardHeader>Users</CardHeader>
        <CardBody>
          <Form className="grid grid-cols-2 gap-6">
            <Input
              isRequired
              onChange={(e) => setName(e.target.value)}
              label="Name"
              placeholder="Enter User Name"
            />
            <Input
              isRequired
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              placeholder="Enter User Email"
            />
            <Input
              isRequired
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="Enter User Password"
            />
            <Input
              isRequired
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="Confirm Password"
              placeholder="Enter Confirm Password"
            />
            <Select label="Role" placeholder="Select Role" isRequired onChange={(e) => setRole(e.target.value)}>
              <SelectItem key={"User"} value={"User"} title="User"></SelectItem>
              <SelectItem key={"Admin"} value={"Admin"} title="Admin"></SelectItem>
              </Select>
          </Form>
        </CardBody>
        <CardFooter>
          <Button onPress={handleSubmitUser} color="primary">
            Create User
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Configration;
