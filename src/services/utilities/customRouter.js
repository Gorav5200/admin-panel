// Constant.js
import { useNavigate, useParams, useLocation } from "react-router-dom";

export default function UseCustomRouter() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  return { navigate, params, location };
}
