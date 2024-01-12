import * as S from "./styles";
import { useLocation, useNavigate } from "react-router";
import NavHome from "@assets/icons/nav_Home.svg?react";
import NavAll from "@assets/icons/nav_All.svg?react";
import NavProduct from "@assets/icons/nav_Product.svg?react";
import NavChat from "@assets/icons/nav_Chat.svg?react";
import NavMy from "@assets/icons/nav_My.svg?react";
import NumberBadge from "@components/numberBadge";
import AlertCountStore from "@stores/AlertCountStore";

interface NavButtonProps {
  path: string;
}

const NavButton = ({ path }: NavButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === path;

  const { chatCount, myPageCount, setChatCount, setMyPageCount } = AlertCountStore();

  const tapList = new Map([
    ["/", { label: "홈", component: <NavHome /> }],
    ["/products", { label: "상품리스트", component: <NavAll /> }],
    ["/sell", { label: "등록", component: <NavProduct /> }],
    ["/chat", { label: "채팅", component: <NavChat />, showBadge: true }],
    ["/mypage", { label: "마이", component: <NavMy />, showBadge: true }]
  ]);
  const { label, component, showBadge } = tapList.get(path) || {
    label: "",
    component: null,
    showBadge: false
  };

  const handleButtonClick = () => {
    const currentPath = window.location.pathname;
    if (path === "/chat") {
      setChatCount(0);
    } else if (path === "/myPage") {
      setMyPageCount(0);
    }

    if (path === currentPath) {
      return;
    }
    navigate(path);
  };

  return (
    <S.BottomNavButton className={isActive ? "active" : ""} onClick={handleButtonClick}>
      {component}
      {label}
      {showBadge && chatCount && path === "/chat" ? <NumberBadge number={chatCount} /> : null}
      {showBadge && myPageCount && path === "/myPage" ? <NumberBadge number={myPageCount} /> : null}
    </S.BottomNavButton>
  );
};

export default NavButton;
