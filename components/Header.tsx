import styled from "styled-components";
import { THEMES, ThemeContext } from "../themes/themes";
import PreventClickFocus from "./PreventClickFocus";

const Toggler = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding-right: 8px;
`;

const Toggle = styled.div`
  /* cursor: pointer; */
  align-self: center;
  display: flex;
  align-items: center;
`;

const Option = styled(PreventClickFocus)`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 12px;
  padding: 0;
  font-size: 14px;

  color: ${(props) =>
    props.activeTheme === props.active
      ? "var(--active-color)"
      : "var(--color)"};
`;

const Divider = styled.div`
  width: 1px;
  background: var(--color);
  height: 25px;
`;

const Bar = styled.div`
  height: var(--header-height);
  position: fixed;
  display: flex;
  top: 0;
  right: 0;
  justify-content: center;
  left: 0;
`;

const Logo = styled.div`
  font-family: var(--accent-font);
  color: var(--color);
  font-size: 38px;
  align-self: center;
`;

const Header = () => {
  return (
    <Bar>
      <Logo>Coton</Logo>
      <ThemeContext.Consumer>
        {({ theme, setTheme }) => (
          <Toggler>
            <Toggle>
              <Option
                tag="button"
                activeTheme={theme}
                active="dark"
                onClick={() => setTheme(THEMES.dark)}
              >
                Dark
              </Option>
              <Divider></Divider>
              <Option
                tag="button"
                activeTheme={theme}
                active="light"
                onClick={() => setTheme(THEMES.light)}
              >
                Light
              </Option>
            </Toggle>
          </Toggler>
        )}
      </ThemeContext.Consumer>
    </Bar>
  );
};

export default Header;
