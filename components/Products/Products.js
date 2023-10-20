class Prodicts {

    constructor() {
        this.classNameActive = 'products-element__btn';
        this.classNameNotActive = 'products-element__btn_not_active';
    }

    handleSetLocationStorage(this_element, id_prodict_add_card, button_minus, button_quantity, button_plus) {
        
        localStorageUtil.putProducts(id_prodict_add_card);

        let full_cost_order = 0;

        const prodictsStore = localStorageUtil.getProducts();

        prodictsStore.forEach(({ id, count }) => {

            let id_prodict_store = id

            CATALOG.forEach(({ id, price }) => {

                if (id == id_prodict_store) {

                    full_cost_order += (count * price);
                }

            });
        });

        const text = 'Заказать: ' + full_cost_order.toString() + ' ₽';
        tg.MainButton.setText(text);

        tg.MainButton.show();
        
        this_element.classList.toggle(this.classNameActive);
        this_element.classList.toggle(this.classNameNotActive);

        button_minus.classList.toggle(this.classNameNotActive);
        button_minus.classList.toggle(this.classNameActive);
        
        button_quantity.classList.toggle(this.classNameNotActive);
        button_quantity.classList.toggle(this.classNameActive);  
        button_quantity.innerHTML = 1;
        
        button_plus.classList.toggle(this.classNameNotActive);
        button_plus.classList.toggle(this.classNameActive);
    }

    handleSetLocationStoragePlus(id, button_quantity) {       
        
        localStorageUtil.putProducts(id);

        let full_cost_order = 0;

        const prodictsStore = localStorageUtil.getProducts();

        prodictsStore.forEach(({ id, count }) => {

            let id_prodict_store = id

            CATALOG.forEach(({ id, price }) => {

                if (id == id_prodict_store) {

                    full_cost_order += (count * price);
                }

            });
        });

        button_quantity.innerHTML = parseInt(button_quantity.innerHTML) + 1;
        
        const text = 'Заказать: ' + full_cost_order.toString() + ' ₽';

        tg.MainButton.setText(text);
    }

    handleSetLocationStorageMinus(button_add_card, id, button_minus, button_quantity, button_plus) { 
        
        localStorageUtil.delProducts(id);

        let full_cost_order = 0;

        const prodictsStore = localStorageUtil.getProducts();

        prodictsStore.forEach(({ id, count }) => {

            let id_prodict_store = id

            CATALOG.forEach(({ id, price }) => {

                if (id == id_prodict_store) {

                    full_cost_order += (count * price);
                }

            });
        });

        const text = 'Заказать: ' + full_cost_order.toString() + ' ₽';
        
        tg.MainButton.setText(text);

        const quantity = parseInt(button_quantity.innerHTML);

        if (quantity > 1) {

            button_quantity.innerHTML = quantity - 1;

        } else {
            
            button_add_card.classList.toggle(this.classNameNotActive);
            button_add_card.classList.toggle(this.classNameActive);

            button_minus.classList.toggle(this.classNameActive);
            button_minus.classList.toggle(this.classNameNotActive);

            button_quantity.classList.toggle(this.classNameActive);
            button_quantity.classList.toggle(this.classNameNotActive); 

            button_plus.classList.toggle(this.classNameActive);
            button_plus.classList.toggle(this.classNameNotActive);
            
            const prodictsStore = localStorageUtil.getProducts();

            if (prodictsStore.length === 0) {
                tg.MainButton.hide();
            }            
        }
    }

    render () {
        const prodictsStore = localStorageUtil.getProducts();

        let htmlCatalog = '';
        
        CATALOG.forEach(({ id, name, price, img }) => {
            
            let count = 0
            let nowClassAddCardBigButton = this.classNameActive;
            let nowClassSetQuantityInCard = this.classNameNotActive;
                        
            for (let i = 0; i < prodictsStore.length; i++) {
                
                if (prodictsStore[i].id == id) {
                    nowClassAddCardBigButton = this.classNameNotActive;
                    nowClassSetQuantityInCard = this.classNameActive;
                    count = prodictsStore[i].count
                }
            }

            htmlCatalog += `
                <li class="products-element">
                    <span class="products-element__name">${name}</span>
                    <img class="products-element__img" src="${img}" />
                    <span class="products-element__price">
                    <b>Цена: </b>
                    ${price.toLocaleString()} 
                    ₽<span>
                    
                        <button id="${id}_add_card" class="${nowClassAddCardBigButton}" onclick="prodictsPage.handleSetLocationStorage(this, '${id}', ${id}_minus, ${id}_quantity, ${id}_plus);">
                        Добавить в корзину
                        </button>

                    <div class="wrapper_for_btn_set_quantity">
                    
                        <button id="${id}_minus" class="${nowClassSetQuantityInCard}" onclick="prodictsPage.handleSetLocationStorageMinus(${id}_add_card, '${id}', ${id}_minus, ${id}_quantity, ${id}_plus)">
                        -
                        </button>
                        
                        <button id="${id}_quantity" class="${nowClassSetQuantityInCard}">
                        ${count}
                        </button>

                        <button id="${id}_plus" class="${nowClassSetQuantityInCard}" onclick="prodictsPage.handleSetLocationStoragePlus('${id}', ${id}_quantity);">
                        +
                        </button>

                    </div>
                </li>
            `;
        });

        const html = `
            <ul class= "products-container">
                ${htmlCatalog}
            </ul>
        `;

        ROOT_PRODUCTS.innerHTML = html;
    }
}

const prodictsPage = new Prodicts();

prodictsPage.render();