import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
  
export const Nav = styled.nav`
  background: #ffb3ff;
  height: 50px;
  display: inline-flex;
  justify-content: center;
  width: 100%;
`;
  
export const NavLink = styled(Link)`
  color: #808080;
  display: inline-flex;
  width: 30%;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  height: 100%;
  &:hover{
    transition: 0.3s;
    color: #4d4dff;
    background-color: lightgray;
  }
  cursor: pointer;
  &.active {
    color: #4d4dff;
  }
`;
  
export const NavMenu = styled.div`
  display: inline-flex;
  min-width: 190px;
  align-items: center;
  width: 30%;
`;