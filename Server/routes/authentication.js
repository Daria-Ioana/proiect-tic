const router = require('express').Router();
const admin = require('firebase-admin');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../utils'); 
const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async(req, res) => {
    db = admin.firestore();

    const newUserBody = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    }

    const{error} = registerValidation(req.body);

    if(error) {
        return res.status(400).send({error: error.details[0].message});
    }

    let emailExists = false;
    try {
        const snapshot = await db.collection('users').get();
        snapshot.forEach(user => {
            if(user.data().email === newUserBody.email) {
                emailExists = true;
            }
        });
        if(emailExists) return res.status(400).send({error: 'The email already exists!'});

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(newUserBody.password, salt);

        newUserBody.password = hashPass;

        const response = await db.collection('users').add(newUserBody);

        console.log(response);
        return res.status(200).send({message: 'User have been added!', userId: response.id});
    }
    catch(err) {
        return res.status(400).send({error: 'Unexpected error'});
    }
})

router.post('/login', async(req, res) => {
    db = admin.firestore();

    const userBody = {
        email: req.body.email,
        password: req.body.password
    }

    console.log(userBody)

    const {error} = loginValidation(req.body);
    console.log(error);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    try{
        const snapshot = await db.collection('users').where('email', '==', userBody.email).get();
        if(snapshot.empty) return res.status(400).send({error: 'User has not been found!'});  

        const validPassword = await bcrypt.compare(userBody.password, snapshot.docs[0].data().password);
        console.log(validPassword);
        if(!validPassword) return res.status(400).send({error: 'Invalid password!'});

        const token = jsonwebtoken.sign({id: snapshot.docs[0].id}, TOKEN_SECRET);
        const response = {id: snapshot.docs[0].id, email: snapshot.docs[0].data().email, name: snapshot.docs[0].data().name, token: token};
        return res.header('auth-token', token).send(response);
    }
    catch(err) {
        return res.status(400).send({error: 'Unexpected error'});
    }
});

module.exports = router;