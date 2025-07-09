import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/users/signin", {
        email,
        password,
      });

      if (response.data.success) {
        setError("");
        localStorage.setItem("token", response.data.token);
        navigate("/users");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h4 className="text-center">Sign In</h4>

      {error && (
        <div className="alert alert-danger text-center w-25 mx-auto">
          {error}
        </div>
      )}

      <form onSubmit={handleSignIn} className={"w-25 mx-auto"}>
        <div className="mb-3">
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder={"email"}
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder={"password"}
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-outline-dark w-100">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
