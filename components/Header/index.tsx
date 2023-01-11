import Image from "next/image";
import Logo from "../../public/headerImg.png";
import styles from "../../styles/header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <Image src={Logo} alt="" className={styles.headerImg} />
      <ul className={styles.headerList}>
        <li>JOBS</li>
        <li>CAREERS</li>
        <li>POST JOB</li>
      </ul>
    </div>
  );
}
