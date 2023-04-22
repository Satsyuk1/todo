import React, { useEffect, useState } from "react";
import * as S from "./styles";
import Arrow from "../../Img/arrow.svg";
import CategorieItem from "../Categorie";
import Add from "../../Img/add.svg";
import { useAppDispatch } from "../../Redux/store";
import { useSelector } from "react-redux";
import { selectCategories } from "../../Redux/categories/categories-selectors";
import { fetchCategories } from "../../Redux/categories/categories-operations";
import AddCategorieModal from "../AddCategorieModal";

interface SidebarItemProps {
  name: string;
  icon: string;
}

const ExpandSidebarItem: React.FC<SidebarItemProps> = ({ name, icon }) => {
  const [active, setActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useAppDispatch();

  const categList = useSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  function handleActivate() {
    setActive(!active);
  }

  function handleAddCategorie() {
    console.log(123);
    setIsModalOpen(true);
  }
  return (
    <>
      <S.OuterContainer isActive={active}>
        <S.Container isActive={active} onClick={handleActivate}>
          <S.Icon src={icon} />
          <S.Name>{name}</S.Name>
          <S.Arrow isActive={active} src={Arrow} />
        </S.Container>
        <S.CatArea isActive={active}>
          {categList.map((cat) => (
            <CategorieItem
              key={cat._id}
              id={cat._id}
              name={cat.name}
              color={cat.color}
            />
          ))}
          <S.AddArea onClick={handleAddCategorie}>
            <S.AddIcon src={Add} />
            <S.AddText>Add new</S.AddText>
          </S.AddArea>
        </S.CatArea>
      </S.OuterContainer>
      {isModalOpen && <AddCategorieModal modalHandler={setIsModalOpen} />}
    </>
  );
};

export default ExpandSidebarItem;
