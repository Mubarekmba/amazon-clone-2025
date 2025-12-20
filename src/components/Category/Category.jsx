import React from "react";
import { categoryInfos } from "./categoryData";
import CategoryCard from "./CategoryCard";
import styles from "./category.module.css";
function Category() {
  return (
    <section className={styles.category__container}>
      {categoryInfos.map((infos) => (
        <CategoryCard key={infos.name} data={infos} />
      ))}
    </section>
  );
}

export default Category;
