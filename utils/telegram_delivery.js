let tg = window.Telegram.WebApp;

tg.MainButton.onClick( () => {

    const yearMonthDay = localStorage.getItem('delivery_date').split('-');
    localStorage.setItem('delivery_date', []);

    const deliveryData = yearMonthDay[2] + '.' + yearMonthDay[1] + '.' + yearMonthDay[0];
    
    const deliveryTime = localStorage.getItem('delivery_time');
    localStorage.setItem('delivery_time', []);

    const prodictsStore = localStorageUtil.getProducts();

    tg.sendData(JSON.stringify(prodictsStore));

    localStorageUtil.delAllProducts();

    tg.close();
})
