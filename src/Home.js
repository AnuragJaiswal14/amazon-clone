import React from 'react'
import "./Home.css"
import Product from "./Product.js"
function Home() {
    return (
        <div className="home">
            <div classname="home__container">
                <div className="slide__container">
                    <div className="image__container">
                        <img
                        className="home__image slider-image" 
                        src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/PC/Mayactivation/Accessoriesday1/D23140543_IN_CEPC_Electronicsaccessories_underRs999_3000x12000.5x._CB669031984_.jpg"
                        alt="Amazon Banner"
                        />
                    </div>
                </div>
               <div 
            className="home__row">
                <Product 
                id="12345"
                title='The lean Startup: How Constant Innovation Creates Radically Successful Business Paperback  '
                price={19.99}
                image={'https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400.jpg'} 
                rating={5}
                 />
                <Product
                id="45678"
                title="Kenwood kMix Stand Mixer for Baking, Stylist Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl"
                price={239.0}
                rating={4}
                image={'https://m.media-amazon.com/images/I/61oscgd0KXL._AC_UY654_FMwebp_QL65_.jpg'}/>
                
            </div>
            <div 
            className="home__row">
                <Product
                id="4903850"
                title="Samsung LC49RG905SSUXEN 49' Curved LED Gaming Monitor"
                price={199.99}
                rating={3}
                image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"/>
                
                <Product
                id="23445930"
                title="Amazon Echo (3rd generation) |Smart speaker with Alexa, Charcoal Fabric"
                price={98.99}
                rating={5}
                image="https://m.media-amazon.com/images/I/61QoZCzMx3L._AC_UY654_FMwebp_QL65_.jpg"
                />
                <Product
                id="3254354345"
                title="New Apple iPad Pro (12.9- inch, Wi-Fi, 126BG) - Silver (4th Generation)"
                price={598.99}
                rating={4}
                image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"/>
            </div>
            <div 
            className="home__row">
                <Product
                id="90829332"
                title="Samsung LC49RG905SSUXEN 49' Curved LED Gaming Monitor- Super Ultra Wide Dual WHQD 5120x 1440"
                price={1094.98}
                rating={4}
                image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
                />
            </div>
            </div>
            
        </div>
    )
}

export default Home

