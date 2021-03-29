const router = require('express').Router();
const admin = require('firebase-admin');
const verifyToken = require('../middlewares');
const {employeeValidation} = require('../validation');

router.get('/getEmployeesByRestaurant/:restaurantId', (req, res) => {
    let db = admin.firestore();

    let restaurantId = req.params.restaurantId;
    
    let dataArray = [];
    db.collection('restaurants').doc(restaurantId).collection('employees').get()
    .then(snapshot => {
        snapshot.forEach(x => {
            dataArray.push({
                id: x.id,
                firstName: x.data().firstName,
                lastName: x.data().lastName,
                mobilePhone: x.data().mobilePhone,
                position: x.data().position,
                salary: x.data().salary
            });  
        })
        return res.status(200).send(dataArray); 
    }).catch((error) => {
            console.log(error);
            return res.status(400).send({error: error});
    });
}); 

router.get('/getEmployeesByRestaurantAndById/:restaurantId/:employeeId', (req, res) => {
    let db = admin.firestore();

    let restaurantId = req.params.restaurantId;
    let employeeId = req.params.employeeId;

    db.collection('restaurants').doc(restaurantId).collection('employees').doc(employeeId).get()
    .then((snapshot) => {
        const employee = {
            id: snapshot.id,
            firstName: snapshot.data().firstName,
            lastName: snapshot.data().lastName,
            mobilePhone: snapshot.data().mobilePhone,
            position: snapshot.data().position,
            salary: snapshot.data().salary
        }
        return res.status(200).send(employee); 
    }).catch((error) => {
        console.log(error);
        return res.status(400).send({error: error});
    });
});

router.post('/addEmployees/:restaurantId', verifyToken, (req, res) => {
    let db = admin.firestore();

    let restaurantId = req.params.restaurantId;

    let data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobilePhone: req.body.mobilePhone,
        position: req.body.position,
        salary: req.body.salary
    }

    const {error} = employeeValidation(req.body);
    if(error) return res.status(400).send({error: error.details[0].message});

    db.collection('restaurants').doc(restaurantId).collection('employees').add(data)
    .then(() => res.send({message: 'Employee added!'}))
    .catch((error) => {
        console.log(error);
        return res.status(400).send({error: error});
    });
});

router.post('/updateEmployees/:restaurantId/:employeeId', verifyToken, (req, res) => {
    let db = admin.firestore();

    let restaurantId = req.params.restaurantId;
    let employeeId = req.params.employeeId;

    console.log(req.body);

    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let mobilePhone = req.body.mobilePhone;
    let position = req.body.position;
    let salary = req.body.salary;

    const {error} = employeeValidation(req.body);
    if(error) return res.status(400).send({error: error.details[0].message});

    db.collection('restaurants').doc(restaurantId).collection('employees').doc(employeeId).update({
        firstName: firstName,
        lastName: lastName,
        mobilePhone: mobilePhone,
        position: position,
        salary: salary
    }).then(() => res.send({message: 'Employee updated!'}))
    .catch((error) => {
        console.log(error);
        return res.status(400).send({error: error})
    });
});

router.delete('/deleteEmployees/:restaurantId/:employeeId', verifyToken, (req, res) => {
    let db = admin.firestore();

    let restaurantId = req.params.restaurantId;
    let employeeId = req.params.employeeId;

    db.collection('restaurants').doc(restaurantId).collection('employees').doc(employeeId).delete()
    .then(() => res.send({message: 'Employee deleted!'}))
    .catch((error) => {
        console.log(error);
        return res.status(400).send({error: error})
    });
})

module.exports = router;    