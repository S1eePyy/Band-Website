$(document).ready(function(){

   
    $(".shop-item-button").click(addToCartClicked);
    $(".btn-purchase").click(purchaseClicked);
});

function purchaseClicked(){
    alert("Thank you for your purchase");
    $(".cart-items").empty();
    updateCartTotal();
}

function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value)||input.value<=0){
        input.value=1;
    }

    updateCartTotal();

}

function addToCartClicked(event){
    var button=event.target;
    var shopItem=$(button).parent().parent();
    var title= shopItem.find(".shop-item-title").html(); //can replace .find() with .children()
    var price= shopItem.find(".shop-item-price").html();
    var imageSrc= shopItem.find(".shop-item-image").prop("src");//retrieve image link
    addItemToCart(title,price,imageSrc);
}

function addItemToCart(title,price,imageSrc){

    //idk how to change this part to jQuery
    var cartItems = document.getElementsByClassName("cart-items")[0];
    var cartItemNames = cartItems.getElementsByClassName("cart-item-title");

    for(var i =0;i<cartItemNames.length;i++){
        if(cartItemNames[i].innerHTML== title){
            alert("This item is already added to the cart");
            return;
        }
    }
    //----------------------
   
  
    var cartRowContents =`
                    <div class="cart-item cart-column">
                        <img class="cart-item-image"src=${imageSrc} >
                        <span class="cart-item-title">${title}</span>
                    </div>
                    <span class="cart-price cart-column">${price}</span>
                    <div class="cart-quantity cart-column">
                        <input class="cart-quantity-input" type="number" value="1">
                        <button class="btn btn-danger "role="button">REMOVE</button>
                    </div>`;

    
    var bruh =$(".cart-items").append("<div class='cart-row'>").children(".cart-row:last").append(cartRowContents);//IMPORTANT LINE
    //.children() returns <div class="cart-row">
    var a = $(".btn-danger").click(removeCartItem);
    var b = $(".cart-quantity-input").change(quantityChanged);
    updateCartTotal();
}

function removeCartItem(event){
    var buttonClicked = event.target;
    $(buttonClicked).parent().parent().remove();
    updateCartTotal();
}

    function updateCartTotal(){
        var cartRows = $(".cart-items .cart-row");
      
        //idk how to change to jQuery
        var total =0;
        var bruh =cartRows.each((i,e)=>{
            var cartRow = cartRows[i];
            var priceElement = cartRow.getElementsByClassName("cart-price")[0];
            var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0];
            var price = parseFloat(priceElement.innerHTML.replace("$","")); //extract $ and use parseFloat method to get the value
            var quantity = quantityElement.value;
            total+= (price*quantity);
        });

        total = Math.round(total*100)/100; //Round total to the nearest 2decimal places (To avoid floating point errors)
        $(".cart-total-price").html("$"+total)



    }
