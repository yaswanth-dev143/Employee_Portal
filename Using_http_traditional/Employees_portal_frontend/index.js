import { Brainhttp } from "./api/Brainhttp.js";
const serverUrl = "http://127.0.0.1:9000/api";
//DOM Content loaded
window.addEventListener("DOMContentLoaded", () => {
  fetchAllEmployees();
});

let fetchAllEmployees = () => {
  let http = new Brainhttp();
  let url = `${serverUrl}/employees`;
  http.get(url, (err, employees) => {
    if (err) throw err;
    console.log(employees);
    let employeeRows = "";
    for (let employee of employees) {
      employeeRows += `
                        <tr>
                          <td>${employee.id}</td>
                          <td>${employee.first_name}</td>
                          <td>${employee.last_name}</td>
                          <td>${employee.email}</td>
                          <td>${employee.gender}</td>
                          <td>${employee.ip_address}</td>
                          <td>
                            <button class="btn btn-primary update" data-bs-toggle="modal"
                            data-bs-target="#updateModal" >Update</button>
                            <button class="btn btn-danger delete">Delete</button>
                          </td>
                      </tr>`;
    }
    document.querySelector("#table-body").innerHTML = employeeRows;
  });
};

//ADD employee
let addEmployeeform = document.querySelector("#form");
addEmployeeform.addEventListener("submit", (e) => {
  e.preventDefault(); // stops auto submition of forms
  let employee = {
    first_name: document.querySelector("#f_name").value,
    last_name: document.querySelector("#l_name").value,
    email: document.querySelector("#email").value,
    gender: document.querySelector("#gender").value,
    ip_address: document.querySelector("#ip_add").value,
  };
  let url = `${serverUrl}/employees`;
  let http = new Brainhttp();
  http.post(url, employee, (data) => {
    console.log(data);
    fetchAllEmployees();
    clearformFields();
  });
});

let clearformFields = () => {
  document.querySelector("#f_name").value = " ";
  document.querySelector("#l_name").value = " ";
  document.querySelector("#email").value = " ";
  document.querySelector("#gender").value = " ";
  document.querySelector("#ip_add").value = " ";
};

//cilck event on entire table

let tableBody = document.querySelector("#table-body");
tableBody.addEventListener("click", (e) => {
  let tagetEle = e.target;
  console.log(tagetEle);

  //click on delete button
  if (tagetEle.classList.contains("delete")) {
    let selectedId =
      tagetEle.parentElement.parentElement.firstElementChild.innerHTML;
    let url = `${serverUrl}/employees/${selectedId}`;
    let http = new Brainhttp();
    http.delete(url, (data) => {
      console.log(data);
      fetchAllEmployees();
    });
  }

  //click on update button
  if (tagetEle.classList.contains("update")) {
    let selectedId =
      tagetEle.parentElement.parentElement.firstElementChild.innerHTML;
    let http = new Brainhttp();
    let url = `${serverUrl}/employees`;
    http.get(url, (err, employees) => {
      if (err) throw err;
      let selectedEmployee = employees.find((employees) => {
        return employees.id === selectedId.trim();
      });
      populatetheModel(selectedEmployee);
    });
  }
});

let populatetheModel = (selectedEmployee) => {
  document.querySelector("#up_id").value = selectedEmployee.id;
  document.querySelector("#up_f_name").value = selectedEmployee.first_name;
  document.querySelector("#up_l_name").value = selectedEmployee.last_name;
  document.querySelector("#up_email").value = selectedEmployee.email;
  document.querySelector("#up_gender").value = selectedEmployee.gender;
  document.querySelector("#up_ip_add").value = selectedEmployee.ip_address;
};

let upadteEmployeeForm = document.querySelector("#update-form");
upadteEmployeeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let empId = document.querySelector("#up_id").value; //petina id ni calll cheyali
  let employee = {
    first_name: document.querySelector("#up_f_name").value,
    last_name: document.querySelector("#up_l_name").value,
    email: document.querySelector("#up_email").value,
    gender: document.querySelector("#up_gender").value,
    ip_address: document.querySelector("#up_ip_add").value,
  };
  let url = `${serverUrl}/employees/${empId}`;
  let http = new Brainhttp();
  http.put(url, employee, (data) => {
    console.log(data);
    fetchAllEmployees();
    clearformFields();
  });
});

//completed
