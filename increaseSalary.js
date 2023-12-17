
// function increaseSalary() {
//   // Write your code here
//   console.log("here")
//   return api.getEmployees()
//   .then(employeesArray => {
//     const salaries = employeesArray.map(item => item.salary);
//     const minSalary = Math.min(...salaries);
//     const minSalaryEmployee = employeesArray.find(item => item.salary === minSalary);
//     const newSalary = minSalary * 1.2;

//     console.log(newSalary)

//     return api.setEmployeeSalary(minSalaryEmployee.id, newSalary);
//   })
//   .then(employee => {
//     console.log(employee);
//     api.notifyEmployee(employee.id, `Hello, ${employee.name}! Congratulations, your new salary is ${employee.salary}!`);
//   })
//   .catch(e => {
//     api.notifyAdmin(e);
//   });
// }

// async/await

async function increaseSalary() {
  try {
    const employees = await api.getEmployees();
    const allSalaries = employees.reduce((accum, item) => accum + item.salary, 0);
    const arithmeticMeanSalary = allSalaries / employees.length;
    let counter = 0;
    let totalSalaries = 0;

    for (let employee of employees) {
      let newSalary = 0;
      if (employee.salary < arithmeticMeanSalary) {
        newSalary = employee.salary * 1.2;
      } else {
        newSalary = employee.salary * 1.1;
      }

      try {
        employee = await api.setEmployeeSalary(employee.id, newSalary);
        counter++;
        totalSalaries += employee.salary;
        await api.notifyEmployee(employee.id, `Hello, ${employee.name}! Congratulations, your new salary is ${employee.salary}!`);
      } catch (e) {
        await api.notifyAdmin(e)
      }
    }

    await api.sendBudgetToAccounting(totalSalaries);

    return counter;
  } catch (e) {
    api.notifyAdmin(e);
  }
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
