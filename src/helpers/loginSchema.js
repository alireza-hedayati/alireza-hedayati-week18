import * as yup from "yup";

const loginSchema = yup.object().shape({
  username:yup.string().required("نام کاربری الزامی است"),
  password:yup.string().required("رمز عبور الزامی است."),
})

export default loginSchema;