import React, { useState } from "react";
import * as S from "./styles";
import { ColorResult, SketchPicker } from "react-color";
import { useAppDispatch } from "../../Redux/store";
import { addCategorie } from "../../Redux/categories/categories-operations";

const AddCategorieModal = ({
  modalHandler,
}: {
  modalHandler: (isOpen: boolean) => void;
}) => {
  const dispatch = useAppDispatch();

  const [categoryName, setCategoryName] = useState("");
  const [color, setColor] = useState("#000");

  function handleTyping(event: React.ChangeEvent<HTMLInputElement>) {
    setCategoryName(event.target.value);
  }

  function handleCancel() {
    modalHandler(false);
  }

  function handleAdd() {
    dispatch(addCategorie({ name: categoryName, color }));
    modalHandler(false);
  }

  function handleChange(color: ColorResult) {
    setColor(color.hex);
  }

  return (
    <S.Background>
      <S.Container>
        <S.Text>Insert name</S.Text>
        <S.TitleInput
          placeholder="Task name"
          onChange={handleTyping}
          value={categoryName}
        />

        <S.Text>Choose color</S.Text>
        <SketchPicker color={color} onChangeComplete={handleChange} />
        <S.Buttons>
          <S.CancelButton onClick={handleCancel}>Cancel</S.CancelButton>
          <S.DeletButton disabled={!categoryName} onClick={handleAdd}>
            Add
          </S.DeletButton>
        </S.Buttons>
      </S.Container>
    </S.Background>
  );
};

export default AddCategorieModal;
