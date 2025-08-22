import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiSettingsKnobs } from "react-icons/gi";
import { api } from "../api/auth";
import styles from "../styles/Dashboard.module.css";
import Layout from "../layout/Layout";
import ProductTable from "./ProductTable";
import { useProducts } from "../context/ProductContext";
import AddModal from "./AddModal";
import { TailSpin } from "react-loader-spinner";

function Dashboard() {
  const navigate = useNavigate();
  const { state } = useProducts();
  const { searchValue } = state;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", currentPage],
    queryFn: async () => {
      const response = await api.get(`/products?page=${currentPage}&limit=4`);
      return response.data;
    },
    keepPreviousData: true,
  });

  const filteredProducts = (data?.data || []).filter((product) =>
    product.name.toLowerCase().includes(searchValue)
  );

  if (isLoading) {
    return (
      <Layout>
        <div className={styles.loading}>
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="blue"
            ariaLabel="tail-spin-loading"
            radius="1"
          />
        </div>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout className={styles.error}>
        <div>مشکلی پیش آمده است.</div>
      </Layout>
    );
  }
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <>
      <Layout data={data} handlePageClick={handlePageClick}>
        <div className={styles.container}>
          <div className={styles.topBar}>
            <div className={styles.title}>
              <GiSettingsKnobs color="snow" fontSize="30px" />
              <h2>مدیریت کالا</h2>
            </div>
            <button onClick={() => setIsModalOpen(true)}>افزودن محصول</button>
            {isModalOpen && (
              <AddModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            )}
          </div>
          <ProductTable products={filteredProducts} />
        </div>
      </Layout>
    </>
  );
}

export default Dashboard;
