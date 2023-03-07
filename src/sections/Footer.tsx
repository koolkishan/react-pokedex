import React from "react";
import { useLocation } from "react-router-dom";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../utils/firebaseConfig";
import { useAppDispatch } from "../app/hooks";
import { setToast, setUserStatus } from "../app/slices/AppSlice";

export default function Footer() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const logOutUser = () => {
    signOut(firebaseAuth);
    dispatch(setUserStatus(undefined));
    dispatch(setToast("Logged out successfully from Firebase"));
  };
  return (
    <footer>
      <div className="block"></div>
      <div className="data">
        {location.pathname.includes("/pokemon") && (
          <ul>
            <li className="active">Description</li>
            <li>Evolution</li>
            <li>Catching</li>
            <li>Capable Moves</li>
          </ul>
        )}
      </div>
      <div className="block">
        <MdOutlinePowerSettingsNew onClick={logOutUser} />
      </div>
    </footer>
  );
}
