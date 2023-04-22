import React from "react";
import * as S from "./styles";
import { Link } from "react-router-dom";

interface CategorieItemProps {
  name: string;
  color: string;
  id: string;
}

const CategorieItem: React.FC<CategorieItemProps> = ({ name, color, id }) => {
  return (
    <Link to={"/categorie/" + id} style={{ textDecoration: "none" }}>
      <S.Categorie>
        <S.ColorTag color={color} />
        <S.ListName>{name[0].toUpperCase() + name.slice(1)}</S.ListName>
      </S.Categorie>
    </Link>
  );
};

export default CategorieItem;
