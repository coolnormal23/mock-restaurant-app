import { menuArray } from "./data.js";

const itemsEl = document.getElementById('items-list')
const checkoutEl = document.getElementById('checkout')
const checkoutItemsEl = document.getElementById('checkout-items')
const totalPriceEl = document.getElementById('total-price-value')
const completeOrderButton = document.getElementById('complete-order')
const modal = document.getElementById('modal')
const modalPayButton = document.getElementById('modal-pay')
const formEl = document.getElementById('modal-form')

let orderedItems = []
let orderComplete = false

function renderItems(arr){
    itemsEl.innerHTML =  arr.map((item) => {
        const {name, ingredients, id, price, emoji} = item

        return `
        <div class="item">
            <div class="item-container">
                <p class="item-emoji">${emoji}</p>
                <div class="item-text">
                    <h4 class="item-name">${name}</h4>
                    <p class="item-ingredients">${ingredients.join()}</p>
                    <p class="price">$${price}</p>
                </div>
                <button class="item-button" data-itemid="${id}">
                    +
                </button>
            </div>
        </div>
        `
    }).join('')
}

function renderCheckoutState(){
    console.log(orderedItems)
    orderedItems.length === 0 ? checkoutEl.style.visibility = 'hidden' : checkoutEl.style.visibility = 'visible'

    let totalprice = 0

    checkoutItemsEl.innerHTML = orderedItems.map((item) => {
        totalprice += item.price
        return `
        <div class="checkout-item">
            <h4>${item.name}</h4>
            <button class="remove-button verdana" data-removeid="${item.id}">remove</button>
            <p class="price">$${item.price}</p>
        </div>
        `
    }).join('')
    totalPriceEl.textContent = `$${totalprice}`
}

function handleCompleteOrder(){
    modal.style.opacity = "100"
    modal.style.visibility = "visible"
    console.log('animating')
}

window.addEventListener('click', (e) => {
    console.log(e.target.dataset)
    if(!orderComplete){
        if(e.target.dataset.itemid){ //add items
            orderedItems.push(menuArray.find((item) => {
                return item.id == e.target.dataset.itemid
            }))
            renderCheckoutState()
        }
        else if(e.target.dataset.removeid){ //remove items
            orderedItems.splice(orderedItems.findIndex((item => {
                return item.id == e.target.dataset.removeid
            })),1)
            renderCheckoutState()
        }
    }
    
})

completeOrderButton.addEventListener('click', handleCompleteOrder)

formEl.addEventListener('submit', (e) => {
    e.preventDefault()
    completeOrderButton.removeEventListener('click', handleCompleteOrder)
    completeOrderButton.classList.toggle('checkout-complete')
    completeOrderButton.textContent = 'Thank you for submitting your order!'
    modal.style.opacity = "0"
    modal.style.visibility = "hidden"
    orderComplete = true
})

renderItems(menuArray)
renderCheckoutState()