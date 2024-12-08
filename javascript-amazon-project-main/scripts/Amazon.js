// gentreate the html again and agin and agin. I want to create a html page that will display the data from the database.
// important thing all the objects should have same propertie eg image,name (variable shoulld be same )
import {card, addtocard } from "../data/card.js";
import { product } from "../data/products.js";
let producthtml = '';
product.forEach((product)=>{
     producthtml  += `
            <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image"
                    src="${product.image}">
                </div>

                <div class="product-name limit-text-to-2-lines">
                    ${product.name}
                </div>

                <div class="product-rating-container">
                    <img class="product-rating-stars"
                    src="images/ratings/rating-${product.rating.stars *10}.png">
                    <div class="product-rating-count link-primary">
                       ${product.rating.count}
                    </div>
                </div>

                <div class="product-price">
                  ₹${(product.priceCents / 100).toFixed(2)} 
                </div>

                <div class="product-quantity-container">
                    <select>
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    </select>
                </div>

                <div class="product-spacer"></div>

                <div class="added-to-cart">
                    <img src="images/icons/checkmark.png">
                    Added
                </div>

                <button class="add-to-cart-button button-primary js-ADD-TO-CART"
                data-product-id = "${product.id}">
                    Add to Cart
                </button>
            </div>
            `;
});

document.querySelector('.js-products-gride').innerHTML = producthtml;

// function addtocard(productId){
//     let MatchingItem;
//     card.forEach((item) => {
//         if(productId ==  item.productId){
//             MatchingItem = item;
//         }
//     })
//     if(MatchingItem){
//     MatchingItem.quantity += 1;
//     } else{
//       card.push({
//           productId: productId,
//           quantity:1
//       });
//     }
// }
function updatecart(){

    let cardQuantity = 0; 
    card.forEach((item) => {
      cardQuantity += item.quantity;
    }) 
    document.querySelector('.js-card').innerHTML = cardQuantity;
}

document.querySelectorAll('.js-ADD-TO-CART').forEach((button)=>{
    button.addEventListener('click',() =>{
        const productId= button.dataset.productId;
     addtocard(productId);
     updatecart();
     });
});