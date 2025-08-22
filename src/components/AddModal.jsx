import { useMutation, useQueryClient } from "@tanstack/react-query";
import schema from "../helpers/addProductSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import styles from "../styles/AddModal.module.css";
import { api } from "../api/auth";
import ProductForm from "./ProductForm";

function AddModal({ isOpen, onClose }) {
  const queryClient = useQueryClient();

  const { reset } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (newProduct) => api.post("/products", newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      reset();
      onClose();
    },
    onError: (error) =>
      console.log("Mutation error:", error.response?.data || error.message),
  });
  if (!isOpen) return null;

  const submitHandler = (data) => {
    mutation.mutate({
      name: data.name,
      price: Number(data.price),
      quantity: Number(data.quantity),
    });
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2>ایجاد محصول جدید</h2>
        <ProductForm submitHandler={submitHandler} onClose={onClose} />
      </div>
    </div>
  );
}

export default AddModal;
