import {addToCart,cart,loadfromstroage} from "../../data/cart.js";

describe('Test suite: addTocart' , () =>{
    it('should add item to cart', () => {
        spyOn(localStorage,'setItem');    
        spyOn (localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
            }]);
        });
  
        loadfromstroage();    

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);        
    });


    it('adding new product', ()=>{
     spyOn(localStorage,'setItem');


        spyOn (localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
       console.log(localStorage.getItem('cart'));
        loadfromstroage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);


    });
});