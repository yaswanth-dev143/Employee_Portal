const express = require("express");
const router = express.Router();

//employees data
let employees = [
  {
    id: "_asadsa",
    first_name: "jhon",
    last_name: "wilson",
    email: "jhon2@gmail.com",
    gender: "male",
    ip_address: "127.0.0.1",
  },
  {
    id: "_asadsay",
    first_name: "laura",
    last_name: "wilson",
    email: "laura2@gmail.com",
    gender: "female",
    ip_address: "987.0.0.1",
  },
];

//creating a unique id
let unId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// GET - Employees
router.get("/employees", (request, response) => {
  response.json(employees);
  console.log(
    `get request recieved at server.. ${new Date().toLocaleTimeString()}`
  );
});

//POST request - Employees
router.post("/employees", (request, response) => {
  let employee = {
    id: unId(),
    first_name: request.body.first_name,
    last_name: request.body.last_name,
    email: request.body.email,
    gender: request.body.gender,
    ip_address: request.body.ip_address,
  };
  employees.push(employee);
  console.log(
    `Post request recieved at server.. ${new Date().toLocaleTimeString()}`
  );
  response.json({ msg: "post request is success" });
});

//put request - Employees
router.put("/employees/:id", (request, response) => {
  let unId = request.params.id;
  let updatemployee = {
    id: unId,
    first_name: request.body.first_name,
    last_name: request.body.last_name,
    email: request.body.email,
    gender: request.body.gender,
    ip_address: request.body.ip_address,
  };
  let existemployee = employees.find((employee) => {
    return employee.id === unId;
  });
  employees.splice(employees.indexOf(existemployee), 1, updatemployee);
  console.log(
    `put request recieved at server.. ${new Date().toLocaleTimeString()}`
  );
  response.json({ msg: "put request is success" });
});

//DELETE request - employee
router.delete("/employees/:id", (request, response) => {
  let unId = request.params.id;

  employees = employees.filter((employee) => {
    return employee.id !== unId;
  });
  console.log(
    `delete request recieved at server.. ${new Date().toLocaleTimeString()}`
  );
  response.json({ msg: "delete request is success" });
});

module.exports = router;
