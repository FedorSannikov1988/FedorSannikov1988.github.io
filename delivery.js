/*
загружаем данные для формы type="date" с имитации сервера:
*/
/*
const forValueAndMin = START_DATA;
const forMax = STOP_DATA;
*/

/*
создаем данные для формы type="date" для демонстрационной версии:
*/
/*
let tg = window.Telegram.WebApp;
*/

tg.MainButton.hide();

const TIMERESERVEHOURS = 2;

const dateForFormDateDelivery = new Date(Date.now());
const forValueAndMin = dateForFormDateDelivery.toISOString().substring(0, 10);
dateForFormDateDelivery.setDate(dateForFormDateDelivery.getDate() + 6);
const forMax = dateForFormDateDelivery.toISOString().substring(0, 10);

document.getElementById("date_delivery_input").value = forValueAndMin;
document.getElementById("date_delivery_input").min = forValueAndMin;
document.getElementById("date_delivery_input").max = forMax;

document.getElementById('form_date_delivery').addEventListener('submit', function(element) {
  
  element.preventDefault(); 

  const chooseData = new FormData(this);
  const DataChooseUser = chooseData.get('calendar');

  console.log(DataChooseUser);

  localStorage.setItem('delivery_date', DataChooseUser);

  if (forValueAndMin == DataChooseUser) {

  const max_time_and_date = TIME_DELIVERY[TIME_DELIVERY.length - 1].split(':');

  const now = new Date();
  const forСomparison = new Date(now.getFullYear(), now.getMonth(), now.getDate(), max_time_and_date[0], max_time_and_date[1], 0);
  const nearestDeliveryTime = new Date();

  nearestDeliveryTime.setHours(now.getHours() + TIMERESERVEHOURS);

    if (forСomparison <= nearestDeliveryTime) {

      forСomparison.setHours(forСomparison.getHours() - TIMERESERVEHOURS);

      const maxTimeWorkDelivery = forСomparison.toString().substring(16, 21);

      document.getElementById("error_message").innerHTML = `
      Служба доставки прекратила принимать заказы в
      ${maxTimeWorkDelivery}.
      `;

    } else {
            
      forСomparison.setHours(forСomparison.getHours() - TIMERESERVEHOURS);
      
      const now = new Date();

      const selectElement = document.createElement("select");
      selectElement.classList.toggle('select_time_delivery');

      selectElement.name = "list_time";
     
      TIME_DELIVERY.forEach(time => {
        
        const hoursAndMinutes = time.split(':')

        const forСomparison = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hoursAndMinutes[0], hoursAndMinutes[1], 0);

        if (forСomparison > now) {

          const optionElement = document.createElement("option");
          optionElement.value = time;
          optionElement.text = time;
          selectElement.add(optionElement);
        }

        document.getElementById("error_message").innerHTML = ``;
    
        document.querySelector('[name=list_time]').replaceWith(selectElement);

      });

    }

  } else {

    const selectElement = document.createElement("select");
    selectElement.classList.toggle('select_time_delivery');

    selectElement.name = "list_time";

    TIME_DELIVERY.forEach( time => {
      
      const optionElement = document.createElement("option");
      optionElement.value = time;
      optionElement.text = time;
      selectElement.add(optionElement);

    });

    document.getElementById("error_message").innerHTML = ``;
    
    document.querySelector('[name=list_time]').replaceWith(selectElement);
  }
});


document.getElementById('form_time_delivery').addEventListener('submit', function(element) {
  
  element.preventDefault();

  const formData = new FormData(this);

  const deliveryTime = formData.get('list_time');

  if (deliveryTime !== null) {

    localStorage.setItem('delivery_time', deliveryTime);

    const yearMonthDay = localStorage.getItem('delivery_date').split('-');

    document.getElementById("selected_date_delivery").innerHTML = `
    Дата доставки: ${yearMonthDay[2]}.${yearMonthDay[1]}.${yearMonthDay[0]}
    `;

    document.getElementById("selected_time_delivery").innerHTML = `
    Время доставки: ${localStorage.getItem('delivery_time')}
    `;

    let full_cost_order = 0;

    const prodictsStore = localStorageUtil.getProducts();

    prodictsStore.forEach(({ id, count }) => {

        let id_prodict_store = id

        CATALOG.forEach(({ id, price }) => {

            if (id == id_prodict_store) {

                full_cost_order += count * price;
            }

        });
    });

    const cost_order = 'Стоимость заказать: ' + full_cost_order.toString() + ' ₽';

    document.getElementById("order_amount").innerHTML = `
    ${cost_order}`;

    document.getElementById("shipping_cost").innerHTML = `
    Стоимость доставки: 150 ₽`;
    
    tg.MainButton.setText('Сделать заказ');
    
    tg.MainButton.color = "#4CBB17";

    tg.MainButton.show();
  }

});
