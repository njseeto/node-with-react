import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'

class Payments extends Component {
    render() {
        return (
            <StripeCheckout
                name='Emaily'
                description='$5 for 5 email credits'
                amount={500} // this equates to USD$5
                token={token => console.log(token)} // this expects to get a callback function, which calls the token received by Stripe.
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className='btn'>
                    ADD CREDITS
                </button>
            </StripeCheckout>
        )
    }
}

export default Payments