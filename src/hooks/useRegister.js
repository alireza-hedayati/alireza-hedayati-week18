import { useMutation } from "@tanstack/react-query";
import { api } from "../api/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useRegister = ()=>{
  const navigate = useNavigate();

  return useMutation({
    mutationFn:(userData)=> api.post("/auth/register",userData),
    onSuccess:()=>{
      toast.success("ثبت نام موفق بود");
      navigate("/login",{replace:true})
    },
    onError:(error)=>{
      toast.error(error.response?.data?.message||"مشکلی پیش آمده است")
    },


  })
}

export default useRegister;