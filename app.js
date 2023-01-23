const milk1 = new Milk(123, 'Milk1', 'Man1', 10, 4);
const chocolate1 = new Chocolate(124, 'Choc1', 'Man2', 12, 'dark');
const wine1 = new Wine(125, 'Wine1', 'Man3', 35, 15);
const wine2 = new Wine(126, 'Wine2', 'Man3', 40, 15);

const store = new Store();
store.add(milk1);
store.add(chocolate1);
store.add(wine1);
store.add(wine2);
store.getAll();
console.log(store.getByType('Wine'));

const formLoader = document.querySelector('.loader');
const addBtn = document.querySelector('#addLink');
const showBtn = document.querySelector('#productsLink');
const content = document.querySelector('.content');
const productSelector = document.querySelector('#type');

formLoader.addEventListener('change', e => {
    let productType = e.target.value;
    switch (productType) {
        case 'milk': {
            formLoader.querySelector('label').innerHTML =
                `Enter parameter<input type="number" name="fat" class="form-control" 
                placeholder="Enter fat">`;
            break;
        }
        case 'chocolate': {
            formLoader.querySelector('label').innerHTML =
                `Enter parameter<input type="text" name="kind" class="form-control" 
                placeholder="Enter kind">`;
            break;
        }
        case 'wine': {
            formLoader.querySelector('label').innerHTML =
                `Enter parameter<input type="number" name="alcohol" class="form-control" 
                placeholder="Enter alcohol">`;
            break;
        }
    }
});

//---------Form Data Handler--------------------
formLoader.onsubmit = e => {
    e.preventDefault();
    let res = {};
    switch (e.target.type.value) {
        case 'milk': {
            res = new Milk(e.target.prod_id.value,
                e.target.title.value,
                e.target.manufc.value,
                e.target.price.value,
                e.target.fat.value);
            break;
        }
        case 'chocolate': {
            res = new Chocolate(e.target.prod_id.value,
                e.target.title.value,
                e.target.manufc.value,
                e.target.price.value,
                e.target.kind.value);
            break;
        }
        case 'wine': {
            res = new Wine(e.target.prod_id.value,
                e.target.title.value,
                e.target.manufc.value,
                e.target.price.value,
                e.target.alcohol.value);
            break;
        }
    }
    store.add(res);
    console.log(store);
    formLoader.reset();
}

//------------------Add Button Handler-------------------
addBtn.onclick = e => {
    formLoader.style.display = 'flex';
    content.style.display = 'none';
}

function renderProductList(product) {
    function getOwnProperty(it) {
        if (it.fat)
            return `fat: ${it.fat}`
        else if (it.kind)
            return `kind: ${it.kind}`
        else if (it.alcohol)
            return `alcohol: ${it.alcohol}`
        else return `   `;
    }

    function card(it) {
        return `<div class="card">
<h2>${it.constructor.name}</h2>
<h3>${it.id}</h3>
<h3>${it.title}</h3>
<h3>${it.manufacture}</h3>
<h3>price: ${it.price}</h3>
<h3>${getOwnProperty(it)}</h3>
</div>`
    }

    //   content.innerHTML =  transport.map(vehicle => {
    //  return `<div class="card">
    // <h2>${vehicle.constructor.name}</h2>
    // <h3>${vehicle.model}</h3>
    // <h3>${vehicle.year}</h3>
    // <h3>${getOwnProperty(vehicle)}</h3>
    // <h3>${vehicle.price}</h3>
    // </div>` }).join('\n');

    content.innerHTML = product.map(card).join('\n');
}

showBtn.onclick = e => {
    formLoader.style.display = 'none';
    content.style.display = 'flex';
    renderProductList((store.getAll()));
}

//----------------Selector--------------------
productSelector.addEventListener('click', e => {
    renderProductList(store.getByType(e.target.value));
    formLoader.style.display = 'none';
    content.style.display = 'flex';
})
