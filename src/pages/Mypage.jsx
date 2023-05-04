import React, { useState } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.3);
  width: 800px;
  height: 500px;

`

const TitlteInput = styled.input`
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  width: 500px;
`

const ContentInput = styled.input`
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  width: 500px;
  height: 500px;
`

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  background-color:  #333;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color:  #333;
  }
`

function Mypage() {
    const [titleValue, setTitleValue] = useState({
        title: '',
    })

    const [contentValue, setContentValue] = useState({
        content: '',
    })

    const onSubmitHandler = async () => {
        if (titleValue.title.trim().length < 2) {
            alert('제목은 2글자 이상 입력해주세요.');
            return
        }

        if (contentValue.content.trim().length < 5) {
            alert('내용은 5글자 이상 입력해주세요.');
            return
        }

        const data = { ...titleValue, ...contentValue };
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/todos`, data);
        setTitleValue({ title: '' });
        setContentValue({ content: '' });
    }


    return (
        <>
            <Header />
            <Wrapper>
                <Form
                    onSubmit={(e) => {
                        e.preventDefault()
                        onSubmitHandler()
                    }}
                >
                    <div>
                        <TitlteInput
                            type="text"
                            placeholder="제목을 입력하세요."
                            value={titleValue.title}
                            onChange={(e) => {
                                setTitleValue({ title: e.target.value })
                            }}
                        />

                    </div>
                    <ContentInput
                        type="text"
                        placeholder="내용을 입력하세요."
                        value={contentValue.content}
                        onChange={(e) => {
                            setContentValue({ content: e.target.value })
                        }}
                    />
                    <Button>등록</Button>
                </Form>
            </Wrapper>
        </>
    );
}

export default Mypage
