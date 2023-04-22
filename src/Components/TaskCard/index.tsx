import React, { useEffect, useState } from "react";
import * as S from "./styles";
import Edit from "../../Img/edit.svg";
import Erase from "../../Img/erase.svg";
import axios from "axios";
import { Categorie } from "../../Types/categorie";
import { useAppDispatch } from "../../Redux/store";
import { updateStatusTodo } from "../../Redux/todos/todos-operations";
import DeleteModal from "../DeleteModal";
import EditModal from "../EditModal";

interface TaskCardProps {
  id: string;
  name: string;
  categorieId: string;
  done: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ id, name, categorieId, done }) => {
  const [categorie, setCategorie] = useState("");
  const [color, setColor] = useState("");
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const dispatch = useAppDispatch();
  function handleCheck() {
    dispatch(updateStatusTodo({ _id: id, done: !done }));
  }

  function handleDelete() {
    setIsOpenDeleteModal(true);
  }
  function handleEdit() {
    setIsOpenEditModal(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get<Categorie>(`/categories/${categorieId}`);
      if (data.name) {
        setCategorie(data.name[0].toUpperCase() + data.name.slice(1));
      }
      if (data.color) {
        setColor(data.color);
      }
    };
    fetchData();
  }, [categorieId]);

  return (
    <>
      <S.Container>
        <S.CheckField>
          <S.CheckboxRing onClick={handleCheck}>
            <S.CheckFill done={done} />
          </S.CheckboxRing>
        </S.CheckField>
        <S.Description>
          <S.Name done={done}>{name}</S.Name>
          <S.ListBelong>
            <S.ColorTag color={color} />
            <S.ListName>{categorie}</S.ListName>
          </S.ListBelong>
        </S.Description>

        <S.Icon src={Edit} onClick={handleEdit} />
        <S.Icon src={Erase} onClick={handleDelete} />
      </S.Container>
      {isOpenDeleteModal && (
        <DeleteModal modalHandler={setIsOpenDeleteModal} todoId={id} />
      )}
      {isOpenEditModal && (
        <EditModal
          modalHandler={setIsOpenEditModal}
          todoId={id}
          todoName={name}
        />
      )}
    </>
  );
};

export default TaskCard;
