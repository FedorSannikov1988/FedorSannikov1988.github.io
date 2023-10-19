let tg = window.Telegram.WebApp;

tg.expand();

const products = localStorageUtil.getProducts();

if (products.length > 0) {

    tg.MainButton.show()
}

let text = 'telegram'

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