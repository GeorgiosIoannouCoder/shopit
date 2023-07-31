import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import { useLoginMutation } from "../slices/userSlice";
import { setCredentials } from "../slices/authSlice";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import googleImage from "../assets/googleImage.png";
import githubImage from "../assets/githubImage.png";

const LoginScreen = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();

  const sp = new URLSearchParams(search);

  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const googleLogin = () => {
    window.open("", "_self");
  };

  const githubLogin = () => {
    window.open("", "_self");
  };

  return (
    <FormContainer>
      <Meta
        title={"ShopIt | Spend Less | Smile More"}
        description={"ShopIt | Spend Less | Smile More"}
        key={"ShopIt | Spend Less | Smile More"}
      />
      <h1 style={{ color: "#e7eff6" }}>Log In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label style={{ color: "#e7eff6" }}>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label style={{ color: "#e7eff6" }}>Password</Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
          <div
            style={{
              transform: "translateX(94%) translateY(-130%)",
              cursor: "pointer",
            }}
            onClick={() => setShowPassword((prevState) => !prevState)}
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </div>
        </Form.Group>

        <Button disabled={isLoading} type="submit" variant="light">
          Log In
        </Button>

        {isLoading && <Loader />}
      </Form>

      <p
        style={{ color: "#ff0000" }}
        className="dark:text-custom-gold text-custom-gold font-semibold font-mono text-center"
      >
        Login with Google or GitHub
      </p>

      <div
        className="flex justify-center"
        style={{ transform: "translateX(38%)" }}
      >
        <button
          className="mx-2"
          onClick={googleLogin}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <img src={googleImage} alt="Google" width={40} />
        </button>
        <button
          className="mx-2"
          onClick={githubLogin}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <img src={githubImage} alt="GitHub" width={35} />
        </button>
      </div>

      <Row className="py-3" style={{ color: "#e7eff6" }}>
        <Col>
          New Customer?{" "}
          <Link
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
            style={{ color: "#d0a462" }}
          >
            Join
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
