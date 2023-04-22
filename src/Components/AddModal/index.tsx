import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { useSelector } from "react-redux";
import { selectCategories } from "../../Redux/categories/categories-selectors";
import { useAppDispatch } from "../../Redux/store";
import { fetchCategories } from "../../Redux/categories/categories-operations";
import { addTodo } from "../../Redux/todos/todos-operations";

const AddModal = ({
  modalHandler,
  existedCategorieId,
}: {
  modalHandler: (isOpen: boolean) => void;
  existedCategorieId?: string;
}) => {
  const dispatch = useAppDispatch();

  const categList = useSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const [taskName, setTaskName] = useState("");
  const [taskCategorie, setTaskCategorie] = useState(
    existedCategorieId || categList[0]?._id
  );

  function handleTyping(event: React.ChangeEvent<HTMLInputElement>) {
    setTaskName(event.target.value);
  }

  function handleCancel() {
    modalHandler(false);
  }

  function handleAdd() {
    dispatch(addTodo({ title: taskName, categorieId: taskCategorie }));
    modalHandler(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setTaskCategorie(e.target.value);
  }

  return (
    <S.Background>
      <S.Container>
        <S.Text>Insert name</S.Text>
        <S.TitleInput
          placeholder="Task name"
          onChange={handleTyping}
          value={taskName}
        />
        {!existedCategorieId && (
          <>
            <S.Text>Select a categorie</S.Text>
            <S.Select id="select" onChange={handleChange}>
              {categList.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </S.Select>
          </>
        )}
        <S.Buttons>
          <S.CancelButton onClick={handleCancel}>Cancel</S.CancelButton>
          <S.DeletButton disabled={!taskName} onClick={handleAdd}>
            Add
          </S.DeletButton>
        </S.Buttons>
      </S.Container>
    </S.Background>
  );
};

export default AddModal;
