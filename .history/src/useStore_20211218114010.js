import create from "zustand"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

function Nav() {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const [user] = useAuthState(auth);

const useStore = create((set) => ({

}))