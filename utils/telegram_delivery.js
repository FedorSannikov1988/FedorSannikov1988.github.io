let tg = window.Telegram.WebApp;

tg.MainButton.onClick( () => {

    const yearMonthDay = localStorage.getItem('delivery_date').split('-');

    localStorage.setItem('delivery_date', []);

    const deliveryData = '"delivery_date":' + '"' + yearMonthDay[2] + '.' + yearMonthDay[1] + '.' + yearMonthDay[0] + '"';
    
    const deliveryTime = '"delivery_time":' + '"' + localStorage.getItem('delivery_time') + '"';

    localStorage.setItem('delivery_time', []);

    const prodictsStore = localStorageUtil.getProducts();
    
    localStorageUtil.delAllProducts();

    const shippingCost = '"shipping_cost":' + '150';

    const products = JSON.stringify(prodictsStore);

    const dateForSent = products.substring(0, products.length - 3) + ',' + shippingCost + ',' + deliveryData + ',' + deliveryTime + '}]';
    
    tg.sendData(dateForSent);   

    tg.close();
})
