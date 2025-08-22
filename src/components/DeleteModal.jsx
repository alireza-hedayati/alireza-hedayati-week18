import styles from "../styles/DeleteModal.module.css";
import close from "../assets/Close.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/auth";

function DeleteModal({ onClose, selectedProduct }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => {
      return api.delete(`/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      onClose();
    },
  });

  const deleteProduct = () => {
    if (selectedProduct) {
      mutation.mutate(selectedProduct.id);
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <img src={close} className={styles.close} />
        <p>آیا از حذف این محصول مطمئنید؟</p>
        <div className={styles.actions}>
          <button
            className={styles.deleteBtn}
            onClick={deleteProduct}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "در حال حذف..." : "حذف"}
          </button>
          <button className={styles.cancleBtn} onClick={onClose}>
            لغو
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
