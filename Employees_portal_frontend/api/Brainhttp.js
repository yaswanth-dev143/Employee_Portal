export class Brainhttp {
  constructor() {
    this.http = new XMLHttpRequest();
  }

  //GET request
  get = (url, callback) => {
    this.http.open("GET", url, true);
    // this.http.setRequestHeader("Content-Type", "application/json");
    this.http.send();
    this.http.onload = () => {
      if (this.http.status === 200) {
        let data = this.http.responseText;
        let employees = JSON.parse(data);
        callback(null, employees);
      } else {
        callback(`error: ${this.http.status} `);
      }
    };
  };

  //POST request
  post = (url, employee, callback) => {
    this.http.open("POST", url, true);
    this.http.setRequestHeader("Content-Type", "application/json");
    this.http.send(JSON.stringify(employee));
    this.http.onload = () => {
      let data = this.http.responseText;
      let employees = JSON.parse(data);
      callback(employees);
    };
  };

  //PUT request
  put = (url, employee, callback) => {
    this.http.open("PUT", url, true);
    this.http.setRequestHeader("Content-Type", "application/json");
    this.http.send(JSON.stringify(employee));
    this.http.onload = () => {
      let data = this.http.responseText;
      let employees = JSON.parse(data);
      callback(employees);
    };
  };

  //DELETE request
  delete = (url, callback) => {
    this.http.open("DELETE", url, true);
    this.http.setRequestHeader("Content-Type", "application/json");
    this.http.send();
    this.http.onload = () => {
      let data = this.http.responseText;
      let employees = JSON.parse(data);
      callback(employees);
    };
  };
}
