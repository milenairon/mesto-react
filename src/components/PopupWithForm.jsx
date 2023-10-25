import popupCloseIcon from "../images/close-icon.svg";

export default function PopupWithForm(props) {
  return (
    <div className={`popup popup_place_${props.name} ${props.isOpen}`}>
      <div className={`popup__container popup__container_place_${props.name}`}>
        <button
          aria-label="Закрыть"
          type="button"
          className="popup__button-close"
          onClick={props.onClose}
        >
          <img
            className="popup__close-icon"
            src={popupCloseIcon}
            alt="Крестик закрытия"
          />
        </button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          name={props.name}
          className={`popup__form popup__form_type_${props.name}`}
        >
          {props.children}
        </form>
      </div>
    </div>
  );
}
