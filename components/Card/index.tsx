import { ICardData } from "../../@types/job.types";
import styles from "../../styles/card.module.css";
import Image from "next/image";
import { useState } from "react";

export interface ICardProps {
  data: ICardData;
}

export default function Card({ data }: ICardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { companyLogo, companyName, jobDesc, jobTitle, postedDate, estimatedSalary } = data;

  // Simple Card construction with extra info
  return (
    <div className={styles.card}>
      <div className={styles.cardJobInfo}>
        <Image src={companyLogo} width={180} height={180} alt={companyName} />
        <div>
          {/* Setting Dynamic open and close button icon */}
          <span onClick={() => setIsOpen(!isOpen)} className={styles.openBtn}>
            {isOpen ? "˄" : "˅"}
          </span>
          <h4 className={styles.cardTitle}>{jobTitle}</h4>
          <span className={styles.cardCompany}>{companyName}</span>
          {/* Using dangerouslySetInnerHTML to apply jobDesc with preApplied tags, although its a security Risk. */}
          <p
            dangerouslySetInnerHTML={{ __html: jobDesc }}
            // Applying custom css classnames to handle custom height animation
            className={`${styles.cardDesc} ${isOpen ? styles.open : ""}`}
          />
        </div>
      </div>
      <p>
        <span>{estimatedSalary}</span>
        {postedDate}
      </p>
      <button className={styles.cardBtn} onClick={() => alert("Applied!")}>
        View or Apply
      </button>
    </div>
  );
}
