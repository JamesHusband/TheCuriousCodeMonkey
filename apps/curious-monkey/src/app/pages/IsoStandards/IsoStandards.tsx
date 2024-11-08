import styles from './IsoStandards.module.scss';

/* eslint-disable-next-line */
export interface IsoStandardsProps {}

export function IsoStandards(props: IsoStandardsProps) {
  return (
    <div className={styles['container']}>
      <h1>ISO Standards</h1>
    </div>
  );
}

export default IsoStandards;
