import styles from './FunctionalPatterns.module.scss';

/* eslint-disable-next-line */
export interface FunctionalPatternsProps {}

export function FunctionalPatterns(props: FunctionalPatternsProps) {
  return (
    <div className={styles['container']}>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600 h-32 md:h-64 font-sans">
          <h2 className="text-2xl text-center">Pattern Placeholder</h2>
        </div>
        <div className="border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600 h-32 md:h-64 font-sans">
          <h2 className="text-2xl text-center">Pattern Placeholder</h2>
        </div>
        <div className="border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600 h-32 md:h-64 font-sans">
          <h2 className="text-2xl text-center">Pattern Placeholder</h2>
        </div>
      </div>
    </div>
  );
}

export default FunctionalPatterns;
