import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

import styles from "../styles/Layout.module.css";
import profileImg from "../assets/Felix-Vogel-4.png";
import { useEffect, useState } from "react";
import { useProducts } from "../context/ProductContext";
import ReactPaginate from "react-paginate";
function Layout({ children, data, handlePageClick }) {
  const [inputValue, setInputValue] = useState("");
  const { setSearchValue, state } = useProducts();
  const { searchValue } = state;

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchValue(inputValue.toLowerCase().trim());
    }, 400);
    return () => clearTimeout(handler);
  }, [inputValue, setSearchValue]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchValue(inputValue.trim().toLowerCase());
    }
  };

  const searchProducts = () => {
    return (data?.data || []).filter((product) =>
      product.name.toLowerCase().trim().includes(searchValue)
    );
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.searchSection}>
          <IoSearchOutline
            onClick={searchProducts}
            className={styles.searchIcon}
          />
          <input
            type="text"
            placeholder="جستجو کالا"
            value={inputValue}
            onChange={(e) =>
              setInputValue(e.target.value.toLocaleLowerCase().trim())
            }
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className={styles.profile}>
          <img src={profileImg} alt="عکس پروفایل" />
          <div className={styles.info}>
            <p>میلاد عظمی</p>
            <p>مدیر</p>
          </div>
        </div>
      </header>
      {children}

      <footer>
        <ReactPaginate
          breakLabel="..."
          nextLabel={<MdOutlineNavigateNext/>}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={data?.totalPages}
          previousLabel={<GrFormPrevious />}
          renderOnZeroPageCount={null}
          containerClassName={styles.pagination}
          activeClassName={styles.active}
        />
      </footer>
    </div>
  );
}

export default Layout;
