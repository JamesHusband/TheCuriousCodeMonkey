import styles from './HomePage.module.scss';

/* eslint-disable-next-line */
export interface HomePageProps {}

export function HomePage(props: HomePageProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome...</h1>
    </div>
  );
}

export default HomePage;
