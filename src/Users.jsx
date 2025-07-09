import axios from "axios";
import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("ALL");
  const [age, setAge] = useState([0, 100]);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, age]);

  function getUsers() {
    axios({
      url: `http://localhost:8080/users?status=${
        status !== "ALL" ? status : ""
      }&age=${age[0]}`,
      method: "GET",
    }).then(({ data }) => setUsers(data));
  }

  function StatusChange(event) {
    setStatus(event.target.value);
  }

  return (
    <>
      <div className={"d-flex"}>
        <table className={"table table-bordered mx-auto w-50 mt-4"}>
          <thead>
            <tr className={"text-center"}>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>
                <span>Age: {age[0]}</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={age[0]}
                  onChange={(e) => setAge([e.target.value, age[1]])}
                  className={"form-range"}
                />
              </th>
              <th>
                <select
                  className="form-select my-3"
                  value={status}
                  onChange={StatusChange}
                >
                  <option value="ALL">ALL</option>
                  <option value="INRELATIONSHIP">IN RELATIONSHIP</option>
                  <option value="ENGAGED">ENGAGED</option>
                  <option value="MARRIED">MARRIED</option>
                  <option value="SINGLE">SINGLE</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className={"text-center"}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.age}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Users;
