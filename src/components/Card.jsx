//картинки в popup-ах
import elementImageDelete from "../images/element-button-urn.svg";
import elementImageLike from "../images/element-image-like.svg";

function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }
  return (
    <li className="element__card">
      <button
        aria-label="Удалить карточку"
        type="button"
        className="element__delete"
      >
        <img
          className="element__image-delete"
          src={elementImageDelete}
          alt="урна для удаления"
        />
      </button>
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__container">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__box">
          <button
            aria-label="Поставить лайк"
            type="button"
            className="element__like"
          >
            <img
              className="element__image-like"
              src={elementImageLike}
              alt="лайк"
            />
          </button>
          <p className="element__like-lot">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}
export default Card;
