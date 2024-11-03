import { products } from "./data.js";

const itemsElement = document.getElementById('items')
const oredersElement = document.getElementById('orders-container')
const summary = document.querySelector('.summary')
const totalElement = document.getElementById('total-container')
const modal = document.getElementById('modal')
const closeBtn = document.getElementById('close-button')

let orders = []

document.addEventListener('click', (e) => {
    if(e.target.dataset.add){
        summary.style.display = 'grid'
        const matchedProduct = products.find(product => product.id === e.target.dataset.add)
        if(orders.includes(matchedProduct)){
            matchedProduct.valume++
        }else{
            matchedProduct.valume = 1
            orders.push(matchedProduct)
        }
    }else if(e.target.dataset.button){
        modal.style.display = 'grid'
    }else if(e.target.dataset.close){
        modal.style.display = 'none'
    }else if(e.target.dataset.pay){
        e.preventDefault()
        modal.style.display = 'none'
        summary.innerHTML = `
            <div class="alert">
                <p>Thanks, James's Your order is on the way!</p>
            </div>
        `
    }
    renderOrders()
    renderTotal()
})

const renderOrders = () => oredersElement.innerHTML = getOrders(orders)
const renderTotal = () => totalElement.innerHTML = getTotal(orders)

const getOrders = array => {
    return array.map(order => {
        let total = order.valume * order.price
        return `
            <div class="orders">
                <div class="order">
                    <div class="details">
                        <p>${order.name}</p>
                        <span class="remove" data-remove="${order.id}">remove</span>
                    </div>
                    <div class="valume">${order.valume}x</div>
                    <span class="price">$${order.price}</span>
                </div>
            </div>
        `
    }).join(' ')
}

const getTotal = array => {
    return '$' + array.reduce((total, currentElement) => {
        return total + currentElement.price * currentElement.valume
    }, 0)
}
const render = () => itemsElement.innerHTML = getProductsHTML(products)
const getProductsHTML = array => {
    return array.map( item => {
        return `
            <div class="item">
                <div>
                    <img src="assets/images/${item.image}" alt="${item.alt}">
                    <div class="things">
                        <h3>${item.name}</h3>
                        <p>${item.ingredients.join(', ')}.</p>
                        <span>$${item.price}</span>
                    </div>
                </div>
                <button class="add-button" data-add="${item.id}">+</button>
            </div>
        `
    }).join(' ')
}
render()