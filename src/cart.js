let label = document.getElementById('label')
let shoppingCart = document.getElementById('shopping-cart')


// console.log(shopItemData)// ! this for showing data which comes from homepage which is already added into the cart --> from that we fetched it into cards format
let basket = JSON.parse(localStorage.getItem("data")) || [];    

// console.log(basket);

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount")
    // ! console.log(basket.map((x)=>x.item)); ==> (2) [5, 1]
    // ! console.log(basket.map((x)=>x.item).reduce((x,y)=>x+y,0)); 
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y,0)
}
calculation()

let generateCartItem = () => {
    if(basket.length !== 0)
    {
        return shoppingCart.innerHTML = basket.map((x)=>{
            // console.log(x)
            let {id , item} = x; // this coming from basket 
            let search = shopItemData.find((y)=>y.id === id) || [] //and id is coming from basket ,   y.id is coming from database


            return `
            <div class = "cart-item">
                <img width="120" src = ${search.img} alt = ""/>
                <div class = "detail"> 
                    <div class = "title-price-x">
                        <h4 class = "title-price">
                        <p>${search.name}</p>
                        <p class= "cart-item-price">$ ${search.price}</p>
                        </h4>
                        <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                    </div>

                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                    <h2>$ ${item * search.price} </h2>
                </div>
            </div> `
        }).join("")    
    }
    else{
        shoppingCart.innerHTML = ` `
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href= "index.html" > 
            <button class="Homebtn">Back to home</button>
        </a>
        `;
    }
}
generateCartItem()
let increment = (id) => {
    let selectedItem = id
    let search = basket.find((x)=> x.id === selectedItem.id)


    if(search === undefined)
    {
        basket.push({
        id:selectedItem.id,
        item:1,
        })
    }
    else
    {
        search.item += 1;
    }
    generateCartItem()
    update(selectedItem.id)
    localStorage.setItem("data" , JSON.stringify(basket))
    // console.log(basket);
}
let decrement = (id) => {
    let selectedItem = id
    let search = basket.find((x)=> x.id === selectedItem.id)
   
    // ! This is for if we directly clicked on decrement without adding into cart then gives error that error had been handled
    if (search === undefined) return;
    else if(search.item === 0)
    {
        return
    }
    else
    {
        search.item -= 1;
    }
    // ! this line when item has 0 value then does store in local storage then we have to remove it
    update(selectedItem.id)
    
    basket = basket.filter((x)=> x.item !== 0 )
    // console.log(basket);
    generateCartItem()
    
    localStorage.setItem("data" , JSON.stringify(basket));
}
let update = (id) => {
    let search = basket.find((x)=> x.id === id)
    // ! console.log(search.item); --> this gives us to item number
    document.getElementById(id).innerHTML = search.item
    calculation()
    // for printing label amount 
    totalAmount()
}

// how can close icon know which particular card do you want to delete it so that'why we required id for particular card delete which diffrent from id
let removeItem = (id) => {
    let selectedItem = id
    // console.log(selectedItem.id);
    basket = basket.filter((x)=>x.id !== selectedItem.id);
    // update local Storage
    localStorage.setItem("data" , JSON.stringify(basket))
    // after clicking local storage removed it but after refresh card remove its not better so that'why we re-render the function
    generateCartItem()
    totalAmount()
    calculation()
}

let clearCart = () => {
    basket = []
    generateCartItem()
    localStorage.setItem("data" , JSON.stringify(basket))
    calculation()
}

let totalAmount = () => {
    // two cases here
    //  1. when data availabel on local storage
    //  2. when data not availabel on local storage
    if(basket.length !== 0)
    {
        let amount = basket.map((x)=>
        {
            let {item , id } = x
            let search = shopItemData.find((y)=>y.id === id) || []
            return item*search.price //its gives in array format now we have to add all of them
        }).reduce((x,y)=>x+y,0)
        // console.log(amount)
        label.innerHTML = 
        `<h2> Total Bill: $ ${amount} </h2>
         <button class="checkout">Checkout</button>     
         <button onclick="clearCart()" class="removeAll">Clear Cart</button>     
        `
    } else return;
}

totalAmount()