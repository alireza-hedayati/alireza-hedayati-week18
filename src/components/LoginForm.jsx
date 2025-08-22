import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import logo from "../assets/Union.png";
import styles from "../styles/Form.module.css";

import useLogin from "../hooks/useLogin";
import loginSchema from "../helpers/loginSchema";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginMutation = useLogin();

  const submitHandler = (data) => {
    loginMutation.mutate(
      {
        username:data.username,
        password:data.password
      }
    );
  };

  return (
    <div className={styles.container}>
      <h1>بوت کمپ بوتو استارت</h1>
      <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
        <img src={logo} alt="لوگو" />
        <h2>فرم ثبت نام</h2>

        <div>
          <input
            type="text"
            {...register("username")}
            placeholder="نام کاربری"
          />
          <span>{errors.username?.message}</span>
        </div>

        <div>
          <input
            type="password"
            {...register("password")}
            placeholder="رمز عبور"
          />
          <span>{errors.password?.message}</span>
        </div>
        <button type="submit">ورود</button>
        <Link className={styles.link} to="/registration">
          ! ایجاد حساب کاربری
        </Link>
      </form>
    </div>
  );
}

export default LoginForm;
