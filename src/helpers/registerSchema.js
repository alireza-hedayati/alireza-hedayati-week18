import * as yup from "yup";

const registerSchema = yup.object().shape({
  username: yup
    .string()
    .min(6, "حداقل باید 6 حرف وارد شود")
    .max(20, "حداکثر می توان 20 حرف وارد کرد")
    .required("پر کردن این قسمت الزامی است"),
  password: yup
    .string()
    .min(6, "حداقل 6 کاراکتر")
    .max(20, "حداکثر 20 کاراکتر")
    .required("پر کردن این قسمت الزامی است"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "رمز عبور باید یکسان باشد")
    .required("لطفا رمز عبور را تایید کنید"),
});

export default registerSchema;
