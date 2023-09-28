// Import necessary libraries
const fs = require('fs');
const faker = require('faker');
function generateRandomGroup() {
    const groups = [
      'Sales',
      'Marketing',
      'Engineering',
      'Human Resources',
      'Finance',
      'Customer Support',
      'Research and Development',
      'Product Management',
      'IT Operations',
      'Quality Assurance',
    ];
    const randomIndex = Math.floor(Math.random() * groups.length);
    return groups[randomIndex];
  }
  
  // Generate fake data
  function generateFakeEmployee(i) {
    const id = i + 1;
    const username = faker.internet.userName();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const birthDate = `${faker.date.past().toLocaleDateString()}, ${faker.date.future().toLocaleTimeString()}`;
    const basicSalary = faker.random.number({ min: 5000, max: 20000 });
    const status = faker.random.arrayElement(['Active', 'Inactive']);
    const group = generateRandomGroup();
    const description = `Employee in the ${group} Department`;
  
    return {
      id,
      username,
      firstName,
      lastName,
      email,
      birthDate,
      basicSalary,
      status,
      group,
      description,
    };
  }
  
  // Generate a list of fake employees
  const employees = [];
  function generateFakeEmployees(count) {
    for (let i = 0; i < count; i++) {
      employees.push(generateFakeEmployee(i));
    }
    return employees;
  }
  
  // Set the number of employees you want to generate
  const numberOfEmployees = 190; // Change this as needed
  
  // Generate fake employee data
  const fakeEmployees = generateFakeEmployees(numberOfEmployees);

  // Convert data to JSON format
  const jsonData = JSON.stringify(employees, null, 2);

  // Write the JSON data to db.json
  fs.writeFileSync('data.json', jsonData, 'utf8');