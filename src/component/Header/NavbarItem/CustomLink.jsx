import { memo } from "react";
import { useMatch, useResolvedPath } from "react-router";
import { NavLink } from "react-router-dom";

const CustomLink = ({ to, icon, index }) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <NavLink
      className={match ? "activeNav" : "inactiveNav"}
      key={index}
      to={to}
    >
      <img src={match ? icon[1] : icon[0]} alt="" />
    </NavLink>
  );
};
export default memo(CustomLink);
