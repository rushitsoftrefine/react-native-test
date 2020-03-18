import React from 'react';
import ReactDOM from 'react-dom';

function Modal(props) {
  const {show, closeModal, itemData} = props;
  const modal = (
    <>
      <div className={show ? 'overlay' : 'hide'} onClick={closeModal} />
      <div className={show ? 'modal' : 'hide'}>
        <div className="modalContent">
          <button onClick={closeModal}>X</button>
          <h1>User Details</h1>
          <img src={itemData.picture.medium} height="100px" />
          <p><b>Name : </b>{itemData.name.first + ' ' + itemData.name.last}</p>
          <p><b>Email :</b>{itemData.email}</p>
          <p><b>Phone :</b>{itemData.phone}</p>
          <p><b>Cell :</b>{itemData.cell}</p>
        </div>
      </div>
    </>
  );
  return ReactDOM.createPortal(modal, document.getElementById('root'));
}

export default Modal;
