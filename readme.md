Библиотека для формирования графиков
=====================
Библиотека может использоваться для автоматического формирования графиков двух видов:  
1) Линейный график
2) Столбиковая диаграмма

Графики отрисовываются с помощью сторонней библиотеки [d3.js](https://github.com/d3/d3) версии 4.12.0, используя стандартные функции этой библиотеки. 
***
Установка и использование библиотеки 
-----------------------------------
1) Скачать последнюю версию библиотеки [тут](https://github.com/fadeeva-marina/diplom/blob/master/script.js)
2) С помощью json-схемы ([для линейного графика](https://github.com/fadeeva-marina/diplom/blob/master/shemaLines.json) и для [столбиковой диаграммы](https://github.com/fadeeva-marina/diplom/blob/master/shemaBar.json)) или на примере json-файлов ([линейный](https://github.com/fadeeva-marina/diplom/blob/master/settLines.json), [столбиковая диаграмма](https://github.com/fadeeva-marina/diplom/blob/master/sett.json)) создать собственный файл с настройками, на основе которых график будет отрисовываться на странице. 
3) Подключить необходимые библиотеки в html-файле: библиотеку для формирования графиков, библиотеку jquery, а так же d3.js нужной версии(4.12.0). 
```html
    <script type="text/javascript" src="script.js"></script>    
    <script type="text/javascript" src="jquery-3.3.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.12.0/d3.min.js"></script>
    <script src="https://d3js.org/d3-axis.v1.min.js"></script>
```
4) Вызвать функцию из библиотеки для формирования графиков в определенном месте с определенными параметрами. (Функции с параметрами описаны ниже)

Функции библиотеки
-----------------------------------
drawBarChart(pathSet, height, width, locId, inputData) – функция отрисовки столбиковой диаграммы
*	pathSet – путь к файлу с настройками графика. 
*	height, width – размеры блока с графиком.  
*	locId – id DOM-элемента, в котором будет отрисовываться график
* inputData - данные, переданные напрямую в функцию. 
Например, в таком виде: 
```html
<script>
      inputData = [{x: 1, y: 55},
        {x: 2, y: 67}, {x: 3, y: 74},{x: 4, y: 63},
        {x: 5, y: 56}, {x: 6, y: 24}, {x: 7, y: 26},
        {x:8, y: 19}, {x: 9, y: 42}, {x: 10, y: 88},
        {x: 11, y: 80}, {x: 12, y: 77}
    ];
</script>
```
В случае, если параметры height, width, locId не будут указаны в вызове функции, данные параметры считаются из файла с настройками. 
Если не будет указан параметр inputData, данные будут скачиваться с сервера или из файла, в зависимости от настроек. 
***
drawLineChart (pathSet, height, width, locId) - функция отрисовки линейного графика
*	pathSet – путь к файлу с настройками графика. 
*	height, width – размеры блока с графиком.  
*	locId – id DOM-элемента, в котором будет отрисовываться график

В случае, если параметры height, width, locId не будут указаны в вызове функции, данные параметры считаются из файла с настройками. 

Параметры файла с настройками для столбиковой диаграммы
-----------------------------------
[JSON-Схема](https://github.com/fadeeva-marina/diplom/blob/master/shemaBar.json)
[Пример](https://github.com/fadeeva-marina/diplom/blob/master/sett.json)
pathData -  путь к файлу с данными  

loadFromUrl – блок для управления загрузкой данных с URL
* loading – значение true/false. True – график будет строиться по данным, полученным по url. 
* url – адрес для доступа к данным
* updateGrafByTime – true/false. Если True, то будет запущено обновление по таймеру. 
* timeInterval – период обновления в мс.  

chartName – название графика
* exists – true/false. Если True – в блок с графиком добавится его название
* text – текст названия
* fontSize – размер шрифта
* fontFamily - начертание шрифта
* textAnchor – выравнивание текста (start | middle | end | inherit)

locId - id DOM-элемента, в котором будет отрисовываться график (#div1)  
height - высота блока для отрисовки графика в px
width - ширина блока для отрисовки графика в px  
margin, padding - отступы графика в px  

xAxis - ось X
* exists - true/false. Если True – на график будет добавлена ось X
* location - расположение оси, снизу или сверху (down | up)
* locationLabel - расположение подписей оси, снизу или сверху (bottom | top)  
* color - цвет оси  

yAxis - ось Y
* exists - true/false. Если True – на график будет добавлена ось Y
* location - расположение оси, слева или справа (left | right)
* locationLabel - расположение подписей оси, слева или справа (left | right)  
* color - цвет оси  

gridLineX, gridLineY - горизонтальные и вертикальные линии, создающие сетку на графике. Могут использоваться отдельно  
* exists - true/false. Если True – на график будет добавлены горизонтальные или вертикальные линии соответственно   
* color - цвет этих линий  
* height - толщина линий в px  

colorContent - цвет контента графика  
hoverColor - цвет контента при наведении (должна быть включена анимация - typeAnimation)  
textDescriptionData - блок настроек, отвечающий за подписи данных на графике
* exists - true/false. Если True – на график будет добавлены подписи данных
* colorText - цвет текста подписей
* location - расположение подписей, над столбцом диаграммы, или внутри нее сверху (upper | inToUp)
* fontSize - размер штрифта (12)
* fontFamily - начертание шрифта
* textAnchor - выравнивание текста (start | middle | end | inherit)  

typeAnimation - наличие анимации (1)  
durationAnimation - длительность анимации (1, 2)

Параметры файла с настройками для линейного графика
-----------------------------------
[JSON-Схема](https://github.com/fadeeva-marina/diplom/blob/master/shemaLines.json)  
[Пример](https://github.com/fadeeva-marina/diplom/blob/master/settLines.json)  
pathData -  путь к файлу с данными  

loadFromUrl – блок для управления загрузкой данных с URL
* loading – значение true/false. True – график будет строиться по данным, полученным по url. 
* url – адрес для доступа к данным
* updateGrafByTime – true/false. Если True, то будет запущено обновление по таймеру. 
* timeInterval – период обновления в мс.  

chartName – название графика
* exists – true/false. Если True – в блок с графиком добавится его название
* text – текст названия
* fontSize – размер шрифта
* fontFamily - начертание шрифта
* textAnchor – выравнивание текста (start | middle | end | inherit)

locId - id DOM-элемента, в котором будет отрисовываться график (#div1)  
height - высота блока для отрисовки графика в px
width - ширина блока для отрисовки графика в px  
margin, padding - отступы графика в px  

xAxis - ось X
* exists - true/false. Если True – на график будет добавлена ось X
* location - расположение оси, снизу или сверху (down | up)
* locationLabel - расположение подписей оси, снизу или сверху (bottom | top)  
* color - цвет оси  

yAxis - ось Y
* exists - true/false. Если True – на график будет добавлена ось Y
* location - расположение оси, слева или справа (left | right)
* locationLabel - расположение подписей оси, слева или справа (left | right)  
* color - цвет оси  

gridLineX, gridLineY - горизонтальные и вертикальные линии, создающие сетку на графике. Могут использоваться отдельно  
* exists - true/false. Если True – на график будет добавлены горизонтальные или вертикальные линии соответственно   
* color - цвет этих линий  

legend - легенда графика
* exists - true/false. Если True – в блок с графиком будет добавлена его легенда
* colorTextEnabled - цвет текста, если линия, соответствующая строке легенды видима на графике
* colorTextNotEnabled - цвет текста, если линия, соответствующая строке легенды невидима на графике
* fontFamily - шрифт текста в блоке легенды  

curve - true/false. Если True - произойдет интерполирование графика. 
