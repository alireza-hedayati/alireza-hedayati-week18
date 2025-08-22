import ProductForm from "./ProductForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/auth";

import styles from "../styles/AddModal.module.css";

function EditModal({ selectedProduct, onClose, isEditModal }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updatedProduct) => {
      api.put(`/products/${updatedProduct.id}`, updatedProduct);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      onClose();
    },
  });
  const submitHandler = (data) => {
    mutation.mutate({
      ...data,
      id: selectedProduct.id,
      price: Number(data.price),
      quantity: Number(data.quantity),
    });
  };
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2>ویرایش اطلاعات</h2>
        <ProductForm
          submitHandler={submitHandler}
          onClose={onClose}
          defaultValues={selectedProduct}
          isEdit={isEditModal}
        />
      </div>
    </div>
  );
}

export default EditModal;
