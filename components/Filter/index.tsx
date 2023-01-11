import React from "react";
import styles from "../../styles/filter.module.css";

interface IFilterProps {
  sortFn: (type: string) => void;
}

export default function Filter({ sortFn }: IFilterProps) {
  return (
    <div className={styles.filterContainer}>
      <button onClick={() => sortFn("name")}>Sort by Name</button>
      <button onClick={() => sortFn("recent")}>Filter Most Recent</button>
    </div>
  );
}
