import React,{useEffect, useState} from 'react';
import { Link,useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import { useStateValue } from './StateProvider';
import { useElements, useStripe, CardElement} from '@stripe/react-stripe-js';
import { getBasketTotal } from './reducer';
import CurrencyFormat from 'react-currency-format';
import axios from './axios';
import {db} from './firebase'

function Payment() {
    const [{basket,user},dispatch] = useStateValue();
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements(); 

    const [error,setError] = useState(null);
    const [succeeded, setSucceeded] = useState(false);
    const [processing,setProcessing] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [clientSecret,setClientSecret] = useState(true);

    useEffect(() => {
        const getClientSecret = async() =>{
            const response = await axios({
                method: 'post',
                //Stripe expects he total in a currencies sub  units
                url: `/payments/create?total=${getBasketTotal(basket)*100}`

            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    },[basket]);

    console.log('THE CLIENT SECRET IS>>>>',clientSecret)

    const handleSubmit = async(event) => {
            event.preventDefault();
            setProcessing(true);

            const payload = await stripe.confirmCardPayment(clientSecret,{
                payment_method: {
                    card: elements.getElement(CardElement)
                }
                }).then(({paymentIntent})=>{
                    //payment Intent =Payment confirmation
                    db.collection('users')
                    .doc(user?.uid)
                    .collection('orders')
                    .doc(paymentIntent.id)
                    .set({
                        basket:basket,
                        amount: paymentIntent.amount,
                        created: paymentIntent.created
                    })

                    setSucceeded(true);
                    setError(null)
                    setProcessing(false)
                    
                    dispatch({
                        type: 'EMPTY_BASKET'
                    })
                    history.replace('/orders')
                })
    }

    const handleChange= event=>{
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");

    }

    return (
        <div className="payment">
            <div className="payment__container">

                <h1> Checkout(
                    <Link to="/checkout"> {basket?.length>0?basket?.length+' Items':' No Item'}
                    </Link>)
                    </h1>
                {/* Payment Section-delivery Address */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address  </h3>
                    </div>
                    <div className="payment__address">
                        <p>
                            {user?user?.email:<strong>Username Not Found Please Log in</strong>}
                        </p>
                        <p>Your Know Your Address</p>
                        <p>As well as your State and Country</p>
                    </div>
                </div>
                {/* Payment Section -Items*/}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3> Review Items and Delivery</h3>
                    </div>
                    <div className="payment__items">
                    {basket.map(item =>(
                        <CheckoutProduct
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price = {item.price}
                        rating = {item.rating}
                        />
                    ))}
                    </div>
                </div>


                {/* Payment Section- Payment Method */}
                <div className="payment__section">
                    <div
                    className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    
                    <div
                    className="payment__details">
                        {/*Stripe  */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) =>(
                                    <>
                                    <h3> Order Total: {value}</h3>
                                    </>
                                    )} 
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeperator={true}
                                    prefix={"$"}
                               />
                               <button disabled={processing || disabled|| succeeded}>
                                   <span>{processing?<p>Processing</p>:'Buy Now' } </span>
                                    </button>
                               </div>
                               {error && <div>{error}</div> }
                        </form>
                       


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
