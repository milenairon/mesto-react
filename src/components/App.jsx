import React from "react";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

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
  function handleOverlayClose(event) {
    if (event.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  //ЗАКРЫТИЕ НА ESC
  const escFunction = React.useCallback((event) => {
    if (event.key === "Escape") {
      closeAllPopups();
    }
  }, []);

  React.useEffect(() => {
    document.addEventListener("keydown", escFunction);
    document.addEventListener("click", handleOverlayClose);
    return () => {
      document.removeEventListener("keydown", escFunction);
      document.removeEventListener("click", handleOverlayClose);
    };
  }, [escFunction, handleOverlayClose]);

  return (
    <div className="app">
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
          isOpen={!isEditProfilePopupOpen ? "" : "popup_opened"}
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
          <button
            aria-label="Сохранить"
            className="popup__button"
            type="submit"
          >
            Сохранить
          </button>
        </PopupWithForm>
        <PopupWithForm
          name="add"
          title="Новое место"
          isOpen={!isAddPlacePopupOpen ? "" : "popup_opened"}
          onClose={closeAllPopups}
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
          <button aria-label="Создать" className="popup__button" type="submit">
            Создать
          </button>
        </PopupWithForm>
        <PopupWithForm
          name="update-avatar"
          title="Обновить аватар"
          isOpen={!isEditAvatarPopupOpen ? "" : "popup_opened"}
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
          <button
            aria-label="Сохранить"
            className="popup__button"
            type="submit"
          >
            Сохранить
          </button>
        </PopupWithForm>
        <PopupWithForm name="card-delete" title="Вы уверены?">
          <button aria-label="Да" className="popup__button" type="button">
            Да
          </button>
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </div>
  );
}
