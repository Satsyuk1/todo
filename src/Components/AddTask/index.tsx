import * as S from "./styles";
import Add from "../../Img/add.svg";

const AddTask = ({ onClick }: { onClick: (isOpen: boolean) => void }) => {
  function handleClick() {
    onClick(true);
  }

  return (
    <S.Container onClick={handleClick}>
      <S.Icon src={Add} />
      <S.Text>Add a task</S.Text>
    </S.Container>
  );
};

export default AddTask;
