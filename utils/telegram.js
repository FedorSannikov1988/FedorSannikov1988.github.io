let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.color = "#4CBB17";

const prodictsStore = localStorageUtil.getProducts();

if (prodictsStore.length > 0) {

    tg.MainButton.show()
}

let full_cost_order = 0;

prodictsStore.forEach(({ id, count }) => {

    let id_prodict_store = id

    CATALOG.forEach(({ id, price }) => {

        if (id == id_prodict_store) {

            full_cost_order += count * price;
        }

    });
});

const text = 'Заказать: ' + full_cost_order.toString() + ' ₽';

tg.MainButton.setText(text)

tg.MainButton.onClick( () => {

    const prodictsStore = localStorageUtil.getProducts();

    tg.sendData(JSON.stringify(prodictsStore));

    localStorageUtil.delAllProducts();

    tg.close();
})
