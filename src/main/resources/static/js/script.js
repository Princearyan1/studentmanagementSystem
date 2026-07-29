let updateId = null;

const form = document.getElementById("studentForm");
const saveBtn = document.getElementById("saveBtn");

// =======================
// Add & Update Student
// =======================
form.addEventListener("submit", function (e) {

    e.preventDefault();

    const student = {
        name: document.querySelector("[name='name']").value,
        age: parseInt(document.querySelector("[name='age']").value),
        course: document.querySelector("[name='course']").value,
        email: document.querySelector("[name='email']").value
    };

    const url = updateId === null
        ? "/students"
        : "/students/" + updateId;

    const method = updateId === null
        ? "POST"
        : "PUT";

    fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    })
        .then(response => {

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            return response.json();
        })
        .then(data => {

            if (updateId === null) {
                alert("Student Added Successfully!");
            } else {
                alert("Student Updated Successfully!");
            }

            form.reset();
            updateId = null;
            saveBtn.innerText = "Save Student";

            location.reload();

        })
        .catch(error => {
            console.log(error);
            alert("Operation Failed!");
        });

});


// =======================
// Edit Student
// =======================
function editStudent(button) {

    const id = button.dataset.id;

    fetch("/students/" + id)
        .then(response => response.json())
        .then(student => {

            document.querySelector("[name='name']").value = student.name;
            document.querySelector("[name='age']").value = student.age;
            document.querySelector("[name='course']").value = student.course;
            document.querySelector("[name='email']").value = student.email;

            updateId = student.id;

            saveBtn.innerText = "Update Student";

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        })
        .catch(error => {
            console.log(error);
            alert("Unable to load student!");
        });

}


// =======================
// Delete Student
// =======================
function deleteStudent(id) {

    if (!confirm("Are you sure you want to delete this student?")) {
        return;
    }

    fetch("/students/" + id, {
        method: "DELETE"
    })
        .then(response => response.text())
        .then(message => {

            alert(message);

            location.reload();

        })
        .catch(error => {
            console.log(error);
            alert("Delete Failed!");
        });

}