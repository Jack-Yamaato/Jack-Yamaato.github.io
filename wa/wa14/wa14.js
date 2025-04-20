// Problem 1: Create JSON for each employee
const employees = [
    {
      firstName: "Sam",
      department: "Tech",
      designation: "Manager",
      salary: 40000,
      raiseEligible: true
    },
    {
      firstName: "Mary",
      department: "Finance",
      designation: "Trainee",
      salary: 18500,
      raiseEligible: true
    },
    {
      firstName: "Bill",
      department: "HR",
      designation: "Executive",
      salary: 21200,
      raiseEligible: false
    }
  ];
  
  console.log("Problem 1 - Employees JSON:");
  console.log(employees);
  
  // Problem 2: Create JSON for the company
  const company = {
    companyName: "Tech Stars",
    website: "www.techstars.site",
    employees: employees
  };
  
  console.log("Problem 2 - Company JSON:");
  console.log(company);
  
  // Problem 3: Add new employee Anna
  const newEmployee = {
    firstName: "Anna",
    department: "Tech",
    designation: "Executive",
    salary: 25600,
    raiseEligible: false
  };
  
  company.employees.push(newEmployee);
  
  console.log("Problem 3 - After adding Anna:");
  console.log(company);
  
  // Problem 4: Calculate total salary
  let totalSalary = 0;
  company.employees.forEach(emp => {
    totalSalary += emp.salary;
  });
  
  console.log("Problem 4 - Total salary:");
  console.log(`$${totalSalary}`);
  
  // Problem 5: Apply raise to eligible employees
  function applyRaises(companyObj) {
    companyObj.employees.forEach(emp => {
      if (emp.raiseEligible) {
        emp.salary *= 1.1; // increase by 10%
        emp.raiseEligible = false;
      }
    });
  }
  
  applyRaises(company);
  
  console.log("Problem 5 - After raises applied:");
  console.log(company);
  
  // Problem 6: Working from home
  const wfhEmployees = ['Anna', 'Sam'];
  
  company.employees.forEach(emp => {
    emp.wfh = wfhEmployees.includes(emp.firstName);
  });
  
  console.log("Problem 6 - After adding wfh status:");
  console.log(company);
  