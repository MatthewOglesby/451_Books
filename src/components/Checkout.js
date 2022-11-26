import React from 'react';


const Checkout = () => { 

    return (
        <div>
            <form className='containerCheckout'> 
           <h4 style={{  textAlign: 'left'}} >Enter Credit Card Information Below</h4> 
            <p> First Name </p>
            <input type="text" id="fname" name="firstname" placeholder="Jane"></input>
            <p> Last Name </p>
            <input type="text" id="lname" name="lastname" placeholder="Doe"></input>
            <p> Shipping Address </p>
            <input type="text" id="saddress" name="shippingaddress" placeholder="1234 Street"></input>
        
            <p> City </p>
            <input type="text" id="city" name="city" placeholder="New Orleans" required></input>
            <p> State </p> 
            <input type="text" id="state" name="state" placeholder="LA" required></input>
            <p> Zip Code </p>
            <input type="text" id="zcode" name="zipcode" placeholder="11111" required></input>
            </form>
        
       
            <form className='containerCheckouts'> 
            <p style={{ textAlign: 'left' }} > Name on Card </p>
            <input type="text" id="cname" name="cardname" placeholder="Jane J. Doe" required></input>
            <p style={{ textAlign: 'left'}} > Credit Card Number </p>
            <input type="text" id="creditcard" name="creditcard" placeholder="1111 2222 3333 4444" required></input>
            <p style={{ textAlign: 'left' }} > Expiration Date </p>
            <input type="text" id="expirationdate" name="expirationdate" placeholder="11/23" required></input>
            <p style={{ textAlign: 'left' }} >CVV </p> 
            <input type="text" id="cvv" name="cvv" placeholder="999" required></input>


         

            <button  type="submit" > Submit Order </button>




    
            </form>

        


          
        </div>
 
    )
} 






export default Checkout;