import styles from './EAFrameworks.module.scss';

/* eslint-disable-next-line */
export interface EAFrameworksProps {}

export function EAFrameworks(props: EAFrameworksProps) {
  return (
    <div className={styles['container']}>
      <h1>EA Frameworks</h1>
    </div>
  );
}

export default EAFrameworks;
