import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  Avatar,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { AppContext } from "../../contextAPI/appContext";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";

const ProfileDropDownMenu = ({ handleLogout, toProfile, refProfile }) => {
  const { state } = useContext(AppContext);
  return (
    <Menu>
      <MenuButton
        gutter={0}
        bg={"transparent"}
        _hover={{ bg: "transparent" }}
        _active={{ bg: "transparent" }}
        as={Button}
        rightIcon={<ChevronDownIcon marginLeft={"0"} color={"white"} />}
      >
        <Avatar src={state.user.pic} h={"50px"} w={"50px"} rounded={"50%"} />
      </MenuButton>
      <MenuList zIndex={"3000"} bg={"purple.300"} color={"white"} p={"0"}>
        <NavLink w={"100%"} to={toProfile} ref={refProfile}>
          <MenuItem
            as="div"
            display={"flex"}
            justifyContent={"center"}
            p={"10px"}
            _hover={{ bg: "green.300" }}
            bg={"purple.300"}
          >
            View Profile
          </MenuItem>
        </NavLink>
        <MenuDivider m={"0"} />
        <MenuItem
          as="div"
          display={"flex"}
          justifyContent={"center"}
          p={"10px"}
          _hover={{ bg: "red.300" }}
          bg={"purple.300"}
          onClick={() => handleLogout()}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileDropDownMenu;
