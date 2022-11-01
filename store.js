if(document.readyState=='loading'){
    document.addEventListener("DOMContentLoaded",ready)
}else{
    ready();
}

function ready(){
    
    var removeCartItemButtons=document.getElementsByClassName("btn-danger");

    for(var i=0;i<removeCartItemButtons.length;i++){
        var button = removeCartItemButtons[i];
        button.addEventListener("click",removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName("cart-quantity-input");
    for(var i =0;i<quantityInputs.length;i++){
        var input = quantityInputs[i];
        input.addEventListener("change",quantityChanged);//Change event
    }

    var addToCartButtons= document.getElementsByClassName("shop-item-button");
    for(var i=0;i<addToCartButtons.length;i++){
        var button = addToCartButtons[i];
        button.addEventListener("click",addToCartClicked);
    }

    document.getElementsByClassName("btn-purchase")[0].addEventListener("click",purchaseClicked);

}

function purchaseClicked(){
    alert("Thank you for your purchase");
    var cartItems= document.getElementsByClassName("cart-items")[0];
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}

function removeCartItem(event){
    var buttonClicked=event.target;
    buttonClicked.parentElement.parentElement.remove(); //remove cart-row
    updateCartTotal();
}

function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value<=0){
        input.value =1;
    }
    updateCartTotal();
}

function addToCartClicked(event){
    var button= event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName("shop-item-title")[0].innerHTML;
    var price = shopItem.getElementsByClassName("shop-item-price")[0].innerHTML;
    var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
    addItemToCart(title,price,imageSrc);
    updateCartTotal();
}

function addItemToCart(title,price,imageSrc){
    var cartRow = document.createElement("div"); //add to "cart-items"
    cartRow.classList.add("cart-row");
    var cartItems = document.getElementsByClassName("cart-items")[0];
    var cartItemNames = cartItems.getElementsByClassName("cart-item-title");

    console.log(cartItemNames);
    for(var i =0;i<cartItemNames.length;i++){
        if(cartItemNames[i].innerHTML== title){
            alert("This item is already added to the cart");
            return;
        }
    }
    var cartRowContents =`
                    <div class="cart-item cart-column">
                        <img class="cart-item-image"src=${imageSrc} >
                        <span class="cart-item-title">${title}</span>
                    </div>
                    <span class="cart-price cart-column">${price}</span>
                    <div class="cart-quantity cart-column">
                        <input class="cart-quantity-input" type="number" value="1">
                        <button class="btn btn-danger "role="button">REMOVE</button>
                    </div>`
    cartRow.innerHTML=cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName("btn-danger")[0].addEventListener("click",
    removeCartItem);
    cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change",quantityChanged);
}

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName("cart-items")[0];
    var cartRows=cartItemContainer.getElementsByClassName("cart-row");

    var total =0;
    for(var i=0;i<cartRows.length;i++){
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName("cart-price")[0];
        var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0];
        var price = parseFloat(priceElement.innerHTML.replace("$","")); //extract $ and use parseFloat method to get the value
        var quantity = quantityElement.value;
        total+= (price*quantity);
    }

    
total = Math.round(total*100)/100; //Round total to the nearest 2decimal places (To avoid floating point errors)
    document.getElementsByClassName("cart-total-price")[0].innerText="$"+total;
}