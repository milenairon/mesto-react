import React from "react";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";
import api from "../utils/Api";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);//мб внутри поставить null или ""?
  const isSomePopupOpen =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    selectedCard;

  //открыть попапы
  function openPopupEdit() {
    setIsEditProfilePopupOpen(true);
  }
  function openPopupAddPlace() {
    setIsAddPlacePopupOpen(true);
  }
  function openPopupEditAvatar() {
    setIsEditAvatarPopupOpen(true);
  }
  //открыть попап с карточкой
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  //закрытие на темный фон
  const handleOverlayClose = React.useCallback((event) => {
    if (event.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }, []);
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  //ЗАКРЫТИЕ НА ESC
  const handleCloseByEsc = React.useCallback((event) => {
    if (event.key === "Escape") {
      closeAllPopups();
    }
  }, []);

  //закрытие попапа на темный фон и esc
  React.useEffect(() => {
    if (isSomePopupOpen) {
      document.addEventListener("keydown", handleCloseByEsc);
      document.addEventListener("click", handleOverlayClose);
      return () => {
        document.removeEventListener("keydown", handleCloseByEsc);
        document.removeEventListener("click", handleOverlayClose);
      };
    }
  }, [isSomePopupOpen]);

  //данные
  React.useEffect(() => {
    api.getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((error) => {
        //если запрос не ушел
        console.log(error);
      });
  }, []);

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={openPopupEdit}
          onAddPlace={openPopupAddPlace}
          onEditAvatar={openPopupEditAvatar}
          onCardClick={handleCardClick}
        />
        <Footer />
        <PopupWithForm
          name="edit"
          title="Редактировать профиль"
          buttonText="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <label className="popup__field">
            <input
              className={`popup__forename popup__input`}
              type="text"
              name="forename"
              minLength="2"
              maxLength="40"
              placeholder="Имя"
              required
            />
            <span className="popup__input-error-message forename-input-error-message"></span>
          </label>
          <label className="popup__field">
            <input
              className="popup__job popup__input"
              type="text"
              name="job"
              minLength="2"
              maxLength="200"
              placeholder="О себе"
              required
            />
            <span className="popup__input-error-message job-input-error-message"></span>
          </label>
        </PopupWithForm>
        <PopupWithForm
          name="add"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          buttonText="Создать"
        >
          <label className="popup__field">
            <input
              className="popup__name popup__input"
              type="text"
              placeholder="Название"
              name="name"
              minLength="2"
              maxLength="30"
              required
            />
            <span className="popup__input-error-message name-input-error-message"></span>
          </label>
          <label className="popup__field">
            <input
              className="popup__link popup__input"
              type="url"
              placeholder="Ссылка на картинку"
              name="link"
              required
            />
            <span className="popup__input-error-message link-input-error-message"></span>
          </label>
        </PopupWithForm>
        <PopupWithForm
          name="update-avatar"
          title="Обновить аватар"
          buttonText="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <label className="popup__field">
            <input
              className="popup__link popup__input"
              type="url"
              placeholder="Ссылка на аватар"
              name="link"
              required
            />
            <span className="popup__input-error-message link-input-error-message"></span>
          </label>
        </PopupWithForm>
        <PopupWithForm
          name="card-delete"
          title="Вы уверены?"
          buttonText="Да"
        ></PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
      </CurrentUserContext.Provider>
    </div>
  );
}
