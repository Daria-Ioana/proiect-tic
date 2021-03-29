const router = require('express').Router();
const admin = require('firebase-admin');
const faker = require('faker');

router.post('/generateData', (req, res) => {
    const body = {
        noRestaurants: req.body.noRestaurants,
        noEmployees: req.body.noEmployees
    }
    console.log(body);

    const db = admin.firestore();
    for(let i=0; i<body.noRestaurants; i++) {
        const restaurant = {
            name: faker.company.companyName(),
            city: faker.address.city(),
            address: faker.address.streetAddress(),
            phone: faker.phone.phoneNumber(),
            type: faker.lorem.word(),
        };

        let refId;
        db.collection('restaurants').add(restaurant).then(ref => {
            refId = ref.id;
        })
        .then(() => {
            for(let i=0; i<body.noEmployees; i++) {
            employee = {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                mobilePhone: faker.phone.phoneNumber(),
                position: faker.name.jobTitle(),
                salary: faker.random.number()
            };
            db.collection('restaurants').doc(refId).collection('employees').add(employee).then((ref) => {
            });
        }
        }).then(() => {
            return res.status(200).send('Restaurants and employees generated!');
        }).catch(err => {
            console.log(err);
        })
    }
})

module.exports = router;