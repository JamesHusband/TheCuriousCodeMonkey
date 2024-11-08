import { render } from '@testing-library/react';

import FunctionalPatterns from './FunctionalPatterns';

describe('FunctionalPatterns', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FunctionalPatterns />);
    expect(baseElement).toBeTruthy();
  });
});
