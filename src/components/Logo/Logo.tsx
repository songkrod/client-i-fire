import Image from "next/image";

import styles from './Logo.module.css';

const Logo = () => {
  return (
    <div className={styles.logo}>
      <Image alt='buff-logo' src='/card/buff.svg' fill objectFit='contain' />
    </div>
  )
};

export default Logo;