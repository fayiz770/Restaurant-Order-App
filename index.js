import { products } from "./data.js";

const itemsElement = document.getElementById('items')

const render = html => itemsElement.innerHTML = html
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
                <button class="add-button">+</button>
            </div>
        `
    }).join(' ')
}

render(getProductsHTML(products))