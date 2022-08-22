import React from "react";
import { css } from "@emotion/css";
import { Link } from "react-router-dom";

const easeSlow = css`
  transition: all 450ms ease-in-out;
`;

const menuBtn = css`
  position: absolute;
  z-index: 3;
  right: 35px;
  top: 35px;
  cursor: pointer;
  ${easeSlow};
  &.closer {
    transform: rotate(180deg);
  }
`;

const btnLine = css`
  width: 28px;
  height: 4px;
  margin: 0 0 5px 0;
  background-color: #44C177;
  ${easeSlow};
  &.closer {
    background-color: #44C177;  
    &:nth-child(1) {
      transform: rotate(-45deg) translate(-10px, -5px);
      width: 20px;
    }
    &:nth-child(2) {
      transform: translateX(-8px);
    }
    &:nth-child(3) {
      transform: rotate(45deg) translate(-10px, 5px);
      width: 20px;
    }
  }
`;

const menuOverlay = css`
  z-index: 2;
  position: fixed;
  top: 0;
  right: 0;
  background-color: white;
  height: 100vh;
  width: 40vw;
  transform: translateX(100%);
  transition: all 500ms ease-in-out;
  &.show {
    background-color: #FFFFFF;
    transform: translateX(0%); 
  }
  nav {
    padding-top: 220px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 48px;
    a {
      height: 30px;
      text-decoration: none;
      color: #44C177;
      font-family: 'Noto Sans CJK TC';
      font-style: normal;
      font-weight: 700;
      font-size: 36px;
      line-height: 140%;
      cursor: pointer;
      transition: all 150ms ease-in-out;
    }
  }
  @media (max-width: 800px) {
    width: 100vw;
  }
`;

class Menu extends React.Component {
  state = {
    isMenuOpen: false
  };

  toggleMenu = () =>
    this.setState(({ isMenuOpen }) => ({ isMenuOpen: !isMenuOpen }));

  render() {
    const { isMenuOpen } = this.state;
    return (
      <React.Fragment>
        <div
          className={`${menuBtn} ${isMenuOpen ? "closer" : null}`}
          onClick={this.toggleMenu}
        >
          <div className={`${btnLine} ${isMenuOpen ? "closer" : null}`} />
          <div className={`${btnLine} ${isMenuOpen ? "closer" : null}`} />
          <div className={`${btnLine} ${isMenuOpen ? "closer" : null}`} />
        </div>
        <div className={`${menuOverlay} ${isMenuOpen ? "show" : null}`}>
          <nav>
            <Link to="/">開始遊戲</Link>
            <Link to="/feeds">最新動態</Link>
            <Link to="about">關於</Link>
            <Link to="terms">使用條款</Link>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}

export default Menu;
