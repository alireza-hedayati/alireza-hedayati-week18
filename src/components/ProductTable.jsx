import { MdDeleteOutline } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";
import styles from "../styles/ProductTable.module.css";
import DeleteModal from "./DeleteModal";
import { useState } from "react";
import EditModal from "./EditModal"

function ProductTable({ products }) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedProduct,setSelectedProduct]= useState(null)
  const[openEditModal,setOpenEditModal]= useState(false);
  const[selectEdit,setSelectEdit]=useState(null);
  const handleDelteBtn=(product)=>{
  setSelectedProduct(product);
  setDeleteModal(true)
 }
 const handleEditBtn=(product)=>{
  setSelectEdit(product);
  setOpenEditModal(true)
 }

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>نام کالا</th>
            <th>موجودی</th>
            <th>قیمت</th>
            <th>شناسه کالا</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                محصولی یافت نشد
              </td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.quantity}</td>
                <td>{p.price}</td>
                <td>{p.id}</td>
                <td className={styles.actions}>
                  <button
                    style={{ color: "#F43F5E" }}
                    onClick={()=>handleDelteBtn(p)}
                  >
                    <MdDeleteOutline />
                  </button>
                  {deleteModal && (
                    <DeleteModal
                      onClose={() => setDeleteModal(false)}
                      selectedProduct={selectedProduct}
                    />
                  )}
                  <button onClick={()=>handleEditBtn(p)}>
                    <RiEdit2Line style={{ color: "#4ADE80" }} />
                  </button>
                  {openEditModal&& <EditModal isEditModal={openEditModal} onClose={()=>setOpenEditModal(false)} selectedProduct={selectEdit} />}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
