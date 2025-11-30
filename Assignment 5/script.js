// ---------- (i) Arithmetic Operations ----------
function calculate() {
  const num1 = parseFloat(document.getElementById("num1").value);
  const num2 = parseFloat(document.getElementById("num2").value);
  const result = document.getElementById("result1");

  if (isNaN(num1) || isNaN(num2)) {
    result.innerText = "Please enter valid numbers.";
    return;
  }

  const sum = num1 + num2;
  const diff = num1 - num2;
  const prod = num1 * num2;
  const quot = num2 !== 0 ? (num1 / num2).toFixed(2) : "Undefined";

  result.innerHTML = `
    Sum: ${sum}<br>
    Difference: ${diff}<br>
    Product: ${prod}<br>
    Quotient: ${quot}
  `;
}

// ---------- (ii) Array Operations ----------
function arrayOperations() {
  const input = document.getElementById("arrayInput2").value.trim();

  if (!input) {
    alert("Please enter some numbers!");
    return;
  }

  const numbers = input.split(",").map(n => parseFloat(n.trim()));

  const largest = Math.max(...numbers);
  const smallest = Math.min(...numbers);
  const ascending = [...numbers].sort((a, b) => a - b);
  const descending = [...numbers].sort((a, b) => b - a);

  document.getElementById("result2").innerHTML = `
    Original Array: ${numbers}<br>
    Largest: ${largest}<br>
    Smallest: ${smallest}<br>
    Ascending: ${ascending}<br>
    Descending: ${descending}
  `;
}

// ---------- (iii) Form Validation ----------
function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const age = parseInt(document.getElementById("age").value);
  const message = document.getElementById("message");

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (name === "") {
    message.textContent = "Name cannot be empty.";
    return false;
  }
  if (!emailPattern.test(email)) {
    message.textContent = "Invalid email format.";
    return false;
  }
  if (isNaN(age) || age < 18 || age > 100) {
    message.textContent = "Age must be between 18 and 100.";
    return false;
  }

  message.textContent = "Form submitted successfully!";
  return false; // prevent reload
}

// ---------- (iv) Student Object ----------
function studentInfo() {
  const name = document.getElementById("studentName").value.trim();
  const age = document.getElementById("studentAge").value.trim();
  const grade = document.getElementById("studentGrade").value.trim();

  if (!name || !age || !grade) {
    document.getElementById("result4").innerHTML = "Please fill all fields!";
    return;
  }

  const student = {
    name,
    age,
    grade,
    class: "12th"
  };

  let output = "<b>Student Information:</b><br>";
  for (let key in student) {
    output += `${key}: ${student[key]}<br>`;
  }

  document.getElementById("result4").innerHTML = output;
}

// ---------- (v) map(), filter(), reduce() ----------
function processArray() {
  const input = document.getElementById("arrayInput5").value.trim();

  if (!input) {
    alert("Please enter numbers first!");
    return;
  }

  const arr = input.split(",").map(n => parseInt(n.trim()));

  const even = arr.filter(num => num % 2 === 0);
  const doubled = even.map(num => num * 2);
  const sum = doubled.reduce((acc, val) => acc + val, 0);

  document.getElementById("result5").innerHTML = `
    Original Array: ${arr}<br>
    Even Numbers: ${even}<br>
    Doubled (Even × 2): ${doubled}<br>
    Sum: ${sum}
  `;
}
