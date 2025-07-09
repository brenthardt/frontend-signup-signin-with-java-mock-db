import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    age: "",
    status: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "firstName":
      case "lastName":
        if (!value.trim()) {
          error = `${
            name === "firstName" ? "First" : "Last"
          } Name is required.`;
        } else if (!/^[A-Za-z]+$/.test(value)) {
          error = `${
            name === "firstName" ? "First" : "Last"
          } Name must only contain letters.`;
        }
        break;

      case "age":
        if (!value.trim()) {
          error = "Age is required.";
        } else if (isNaN(value) || value <= 0 || value > 120) {
          error = "Age must be a valid number between 1 and 120.";
        }
        break;

      case "status":
        if (value === "Status" || value.trim() === "") {
          error = "Status is required.";
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "Email is required.";
        } else if (
          !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(value)
        ) {
          error = "Invalid email format.";
        }
        break;

      case "password":
        if (!value.trim()) {
          error = "Password is required.";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters long.";
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    return error === "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const isFormValid = Object.keys(user).every((key) =>
      validateField(key, user[key])
    );

    if (!isFormValid) {
      setErrorMessage("Please fix the errors above before submitting.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/users/signup",
        user
      );
      if (response.data === "User signed up successfully!") {
        setSuccessMessage("Signup successful!");
        setUser({
          firstName: "",
          lastName: "",
          age: "",
          status: "",
          email: "",
          password: "",
        });
        navigate("/signin");
      } else {
        setErrorMessage(response.data);
      }
    } catch (error) {
      setErrorMessage("Error signing up. Please try again. " + error);
    }
  };

  return (
    <div>
      <h4 className="text-center text-dark-emphasis">Sign Up</h4>
      <form
        onSubmit={handleSubmit}
        style={{ width: "380px" }}
        className="p-2 mx-auto bg-dark"
      >
        <div className="d-flex gap-4">
          <div>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="form-control"
              value={user.firstName}
              onChange={handleChange}
              required
              placeholder={"First Name"}
            />
            {errors.firstName && (
              <div className="text-danger">{errors.firstName}</div>
            )}
          </div>

          <div>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="form-control"
              value={user.lastName}
              onChange={handleChange}
              required
              placeholder={"Last Name"}
            />
            {errors.lastName && (
              <div className="text-danger">{errors.lastName}</div>
            )}
          </div>
        </div>

        <div className="d-flex gap-4 mt-2">
          <div>
            <input
              type="number"
              id="age"
              name="age"
              className="form-control"
              value={user.age}
              onChange={handleChange}
              required
              placeholder={"Age"}
            />
            {errors.age && <div className="text-danger">{errors.age}</div>}
          </div>

          <div>
            <select
              id="status"
              name="status"
              className="form-control"
              value={user.status}
              onChange={handleChange}
              required
            >
              <option value="">Status</option>
              <option value="SINGLE">Single</option>
              <option value="INRELATIONSHIP">In Relationship</option>
              <option value="MARRIED">Married</option>
              <option value="ENGAGED">Engaged</option>
            </select>
            {errors.status && (
              <div className="text-danger">{errors.status}</div>
            )}
          </div>
        </div>

        <div className="d-flex gap-4 mt-2">
          <div>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={user.email}
              onChange={handleChange}
              required
              placeholder={"Email"}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>

          <div>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={user.password}
              onChange={handleChange}
              required
              placeholder={"Password"}
            />
            {errors.password && (
              <div className="text-danger">{errors.password}</div>
            )}
          </div>
        </div>

        {errorMessage && (
          <div className="alert alert-danger w-100 mt-2">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="alert alert-success w-100 mt-2">{successMessage}</div>
        )}

        <button type="submit" className="btn btn-outline-secondary w-100 mt-2">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
