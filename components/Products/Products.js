class Prodicts {

    constructor() {
        this.classNameActive = 'products-element__btn';
        this.classNameNotActive = 'products-element__btn_not_active';
        this.classNameActiveQuantity = 'products-element__btn_quantity';
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
        button_quantity.classList.toggle(this.classNameActiveQuantity);  
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

            button_quantity.classList.toggle(this.classNameActiveQuantity);
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
        
        CATALOG.forEach(({ id, name, description, price, img }) => {
            
            let count = 0
            let nowClassAddCardBigButton = this.classNameActive;
            let nowClassSetQuantityInCard = this.classNameNotActive;
            let nowClassSeeQuantity = this.classNameNotActive;
                        
            for (let i = 0; i < prodictsStore.length; i++) {
                
                if (prodictsStore[i].id == id) {
                    nowClassAddCardBigButton = this.classNameNotActive;
                    nowClassSetQuantityInCard = this.classNameActive;
                    nowClassSeeQuantity = this.classNameActiveQuantity;
                    count = prodictsStore[i].count
                }
            }

            htmlCatalog += `
                <div class="products-element">
                    <div class="products-title"> <p class="products-title__text">${name}</p> </div>
                    <img class="products-element__img" src="${img}" />

                    <p class="products-element__description">
                    ${description}
                    </p> 

                    <div> <span class="products-element__price">
                    Цена: ${price.toLocaleString()} ₽
                    <span> </div>
                    
                        <button id="${id}_add_card" class="${nowClassAddCardBigButton}" onclick="prodictsPage.handleSetLocationStorage(this, '${id}', ${id}_minus, ${id}_quantity, ${id}_plus);">
                        Купить
                        </button>

                    <div class="wrapper_for_btn_set_quantity">
                    
                        <button id="${id}_minus" class="${nowClassSetQuantityInCard}" onclick="prodictsPage.handleSetLocationStorageMinus(${id}_add_card, '${id}', ${id}_minus, ${id}_quantity, ${id}_plus)">
                        -
                        </button>
                        
                        <button id="${id}_quantity" class="${nowClassSeeQuantity}">
                        ${count}
                        </button>

                        <button id="${id}_plus" class="${nowClassSetQuantityInCard}" onclick="prodictsPage.handleSetLocationStoragePlus('${id}', ${id}_quantity);">
                        +
                        </button>

                    </div>
                </div>
            `;
        });

        const html = `
            <div class= "products-container centering">
                ${htmlCatalog}
            </div>
        `;

        ROOT_PRODUCTS.innerHTML = html;
    }
}

const prodictsPage = new Prodicts();
