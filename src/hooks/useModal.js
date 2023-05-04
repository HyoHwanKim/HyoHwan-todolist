import axios from 'axios';
import { useState, useEffect } from 'react';

const useModal = (isOpen, todo, handleClose, setTodos) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedTodo = { title, content };

        const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/todos/${todo.id}`, updatedTodo);

        if (response.status === 200) {
            setTodos((todos) =>
                todos.map((item) => {
                    if (item.id === todo.id) {
                        return { ...item, ...updatedTodo };
                    } else {
                        return item;
                    }
                })
            );
            handleClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            setTitle(todo.title);
            setContent(todo.content);
        }
    }, [isOpen, todo]);

    return {
        title,
        content,
        setTitle,
        setContent,
        handleSubmit,
    };
};

export default useModal;
