import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from './Button'
import Modal from './Modal'

const BoxList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding: 20px;
  width: 1000px;
  margin: 0 auto;
  justify-content: center;
`


const Box = styled.div`
  border: 3px solid black;
  width: 250px;
  height: 300px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  
  button {
    margin-top: 10px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    /* background-color: #000; */
    border: none;
    border-radius: 5px;
    padding: 8px 16px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    
    &:hover {
      background-color: #333;
    }
  }
  
  h2 {
    font-size: 24px;
  }
  
  p {
    margin-bottom: 10px;
  }
`



const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`

const Content = styled.p`
  font-size: 1.2rem;
  margin: 0;
  flex-grow: 1;
`

function List() {


    const [todos, setTodos] = useState(null)

    const [selectedTodo, setSelectedTodo] = useState(null)
    const [isOpen, setIsOpen] = useState(false)

    const handleOpenModal = () => {
        setIsOpen(true)
    }

    const handleCloseModal = () => {
        setIsOpen(false)
    }

    const clickRemove = async (id) => {
        if (window.confirm('삭제할거야?')) {
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/todos/${id}`);
            setTodos(todos.filter((item) => {
                return item.id !== id
            }))
        }
    }

    const clickDetail = (todo) => {
        setSelectedTodo(todo)
        handleOpenModal()
    }


    useEffect(() => {
        async function fetchTodos() {
            const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/todos`)
            setTodos(data)
        }
        fetchTodos();
    }, [])

    if (todos === null) {
        return <div>Loading...</div>
    }

    return (
        <>
            <BoxList>
                {todos.map((item) => (
                    <Box key={item.id}>
                        <Button onClick={() => clickRemove(item.id)} buttonText="삭제" />
                        <Title>{item.title}</Title>
                        <Content>{item.content}</Content>
                        <Button buttonText="상세보기" onClick={() => clickDetail(item)} />
                        <Modal isOpen={isOpen} handleClose={handleCloseModal} todo={selectedTodo} setTodos={setTodos}></Modal>
                    </Box>
                ))}
            </BoxList>
        </>
    )
}

export default List
