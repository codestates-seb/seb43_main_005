import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserTest } from "../redux/features/user/userSlice";

export default function useTestModal() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUserTest(true));
  }, []);
}
