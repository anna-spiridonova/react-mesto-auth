import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import { api } from "../utils/Api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';

function App() { 
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: ""
  });
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    tokenCheck();
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([resUserInfo, resInitialCards]) => {
      setCurrentUser(resUserInfo)
      setCards(resInitialCards);
    })
    .catch((err) => {
      console.log(err)
    });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsImagePopupOpen(false);
    setIsTooltipPopupOpen(false);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);    
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err)
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((res) => {
        const newCards = cards.filter((c) => (c._id !== card._id && res));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err)
      });
  }

  function handleUpdateUser({name, about}) {
    api.editProfileInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      });
  }

  function handleUpdateAvatar({avatar}) {
    api.editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      });
  }

  function handleAddPlaceSubmit({name, link}) {
    api.addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      });
  }

  function handleLogin(email) {
    setLoggedIn(true);
    setEmail(email)
  };

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if(!jwt) {
      return
    }
    auth.getContent(jwt)
      .then((res) => {
        if(res) {
          handleLogin(res.data.email);
          navigate("/main")
        }
      })
      .catch((err) => {
        console.log(err)
      });
  }

  function handleSingUpSubmit() {
    setIsTooltipPopupOpen(true);
  }

  function singOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false)
  }

  return (
    <CurrentUserContext.Provider value = {currentUser}>
      <div className="root">
        <Header
          email={email}
          singOut={singOut}
        />        

        <Routes>
          <Route path="/" 
            element={
            loggedIn ? <Navigate to="/main" replace /> : <Navigate to="/sign-in" replace />
            } 
          /> 
          <Route path="/main" element={
            <ProtectedRoute
            loggedIn={loggedIn}
            element={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            cards={cards}
            onCardDelete={handleCardDelete}
            />
          }/>
          <Route path='/sign-up' element={
            <Register
            isOpen={isTooltipPopupOpen}
            onClose={closeAllPopups}
            openTooltip={handleSingUpSubmit}
            />
          }/>
          <Route path='/sign-in' element={<Login handleLogin={handleLogin} />}/>
        </Routes>

        {loggedIn && <Footer />}

        {/* форма редактора профиля */}
        <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser} 
        />

        {/* форма редактора аватара */}
        <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        />

        {/* форма создания карточки */}
        <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        />

        {/* форма подтверждения удаления */}
        <PopupWithForm
          name={"confirm"}
          title={"Вы уверены?"}
          buttonValue={"Да"}
        />

        <ImagePopup 
        card={selectedCard}
        onClose={closeAllPopups}
        isOpen={isImagePopupOpen}
        />

        {/* <InfoTooltip
          name={"tooltip"}
          isOpen={isTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        /> */}

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
