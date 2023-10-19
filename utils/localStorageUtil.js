class LocalStorageUtil {
    constructor() {
        this.keyName = 'products';
    }

    getProducts() {
        const productsLocalStorage = localStorage.getItem(this.keyName);
        if (productsLocalStorage !== null) {
            return JSON.parse(productsLocalStorage);
        }
        return [];
    }

    putProducts(product_id) {

        let products = this.getProducts();

        if (products.length == 0) {
            products.push({
            id: product_id,
            count: 1
            })
   
        } else {

            let product_index = -1;

            for (let i = 0; i < products.length; i++) {
                
                if (products[i].id == product_id) {
                    product_index = i;
                }
            }

            if (product_index == -1) {
                products.push({
                    id: product_id,
                    count: 1
                    })
            }
            else {
                products[product_index].count += 1;
            }
        }

        localStorage.setItem(this.keyName, JSON.stringify(products));

        return { products }
    }

    delProducts(product_id) {
        
        let products = this.getProducts();

        let product_index = -1;
        let product_counter = 0;

        for (let i = 0; i < products.length; i++) {
            
            if (products[i].id == product_id) {
                product_index = i;
                product_counter = products[i].count
            }
        }
        
        if (product_counter == 1) {
            products.splice(product_index, 1);
        } else if (product_index != -1) {
            products[product_index].count -= 1;
        }

        localStorage.setItem(this.keyName, JSON.stringify(products));

        return { products }
    }
}

const localStorageUtil = new LocalStorageUtil();

/*
localStorageUtil.putProducts('el3');
*/
/*
localStorageUtil.delProducts('el3');
*/