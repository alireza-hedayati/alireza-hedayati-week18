import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import registerSchema from "../helpers/registerSchema";
import logo from "../assets/Union.png";
import styles from "../styles/Form.module.css";
import useRegister from "../hooks/useRegister";

function RegistrationForm() {
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const submitHandler = async (data) => {
    const { confirmPassword, ...userData } = data;
    registerMutation.mutate(userData);
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

        <div>
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="تکرار رمز عبور"
          />
          <span>{errors.confirmPassword?.message}</span>
        </div>
        <button type="submit">ثبت نام</button>

        <Link className={styles.link} to="/login">
          حساب کاربری دارید؟
        </Link>
      </form>
    </div>
  );
}

export default RegistrationForm;
