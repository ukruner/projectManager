import React, { forwardRef } from 'react';
import { useRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';


const Modal = forwardRef(function Modal ({ children, onClose, className}, ref) {
  const dialog = useRef();

  useImperativeHandle (ref, ()=> {
    return {
      open() {
        dialog.current.showModal();
      },
      close(){
        dialog.current.close();
      }
    }
  })
  return createPortal(<dialog
          className={className}
          ref={dialog}
          onClose={onClose}>{children}
        </dialog>
  , document.getElementById('modal-root'));
})

export default Modal;
