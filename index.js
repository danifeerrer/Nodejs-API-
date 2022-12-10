const express = require('express');
const app = express();

app.use(express.json());

const students = [
    {id: 1, name: 'Mathew', age: 20, enroll: true},
    {id: 2, name: 'Billy', age: 30, enroll: false},
    {id: 3, name: 'Anthony', age: 25, enroll: true},
];

app.get('/', (req, res) => {
    res.send('Node JS api');
});

app.get('/api/students', (req, res) => {
    res.send(students);
});

app.get('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('Student is not present in our records');
    else res.send(student);
});

app.post('/api/students', (req, res) => {
    const student = {
        id: students.length + 1,
        name: req.body.name,
        age: parseInt(req.body.age),
        enroll: (req.body.enroll === 'true')
    }
    students.push(student);
    res.send(student);
});

app.delete('/api/students/:id', (req, res) => {
    const studentToDelete = students.find(c => c.id == parseInt(req.params.id));
    if(studentToDelete) {
        students.pop(studentToDelete);
        return res.status(200).send("Student Deleted");
    }
    else return res.status(404).send("This student doesn't exits in our records");
});


const port = process.env.port || 80;
app.listen(port, () => console.log(`Listening on port ${port}...`));