import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import schema from "../helpers/addProductSchema";
import styles from "../styles/AddModal.module.css"


function ProductForm({submitHandler,onClose,defaultValues={},isEdit}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues
  });
  return (
    <div>
      <form className={styles.modalForm} onSubmit={handleSubmit(submitHandler)}>
        <label htmlFor="name">نام کالا</label>
        <input
          type="text"
          id="name"
          placeholder="نام کالا"
          {...register("name")}
        />
        <span>{errors.name && errors.name.message}</span>

        <label htmlFor="quantity">تعداد موجودی</label>
        <input
          type="number"
          id="quantity"
          placeholder="تعداد"
          {...register("quantity")}
        />
        <span>{errors.quantity && errors.quantity.message}</span>

        <label htmlFor="price">قیمت</label>
        <input
          type="number"
          id="price"
          placeholder="قیمت"
          {...register("price")}
        />
        <span>{errors.price && errors.price.message}</span>

        <div className={styles.modalActions}>
          <button type="submit" className={styles.confirmBtn}>
            {!isEdit?"ایجاد":"ثبت اطلاعات جدید"}
          </button>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
