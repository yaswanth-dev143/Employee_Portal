const serverUrl = "http://127.0.0.1:9000/api";
//DOM Content loaded
window.addEventListener("DOMContentLoaded", () => {
  fetchAllEmployees();
});

let fetchAllEmployees = () => {
  let url = `${serverUrl}/employees`;
  axios
    .get(url)
    .then((response) => {
      let employees = response.data;
      let employeerow = ``;
      for (let employee of employees) {
        employeerow += `<tr>
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
      document.querySelector("#table-body").innerHTML = employeerow;
    })
    .catch((err) => {
      console.error(err);
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
  console.log(employee);
  let url = `${serverUrl}/employees`;
  Brainhttp.post(url, employee)
    .then((response) => {
      console.log(response.data);
      fetchAllEmployees();
    })
    .catch((err) => {
      console.error(err);
    });
  clearformFields();
});

let clearformFields = () => {
  document.querySelector("#f_name").value = " ";
  document.querySelector("#l_name").value = " ";
  document.querySelector("#email").value = " ";
  document.querySelector("#gender").value = " ";
  document.querySelector("#ip_add").value = " ";
  document.querySelector("#up_id").value = "";
  document.querySelector("#up_f_name").value = "";
  document.querySelector("#up_l_name").value = "";
  document.querySelector("#up_email").value = "";
  document.querySelector("#up_gender").value = "";
  document.querySelector("#up_ip_add").value = "";
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
    Brainhttp.delete(url)
      .then((response) => {
        console.log(response.data);
        fetchAllEmployees();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //click on update button
  if (tagetEle.classList.contains("update")) {
    let selectedId =
      tagetEle.parentElement.parentElement.firstElementChild.innerHTML;
    let url = `${serverUrl}/employees`;
    Brainhttp.get(url)
      .then((response) => {
        console.log(response.data);
        let employees = data;
        let selectedEmployee = employees.find((employee) => {
          return employee.id === selectedId.trim();
        });
        populatetheModel(selectedEmployee);
      })
      .catch((err) => {
        console.error(err);
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
  Brainhttp.put(url, employee)
    .then((response) => {
      console.log(response.data);
      fetchAllEmployees();
    })
    .catch((err) => {
      console.error(err);
    });
  clearformFields();
});

//completed
