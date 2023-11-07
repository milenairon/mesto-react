import React from "react";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.jsx";

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null); //мб внутри поставить null или ""?
  const isSomePopupOpen =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    selectedCard;
  const [cards, setCards] = React.useState([]);

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
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  //закрытие на темный фон
  const handleOverlayClose = React.useCallback((event) => {
    if (event.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }, []);

  //закрытие на esc
  const handleCloseByEsc = React.useCallback((event) => {
    if (event.key === "Escape") {
      closeAllPopups();
    }
  }, []);

  //закрыть все попапы
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  //поставить лайк
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        //если запрос не ушел
        console.log(error);
      });
  }

  //удалить карточку
  function handleCardDelete(card) {
    // Отправляем запрос в API и получаем обновлённые данные массива карточек
    api
      .deleteCard(card._id)
      .then((newCards) => {
        setCards(() =>
          //мб тут так? then(() => {setCards((state) =>...
          newCards.filter((c) => c._id === card._id)
        );
      })
      .catch((error) => {
        //если запрос не ушел
        console.log(error);
      });
  }

  //вставить данные из формы
  function handleUpdateUser({name, about}) {
    api
      .setUserInfo({name, job: about})
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((error) => {
        //если запрос не ушел
        console.log(error);
      });
  }

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
    api
      .getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((error) => {
        //если запрос не ушел
        console.log(error);
      });
  }, []);

  //вставляем карточки с сервера
  React.useEffect(() => {
    api
      .getAllCards() //Получить все карточки
      .then((cardList) => {
        setCards(cardList);
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
            cards={cards}
            onEditProfile={openPopupEdit}
            onAddPlace={openPopupAddPlace}
            onEditAvatar={openPopupEditAvatar}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
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
