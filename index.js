import express from "express";

const app = express();

const USERS = [
    {
        id:1,
        name:'john',
        age: 24
    },
     {
        id:2,
        name:'lama',
        age: 26
    },
];

app.get('/', (req, res) => {
res.send("hello world test");
});

app.get('/users', (req, res) =>{
res.send(JSON.stringify(USERS));
});
app.get('/users/:id', (req, res) =>{
    const id = req.params.id;
    console.log(id);
    const user = USERS.find((user) => user.id === parseInt(id));
    if(!user){
        res.status(404).send('utilisateur non trouvé');
    }
    res.send(JSON.stringify(user))
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
console.log('Listen on running in 3000 $[PORT]');
});