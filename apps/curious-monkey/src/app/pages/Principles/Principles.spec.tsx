import { render } from '@testing-library/react';

import Principles from './Principles';

describe('Principles', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Principles />);
    expect(baseElement).toBeTruthy();
  });
});
