### Пет-проект по созданию двух html страничек для Telegram WebApp.

### Цель:
Создать и разместить на GitHub Pages две html страницы (для использования возможностей Telegram WebApp): 
1) index.html - меню готовых блюд  (выбор из каталога готовых блюд);
2) delivery.html - оформление доставки (назначение даты и времени доставки выбранных блюд);
для использования в Telegram-bot позволяющем сделать заказ в службе доставки готовой еды.

По окончании взаимодействия (успешном оформления заказа) в Telegram WebApp с двумя выше 
описанными страницами в Telegram передается информация (список словарей следующего вида 
**[{"id":"el1","count":1},{"id":"el2","count":3},{"shipping_cost":150,"delivery_date":"23.10.2023","delivery_time":"9:00"}]**) о заказе (какие блюда заказаны и из количество в заказе; дата, время 
и стоимость доставки).

### Оформление:
Для удобного визуального отображения index.html (меню готовых блюд) 
проект дополнен следующими мадиазапросами:
- @media screen and (max-width: 1023px)
- @media screen and (max-width: 767px)
- @media screen and (max-width: 425px)
- @media screen and (max-width: 375px)
- @media screen and (max-width: 320px)

### Технологии и инструменты:
- Язык программирования: JavaScript ;
- Технологий: HTML (язык гипертекстовой разметки документов)/CSS(каскадные таблицы стилей); 
- Инструмент разработки: Visual Studio Code;
- Версионный контроль: Git.

<br>

<details><summary><b>Пример работы (внешний вид в Telegram WebApp):</b></strong></summary>

#### index:

![внешний вид index](/pictures/index.jpg "внешний вид index")

#### delivery:

![внешний вид delivery](/pictures/delivery.jpg "внешний вид delivery")

</details>

<br>

### Размещение:
- <a href="https://fedorsannikov1988.github.io/index.html">index</a>;
- <a href="https://fedorsannikov1988.github.io/delivery.html">delivery</a>;
- <a href="https://github.com/FedorSannikov1988/delivery_service">Telegram-bot</a> в котором используется данный каталог.

## Примечание: В данном репозитории размещена еще одна страничка <a href="https://fedorsannikov1988.github.io/clothing-store.html">clothing-store</a> интернет магазина одежды не имеющая к описанному выше проету отношения. 

<a href="https://fedorsannikov1988.github.io/clothing-store.html">clothing-store</a> демонстрирует скромные навыки в области верстки.