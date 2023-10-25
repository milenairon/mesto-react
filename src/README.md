# Практическая работа №10 "Сдача проекта Mesto: портирование на «Реакт»"

---

## Оглавление

1. Описание
2. Функциональность
3. Технологии, используемые в проекте
   - валидация форм;
   - открытие и закрытие pop up по клику мышкой, нажатию на кнопку "Esc", клику на фон;
   - редактиование и сохранение данных;
   - адаптивность сайта;
   - "резиновость" сайта;
   - флекc-элементы;
   - грид-элементы;
   - подключение шрифтов;
   - "отзывчивость" интерактивных элементов;
   - файловая структура проекта по правилам Nested БЭМ;
4. Ссылка на GitHub Pages

---

## 1. Описание

Данный проект - это одностраничный сайт, представляющий собой страничку на сервере с функциональностью и функциями, описанными ниже. Проект написан на реакте, так как код? написанный на данной библиотеке js, имеет следующие достоинства:

- экономится время на написании кода;
- контент загружается быстрее (особенно при плохом соединении и на медленных устройствах);
- улучшает ранжирование в поисковиках (поисковые боты будут видеть полностью отрендеренную страницу).

---

## 2. Функциональность

Данный сайт обладает следующими критериями функциональности:

- дизайн;
- контент;
- структура;
- доступные функции;

Под функциями понимаются следующие возможности:

- просмотра тектового материала без перехода на сторонние сайты;
- возможность изменения имени и места работы в сплывающем pop up;
- коректное внесение имени и "о себе", названия картинки и ссылки на нее в сплывающих pop up;
- возможность сохранения свои данных после ввода;
- возможность закрытия страницы без сохранения своих данных разными способами, описанными ранее.
- возможность добавления карточки в сплывающем pop up;
- возможность удаления карточки, а также постановки лайка карточке;
- возможность открытия картинки в большем масштабе в сплывающем pop up;

---

## 3. Технологии, используемые в проекте

В проекте были применены следующие технологии:

- подключение к серверу;
- сборка проекта. Webpack;
- применение классов;
- валидация форм;
- открытие и закрытие pop up по клику мышкой, нажатию на кнопку "Esc", клику на фон;
- редактиование и сохранение данных;
- Добавление карточки в сплывающем pop up;
- Удаление карточки;
- Постановка лайка карточке;
- Открытие картинки в большем масштабе в сплывающем pop up;
- адаптивность сайта;
- "резиновость" сайта;
- флекc-элементы;
- грид-элементы;
- подключение шрифтов;
- "отзывчивость" интерактивных элементов;
- файловая структура проекта по правилам Nested БЭМ;

### 3.1 Подключение к серверу

Данная технология реазилуется за счет следующих шагов:
3.1.1. Загрузка информации о пользователе с сервера
3.1.2. Загрузка карточек с сервера
3.1.3. Редактирование профиля
3.1.4. Добавление новой карточки
3.1.5. Отображение количества лайков карточки
3.1.6. Попап удаления карточки
3.1.7. Удаление карточки
3.1.8. Постановка и снятие лайка
3.1.9. Обновление аватара пользователя
3.1.10. Улучшенный UX всех форм

Данные технологии осуществлялись засчет получения/загрузки на сервер информации путем использования запроса с использованием индивидуального токена и названия когорты в классе Api. Ниже приведен пример загрузки информации о пользователе с сервера

```
Api.js:

getProfile() {
    return (
      fetch(`https://nomoreparties.co/v1/cohortId/users/me `, {
      method: "GET",
      headers: this._headers,
    })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          //если запрос ушел, но пришел ответ с ошибкой
          return new Error("Что-то пошло не так"); //СОЗДАТЬ КЛАСС
        })
        //если запрос не ушел
        .catch((error) => {
          console.log(error);
        })
    );
  }
```

```
index.js:

api
.getProfile() //Получить мои данные
.then((user) => {
  userInfoElement.setUserInfo(user);
})

```

#### 3.1.1. Загрузка информации о пользователе с сервера

Как уже говорилось ранее, информация о пользователе подгружается с сервера. Чтобы осуществить это, делался GET-запрос на URL с использованием индивидуального токена и названия когорты. Далее запрос вставлялся в основной js-файл.

#### 3.1.2. Загрузка карточек с сервера

Загрузка карточек с сервера осуществлялась через метод "PATCH" и имеет тело:

```
Api.js:

body: JSON.stringify({
        name: name,
        about: job,
      }),
```

#### 3.1.3. Редактирование профиля

Данная технология реализуется за счет запроса. В ответ на который пользователю приходит следующее:

```
{
  "name": "Marie Skłodowska Curie",
  "about": "Physicist and Chemist",
  "avatar": "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg",
  "_id": "e20537ed11237f86bbb20ccb",
  "cohort": "cohort-76",
}
```

#### 3.1.4. Добавление новой карточки

Данная технология реализуется за счет запроса, в который вставляется функция renderCard.

#### 3.1.5. Отображение количества лайков карточки

Отображение количества лайков карточки реализуется за счет верстки счетчика лайков под самой иконкой лайка, который является параметром условия

```
if(...) {
  ...
  } else {
    ...
  }
```

Если при клике лайк не имеет класса "active", то лайк ставится, иначе убирается.

#### 3.1.6. Попап удаления карточки

Создается попап удаления карточки, который всплывает при клике на значок урны. Данная технология реализуется в классе Card.

#### 3.1.7. Удаление карточки

Карточка удаляется при использовании запроса в классе Api, при положительном ответе с сервера и при клике открывается попап и если жмем "Да", то карточка удаляется со страницы и из памяти.

#### 3.1.8. Постановка и снятие лайка

Данная технология реализуется за счет запроса и функции toggleLike в классе Card.

#### 3.1.9. Обновление аватара пользователя

Данная технология реализуется за счет всплытия попапа с импутом и кнопкой, при заполнении поля и нажатии кнопки вставляется на страницу и сервер новая картинка.

#### 3.1.10. Улучшенный UX всех форм

Улучшение UX всех форм осуществляется за счет оповещения пользователе об этапах загрузки/сохранения его и(или) карточки, и(или) аватара, и(или) данных.

### 3.2 Сборка проекта. Webpack

Данная технология реализована путем использования модулей при разработке, а перед загрузкой проекта в интернет происходит сбор всех получившихся файлов в один и подключение в HTML. В процессе такой сборки можно преобразовать код: сжать его или сделать так, чтобы он работал в старых браузерах.В файле index.js, в котором осуществляются вызовы функций, создаются экземпляры классов посредством новых констант и импорта классов в указанный сайт с публичным методом(не используемые более нигде кроме класса его методы являются приватными). Ниже преведены примеры кода данных технологий.
Сборка проекта происходит ерез коммандную строку Node.js путем скачивания необходимых материалов и написания скриптов с последующим их вызовом. Также создаются файлы с типом JSON и js, в которых прописывается, "куда заглянуть" программе, куда положить собранные файлы, и что делать с файлами разных типов.

### 3.3 Применение классов

В файле index.js, в котором осуществляются вызовы функций, создаются экземпляры классов посредством новых констант и импорта классов в указанный сайт с публичным методом(не используемые более нигде кроме класса его методы являются приватными). Ниже преведены примеры кода данных технологий.

```
index.js:

import Card from "./Card.js";


Card.js:

export default Card;

```

### 3.4 Валидация форм

Данная технология реализуется посредством кода из js документа. Технология представляет собой несколько этапов, содержащих по одной функции на каждое действие. Вкратце это будет звучать так:

1. При открытии любого из попапов кнопка сохраниения данных/добавления карточки неактивна.
2. При изменении данных профиля/карточки проверяется количество введенных символов(у каждого input свой интервал значений). Также проверяется является ли введенные символы в поле, где должна быть ссылка, сылкой.
3. При соответствии всех инпутов данным требованиям в каждой рассматриваемой форме кнопка сохранения/добавления становится активной.

### 3.5 Открытие и закрытие pop up по клику мышкой, нажатию на кнопку "Esc", клику на фон

Данная технология реализуется посредством кода из js документа. Ниже представлен пример открытия pop up. Технология представляет собой объявление и присвоение переменной, описание и вызов функции.

```
jS:

let popup = document.querySelector(".popup");

function open(modal) {
  modal.classList.add("popup_opened");
}

profileButtonInfo.addEventListener("click", function () {
  open(popup);
})
```

```
document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    close(popupEdit);
    close(popupAdd);
    close(popupImage);
  }
});
```

```
function handlePopupClose(evt) {
  if (
    evt.currentTarget === evt.target || //закрытие при нажатии в пустоту
    evt.target.classList.contains("popup__close-icon") //закрытие при нажатии на крестик
  ) {
    //если 'элемент на котором висит(сам попапа, смотри ниже вызов)' = 'элемент, на который нажали(сам попап)' или 'параметр содержит класс popup__button-close'
    close(evt.currentTarget);
  }
}
```

### 3.6 Редактиование и сохранение данных

Данные технологии реализуется посредством кода из js документа. Ниже представлены примеры. Технология редактирования представляет собой объявление и присвоение переменной, описание и вызов функций: функции1 для дублирования значений на странице в форму и функции2 для дублирования значений из формы на страницу, в дальнейшем вызываем эти функции.

```
JS:
//Значения на странице дублируем в форму
function setInputText(evt) {
  nameInput.value = profileTitle.textContent.trim(); //.trim() - уберет лишние пробелы
  jobInput.value = profileSubTitle.textContent.trim();
}

// Дублируем значения из формы в значения на странице
function setTextInput(evt) {
  profileTitle.textContent = nameInput.value;
  profileSubTitle.textContent = jobInput.value;
}

//не дает отправить форму
function handleFormSubmit(evt) {
  evt.preventDefault();
}
//Вызовы функций
profileButtonInfo.addEventListener("click", function () {
  setInputText();
});
popupButton.addEventListener("click", function () {
  setTextInput();
});
```

### 3.7 Добавление карточки в сплывающем pop up

Данная технология реализуется посредством кода из js документа. Ниже представлен пример добавления карточки. Технология представляет собой следующее:

1. функция создания 6-ти карточек городов _create_ через массив _initialCards_ (массив включает в себя имя и адрес картинки карточки);
2. функция добавления созданных карточек _render_ в блок _element_;
3. Вызов функции _render_ для всех элементов массива _initialCards_ перебором(_forEach_)
4. навешивания слушателя на _popupFormAdd_(форма для созданя карточек) для создания новых карточек.

### 3.8 Удаление карточки

Данная технология реализуется посредством кода из js документа. Ниже представлен пример удаления карточки. Слушатель и объявленная переменная вставляются в функцию создания карточек.

```
jS:
const elementDelete = itemElement.querySelector(".element__delete");
  elementDelete.addEventListener("click", function () {
    itemElement.remove();
  });

```

### 3.9 Постановка лайка карточке

Данная технология реализуется посредством кода из js документа. Ниже представлен пример постановки лайка карточке. Данная часть кода вставляется в функцию создания карточек.

```
jS:
const elementLike = itemElement.querySelector(".element__image-like");
  elementLike.addEventListener("click", toggleLike);

```

### 3.10 Открытие картинки в большем масштабе в сплывающем pop up

Данная технология реализуется посредством кода из js документа. Ниже представлен пример открытия картинки в большем масштабе. Данная часть кода вставляется в функцию создания карточек. Функция openImage({ name, link }) представляет собой присвоение переменным(название, адрес картинки и alt карточки) параметров из инпутов в сплывающем pop up.

```
jS:
 elementimageElement.addEventListener("click", () => {
    open(popupImage);
    openImage({ name, link });
  });

```

### 3.11 Адаптивность сайта

Для адаптивности сайта используются медиазапросы на разные брейкпоинты. Эта технология позволяет сделать сайт доступных для устройств с различными разрешеиями.

```
CSS:

@media screen and (max-width=320px) {
  header: {
    margin-top: 6px;
  }
}
```

### 3.12 "Резиновость" сайта

Данная технология позволяет сделать сайт для комфортного просмотра между брекпоинтами с помощью изменения размеров элементов при изменении разрешения экрана.

```
CSS:
  header: {
    max-width: 320px;
    width: 100%;
  }

```

### 3.13 Флекс-элементы

Данная технология помогает изменять размеры элементов при изменении масштаба и помогает сделать сайт более "резиновым"

### 3.14 Грид-элементы

Данная технология помогает изменять размеры элементов при изменении масштаба, облегчает расположение элементов по сетке (секция elements) и помогает сделать сайт более "резиновым"

### 3.15 Подключение шрифтов;

```
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(./Inter/Inter-Regular.woff2) format("woff2"),
    url(./Inter/Inter-Regular.woff) format("woff");
}
```

### 3.16 "Отзывчивость" интерактивных элементов

Данная технология реализуется за счет добавления интерактивным элементам (кнопкам) css-свойства

```
opacity: 0.6;
```

или

```
opacity: 0.6;
```

### 3.17 Файловая структура проекта по правилам Nested БЭМ

```
папка "блок"
    папка "__элемент"
        папка "_ключ модификатора"
            папка "_значение модификатора"
                файл  "блок__элемент_значение модификатора"
    файл "блок__элемент.css"
файл "блок.css"
```

## 4. Ссылка на GitHub Pages

https://milenairon.github.io/mesto/