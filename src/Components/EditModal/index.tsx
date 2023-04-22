import React, { useState } from "react";
import * as S from "./styles";

import { useAppDispatch } from "../../Redux/store";
import { editTodo } from "../../Redux/todos/todos-operations";

const EditModal = ({
  modalHandler,
  todoName,
  todoId,
}: {
  modalHandler: (isOpen: boolean) => void;
  todoName: string;
  todoId: string;
}) => {
  const dispatch = useAppDispatch();

  const [taskName, setTaskName] = useState(todoName);

  function handleTyping(event: React.ChangeEvent<HTMLInputElement>) {
    setTaskName(event.target.value);
  }

  function handleCancel() {
    modalHandler(false);
  }

  function handleEdit() {
    dispatch(editTodo({ title: taskName, _id: todoId }));
    modalHandler(false);
  }

  return (
    <S.Background>
      <S.Container>
        <S.Text>Insert new name</S.Text>
        <S.TitleInput
          placeholder="Task name"
          onChange={handleTyping}
          value={taskName}
        />

        <S.Buttons>
          <S.CancelButton onClick={handleCancel}>Cancel</S.CancelButton>
          <S.DeletButton disabled={!taskName} onClick={handleEdit}>
            Edit
          </S.DeletButton>
        </S.Buttons>
      </S.Container>
    </S.Background>
  );
};

export default EditModal;
