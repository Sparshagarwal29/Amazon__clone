import {card, removefromcard} from "../data/card.js";
import {product} from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {formatCurrency} from './money.js'
import {delivery} from '../data/deliveryOptions.js';
let cardSummary = '';

const today = dayjs()
const deliveryDay = today.add(7,'days');
const deliveryDayStr = deliveryDay.format('ddd,MMMM D,YYYY');
console.log(deliveryDayStr);
card.forEach((item) => {
    const productId = item.productId;
    let matchingProduct;
    product.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    });

    cardSummary +=`
    <div class="cart-item-container 
    js-card-item-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
               ${matchingProduct.name}
            </div>
            <div class="product-price">
                ₹${(matchingProduct.priceCents/100).toFixed(2)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label">${item.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                Update
                </span>
                <span class="delete-quantity-link link-primary js-delete" data-product-id="${matchingProduct.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            ${deliveryOptionHTML(matchingProduct)}
            </div>
        </div>
        </div>
    `;
});

function deliveryOptionHTML(matchingProduct) {
    let html = '';
    delivery.forEach((delivery) => {
        const today =dayjs();
        const deliveryDate = today.add(
            delivery.deliveryDays,
            'days'
        );
        const deliveryDateStr = deliveryDate.format('dddd, MMMM D');

        const priceString = delivery.priceCents === 0 ? 'FREE Shipping' : `र${formatCurrency(delivery.priceCents)} - Shipping`;
        html += `
            <div class="delivery-option">
                <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                <div>
                    <div class="delivery-option-date">
                        ${deliveryDateStr}
                    </div>
                    <div class="delivery-option-price">
                       ${priceString} - Shipping
                    </div>
                </div>
            </div>
        `       
    });
return html;
}
    
    document.querySelector('.js-order-summary').innerHTML = cardSummary;
    document.querySelectorAll('.js-delete').forEach((link) => {
        link.addEventListener('click', () => {
         const productId = link.dataset.productId;
         removefromcard(productId);


        const Container = document.querySelector(
            `.js-card-item-${productId}`
         );
         Container.remove();
        });
    });
