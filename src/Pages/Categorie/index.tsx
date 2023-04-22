import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import * as S from "./styles";
import Logo from "../../Img/Logo.png";
import TaskFill from "../../Img/task.png";
// import Settings from "../../Img/settings.svg";
import Folder from "../../Img/folder.svg";
import Logout from "../../Img/logout.svg";
import Profile from "../../Img/profile-svgrepo-com.svg";
import SidebarItem from "../../Components/SidebarItem";
import ExpandSidebarItem from "../../Components/ExpandSidebarItem";
import FilterTag from "../../Components/FilterTag";
import Filter from "../../Img/filter.svg";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../Redux/store";
import { logOut } from "../../Redux/auth/auth-operations";
import AddModal from "../../Components/AddModal";
import { fetchTodos } from "../../Redux/todos/todos-operations";
import { useSelector } from "react-redux";
import { selectTodos } from "../../Redux/todos/todos-selectors";
import TaskCard from "../../Components/TaskCard";
import { Categorie } from "../../Types/categorie";
import axios from "axios";
import AddTask from "../../Components/AddTask";
import { selectUser } from "../../Redux/auth/auth-selectors";

const CategoriePage: React.FC = () => {
  const { name } = useParams<string>();
  const [categorie, setCategorie] = useState("None");
  const [color, setColor] = useState("#afafaf");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get<Categorie>(`/categories/${name}`);
      if (data.name) {
        setCategorie(data.name[0].toUpperCase() + data.name.slice(1));
      }
      if (data.color) {
        setColor(data.color);
      }
    };
    fetchData();
  }, [name]);

  const todoList = useSelector(selectTodos);
  const currentUser = useSelector(selectUser);

  const [allActive, setAllActive] = useState(true);
  const [doneActive, setDoneActive] = useState(false);
  const [notDoneActive, setNotDoneActive] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  function handleAll() {
    setAllActive(true);
    setDoneActive(false);
    setNotDoneActive(false);
  }

  function handleDone() {
    setAllActive(false);
    setDoneActive(true);
    setNotDoneActive(false);
  }
  function handleNotDone() {
    setAllActive(false);
    setDoneActive(false);
    setNotDoneActive(true);
  }

  function handleLogout() {
    dispatch(logOut());
    navigate("/login");
  }
  return (
    <S.Page>
      <S.Sidebar>
        <S.Img src={Logo} />
        <S.Tabs>
          <Link to="/" style={{ textDecoration: "none" }}>
            <SidebarItem
              icon={TaskFill}
              name="Tasks"
              isActive={false}
            ></SidebarItem>
          </Link>
          <ExpandSidebarItem
            icon={Folder}
            name="Categories"
          ></ExpandSidebarItem>
          {/* <SidebarItem
            icon={Settings}
            name="Settings"
            isActive={false}
          ></SidebarItem> */}
        </S.Tabs>
        <div style={{ textDecoration: "none" }}>
          <SidebarItem
            icon={Profile}
            name={`Welcome, ${currentUser.name}!`}
            isActive={false}
          ></SidebarItem>
        </div>
        <div style={{ textDecoration: "none" }} onClick={handleLogout}>
          <SidebarItem
            icon={Logout}
            name="Logout"
            isActive={false}
          ></SidebarItem>
        </div>
      </S.Sidebar>
      <S.Main>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <S.ColorTag color={color} />
          <S.Header>{categorie}</S.Header>
          <S.ColorTag color={color} />
        </div>
        <S.TitleAndFilter>
          <S.Title onClick={handleDone}>Tasks </S.Title>
          <S.FilterField>
            <div onClick={handleAll}>
              <FilterTag name="All" active={allActive} />
            </div>
            <div onClick={handleDone}>
              <FilterTag name="Done" active={doneActive} />
            </div>
            <div onClick={handleNotDone}>
              <FilterTag name="Not done" active={notDoneActive} />
            </div>
            <S.FilterIcon src={Filter} />
          </S.FilterField>
        </S.TitleAndFilter>

        {allActive &&
          todoList
            .filter((todo) => todo.categorieId === name)
            .map((task) => (
              <TaskCard
                key={task._id}
                id={task._id}
                name={task.title}
                categorieId={task.categorieId}
                done={task.done}
              />
            ))}
        {doneActive &&
          todoList
            .filter((todo) => todo.done)
            .filter((todo) => todo.categorieId === name)
            .map((task) => (
              <TaskCard
                key={task._id}
                id={task._id}
                name={task.title}
                categorieId={task.categorieId}
                done={task.done}
              />
            ))}
        {notDoneActive &&
          todoList
            .filter((todo) => !todo.done)
            .filter((todo) => todo.categorieId === name)
            .map((task) => (
              <TaskCard
                key={task._id}
                id={task._id}
                name={task.title}
                categorieId={task.categorieId}
                done={task.done}
              />
            ))}

        {allActive && <AddTask onClick={setIsAddModalOpen}></AddTask>}
      </S.Main>
      {/* <DeleteModal />
       */}

      {isAddModalOpen && (
        <AddModal
          existedCategorieId={name || ""}
          modalHandler={setIsAddModalOpen}
        />
      )}
    </S.Page>
  );
};

export default CategoriePage;
