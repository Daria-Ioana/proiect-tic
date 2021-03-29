const router = require('express').Router();
const admin = require('firebase-admin');
const verifyToken = require('../middlewares');
const {restaurantValidation} = require('../validation');

router.get('/getRestaurants', (req, res) => {

    let db = admin.firestore();

    let dataArray = [];
    db.collection('restaurants').get().then(snapshot => {
        if(snapshot.empty){
            res.status(400).send({error: 'No records!'})
        } else {
            snapshot.forEach(x => dataArray.push({
                id: x.id,
                name: x.data().name,
                city: x.data().city,
                address: x.data().address,
                phone: x.data().phone,
                type: x.data().type
            }))
        }
        res.status(200).send(dataArray);
    }).catch((error) => {
        console.log(error);
        return res.status(400).send({error: 'Something went wrong!'});
    });
});

router.get('/getRestaurants/:id', (req, res) => {
    let db = admin.firestore();

    let id = req.params.id;

    db.collection('restaurants').doc(id).get().then((snapshot) => {
        const restaurant = {
            id: snapshot.id,
            name: snapshot.data().name,
            city: snapshot.data().city,
            address: snapshot.data().address,
            phone: snapshot.data().phone,
            type: snapshot.data().type
        }
        return res.status(200).send(restaurant);   
    }).catch((error) => {
        console.log(error);
        return res.status(400).send({error: 'Something went wrong!'});
    });
});

router.post('/addRestaurants', verifyToken, (req, res) => {
    let db = admin.firestore();

    let data = {
        name: req.body.name,
        city: req.body.city,
        address: req.body.address,
        phone: req.body.phone,
        type: req.body.type
    }

    console.log('here');

    const {error} = restaurantValidation(req.body);
    if(error) return res.status(400).send({error: error.details[0].message});

    db.collection('restaurants').add(data)
    .then(() => res.send({message: 'Restaurant added!'}))
    .catch((error) => {
        console.log(error);
        return res.status(400).send({error: 'Something went wrong!'});
    });
});

router.post('/updateRestaurants/:id', verifyToken, (req, res) => {
    let db = admin.firestore();

    let id = req.params.id;
    let name  = req.body.name;
    let city = req.body.city;
    let address = req.body.address;
    let phone = req.body.phone;
    let type = req.body.type;

    const {error} = restaurantValidation(req.body);
    if(error) return res.status(400).send({error: error.details[0].message});

    db.collection('restaurants').doc(id).update({
        name: name,
        city: city,
        address: address,
        phone: phone,
        type: type
    }).then(() => res.send({message: 'Restaurant updated!'}))
    .catch((error) => {
        console.log(error);
        return res.status(400).send({error: 'Something went wrong!'})
    });
});

router.delete('/deleteRestaurants/:id', verifyToken, (req, res) => {
    let db = admin.firestore();

    let id = req.params.id;

    db.collection('restaurants').doc(id).delete()
    .then(() => res.send({message: 'Restaurant deleted!'}))
    .catch((error) => {
        console.log(error);
        return res.status(400).send({error: 'Something went wrong!'});
    });
});

module.exports = router;