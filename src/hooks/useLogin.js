import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { api } from "../api/auth";
import { jwtDecode } from "jwt-decode";

const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => api.post("/auth/login", data),
    onSuccess: (response) => {
      localStorage.setItem("token", response.data.token);
      const token = response.data.token;
      const decoded = jwtDecode(token);
      localStorage.setItem("username", decoded.username);
      toast.success("با موفقیت وارد شدید");
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "مشکلی پیش آمده!");
    },
  });
};

export default useLogin;
