let tg = window.Telegram.WebApp;

tg.expand();

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


/*
    let text = products.length.toString()

    tg.MainButton.setText(text)
*/
/*
    tg.MainButton.show()
*/

/*
    tg.MainButton.text = 'test'
*/
/*
    tg.MainButton.show()
*/
/*
}
*/
/*
let order = document.getElementById("order");

order.addEventListener("click", () => {
    let name = document.getElementById("user_name").value;
    let email = document.getElementById("user_email").value;
    let phone = document.getElementById("user_phone").value;

    let data = {
        name: name,
        email: email,
        phone: phone
    }
    tg.sendData(JSON.stringify(data));

    tg.close();
});
*/