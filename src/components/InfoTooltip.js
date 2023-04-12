import check_mark from '../images/check-mark.png';
import cross from '../images/cross.png';

function InfoTooltip(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_tooltip">
        <button
          className="popup__close-button button"
          type="button"
          onClick={props.onClose}
        />
        <img 
        className="popup__icon"
        src={check_mark}
        alt="Успешная регистрация"
        />
        <h2 className="popup__tooltip">Вы успешно зарегистрировались!</h2>

        <img
          className="popup__icon"
          src={cross}
          alt="Ошибка регистрации"
        />
        <h2 className="popup__tooltip">Что-то пошло не так! Попробуйте ещё раз.</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
