import { useEffect, useState } from "react";
import React from "react";
import profileImageInfo from "../images/profile-button-info.svg";
import profileImageAdd from "../images/profile-button-add.svg";
import api from "../utils/Api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({ onEditProfile, onAddPlace, onEditAvatar , onCardClick }) {
  //данные меня
  const currentUser = React.useContext(CurrentUserContext);
  //все карточки с сервера
  const [cards, setСards] = useState([]);
 
  //вставляем карточки с сервера
  useEffect(() => {
  api.getAllCards() //Получить все карточки
  .then((cardList) => {
    setСards(cardList);
  })
  .catch((error) => {//если запрос не ушел
    console.log(error);
  })}, []);

  return (
    <main className="content">
      <section className="profile">
        <button
          id="profile-button-avatar"
          className="profile__button-avatar"
          type="button"
          onClick={onEditAvatar}
          style={{
            backgroundImage: `url(${currentUser ? currentUser.avatar : ""})`,
          }}
        ></button>
        <div className="profile__info">
          <h1 className="profile__title">
            {currentUser ? currentUser.name : ""}
          </h1>
          <button
            aria-label="Редактировать"
            type="button"
            className="profile__button-info"
            onClick={onEditProfile}
          >
            <img
              className="profile__image-info"
              src={profileImageInfo}
              alt="редактирование формы"
            />
          </button>
          <p className="profile__subtitle">
            {currentUser ? currentUser.about : ""}
          </p>
        </div>
        <button
          aria-label="Добавить картинку"
          type="button"
          className="profile__button-add"
          onClick={onAddPlace}
        >
          <img
            className="profile__image-add"
            src={profileImageAdd}
            alt="добавление картинок"
          />
        </button>
      </section>
      <section className="elements">
        <ul className="element">
        {cards.map((card) => {
            return (
              <Card card={card} key={card._id} onCardClick={onCardClick} />
            );
          })}
        </ul>
      </section>
    </main>
  );
}
export default Main;
