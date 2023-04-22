import * as S from "./styles";
import { useAppDispatch } from "../../Redux/store";
import { deleteTodo } from "../../Redux/todos/todos-operations";

const DeleteModal = ({
  todoId,
  modalHandler,
}: {
  todoId: string;
  modalHandler: (isOpen: boolean) => void;
}) => {
  const dispatch = useAppDispatch();

  function handleCancel() {
    modalHandler(false);
  }

  function handleConfirm() {
    dispatch(deleteTodo(todoId));
  }

  return (
    <S.Background>
      <S.Container>
        <S.Text>Are you sure you want to delete this task?</S.Text>
        <S.Buttons>
          <S.CancelButton onClick={handleCancel}>Cancel</S.CancelButton>
          <S.DeletButton onClick={handleConfirm}>Delete</S.DeletButton>
        </S.Buttons>
      </S.Container>
    </S.Background>
  );
};

export default DeleteModal;
