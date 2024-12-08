export let card = JSON.parse(localStorage.getItem('card'));
if(!card){
   card = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:2, 
        deliveryid:'1' 
    },{
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:1,  
        deliveryid: '2'
    }];
}


function saveTo() {
    localStorage.setItem('card', JSON.stringify(card));
}

export function addtocard(productId){
    let MatchingItem;

    card.forEach((item) => {
        if(productId ==  item.productId){
            MatchingItem = item;
        }
    });
    if(MatchingItem){
    MatchingItem.quantity += 1;
    } else{
      card.push({
          productId: productId,
          quantity:1,
          deliveryid: '1'
      }); 

    }
    saveTo();
}
export function removefromcard(productId){
    const newCard = [];
    card.forEach((item) => {
        if(productId != productId){
            newCard.push(item);
        }
    });
    card = newCard;

    saveTo();
}