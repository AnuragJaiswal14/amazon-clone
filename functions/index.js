const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")
('sk_test_51JEIjtSBg7COC17EKZg3PvZyhqvk0635xaOqsM2VNwEkFHJyjQodQOFZ2TnSxim2INskB3JywZNcvC299vfDAnmH00YIeym7Z6')

// -API

// -App Config
const app = express();
// -Middleware
app.use(cors({ origin: true}));
app.use(express.json());
// -API routes
app.get('/',(request,response) => response.status(200).send('hello world'))
app.post('/payments/create', async (request, response) =>{
    const total = request.query.total;

    console.log('Payment Request Recieved,',total)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})
//-Listen command

exports.api = functions.https.onRequest(app);

//Example endpoint
//http://localhost:5001/challenge-dae8b/us-central1/api