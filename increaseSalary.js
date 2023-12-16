
function increaseSalary() {
  // Write your code here
  console.log("here")
  return api.getEmployees()
  .then(employeesArray => {
    const salaries = employeesArray.map(item => item.salary);
    const minSalary = Math.min(...salaries);
    const minSalaryEmployee = employeesArray.find(item => item.salary === minSalary);
    const newSalary = minSalary * 1.2;

    console.log(newSalary)

    return api.setEmployeeSalary(minSalaryEmployee.id, newSalary);
  })
  .then(employee => {
    console.log(employee);
    api.notifyEmployee(employee.id, `Hello, ${employee.name}! Congratulations, your new salary is ${employee.salary}!`);
  })
  .catch(e => {
    api.notifyAdmin(e);
  });
}

const api = {
  _employees: [
    { id: 1, name: 'Alex', salary: 120000 },
    { id: 2, name: 'Fred', salary: 110000 },
    { id: 3, name: 'Bob', salary: 80000 },
  ],

  getEmployees() {
    return new Promise((resolve) => {
      resolve(this._employees.slice());
    });
  },

  setEmployeeSalary(employeeId, newSalary) {
    return new Promise((resolve) => {
      this._employees = this._employees.map((employee) =>
        employee.id !== employeeId
          ? employee
          : {
            ...employee,
            salary: newSalary,
          }
      );
      resolve(this._employees.find(({ id }) => id === employeeId));
    });
  },

  notifyEmployee(employeeId, text) {
    return new Promise((resolve) => {
      resolve(true);
    });
  },

  notifyAdmin(error) {
    return new Promise((resolve) => {
      resolve(true);
    });
  },

  setEmployees(newEmployees) {
    return new Promise((resolve) => {
      this._employees = newEmployees;
      resolve();
    });
  },
};

console.clear()

console.log(api._employees)

increaseSalary();

console.log(api._employees)
