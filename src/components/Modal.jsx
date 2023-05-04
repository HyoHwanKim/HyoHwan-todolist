import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import useModal from '../hooks/useModal'

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`

const ModalContent = styled.div`
  width: 400px;
  max-width: 90%;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Input = styled.input`
  padding: 5px;
  font-size: 16px;
`

const SubmitButton = styled.button`
  padding: 5px;
  /* background-color: #333; */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`

const Modal = ({ isOpen, handleClose, todo, setTodos }) => {
    const { title, content, setTitle, setContent, handleSubmit } = useModal(isOpen, todo, handleClose, setTodos);

    if (!isOpen) {
        return null;
    }

    return (
        <ModalWrapper>
            <ModalContent>
                <button onClick={handleClose}>X</button>
                <Form onSubmit={handleSubmit}>
                    <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <Input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
                    <SubmitButton type="submit">저장</SubmitButton>
                </Form>
            </ModalContent>
        </ModalWrapper>
    );
};

export default Modal;
