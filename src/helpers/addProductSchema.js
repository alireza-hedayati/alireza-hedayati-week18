  import * as yup from "yup"
  const schema = yup.object().shape({
    name: yup.string().required("پر کردن این بخش الزامی است"),
    quantity: yup
      .number().typeError("حتما باید عدد وارد کنید").positive("قیمت باید بزرگتر از صفر باشد")
      .required("پر کردن این بخش الزامی است"),
    price: yup
      .number().typeError("حتما باید عدد وارد کنید").min(0,"موجودی نمی تواند منفی باشد؟")
      .required("پر کردن این بخش الزامی است"),
  });

  export default schema