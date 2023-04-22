import React, { useEffect, useState } from "react";
import * as S from "./styles";
import Logo from "../../Img/Logo.png";
import TaskFill from "../../Img/taskFill.png";
// import Settings from "../../Img/settings.svg";
import Folder from "../../Img/folder.svg";
import Logout from "../../Img/logout.svg";
import Profile from "../../Img/profile-svgrepo-com.svg";
import SidebarItem from "../../Components/SidebarItem";
import ExpandSidebarItem from "../../Components/ExpandSidebarItem";
import TaskCard from "../../Components/TaskCard";
import AddTask from "../../Components/AddTask";
import FilterTag from "../../Components/FilterTag";
import Filter from "../../Img/filter.svg";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Redux/store";
import { logOut } from "../../Redux/auth/auth-operations";
import { useSelector } from "react-redux";
import { selectTodos } from "../../Redux/todos/todos-selectors";
import { fetchTodos } from "../../Redux/todos/todos-operations";
import AddModal from "../../Components/AddModal";
import { selectUser } from "../../Redux/auth/auth-selectors";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [allActive, setAllActive] = useState(true);
  const [doneActive, setDoneActive] = useState(false);
  const [notDoneActive, setNotDoneActive] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const todoList = useSelector(selectTodos);
  const currentUser = useSelector(selectUser);

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
          <SidebarItem
            icon={TaskFill}
            name="Tasks"
            isActive={true}
          ></SidebarItem>
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
        {allActive && <S.Header>All your tasks</S.Header>}
        {doneActive && <S.Header>All your done tasks</S.Header>}
        {notDoneActive && <S.Header>All your not done tasks</S.Header>}

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
          todoList.map((task) => (
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

      {isAddModalOpen && <AddModal modalHandler={setIsAddModalOpen} />}
    </S.Page>
  );
};

export default Home;
