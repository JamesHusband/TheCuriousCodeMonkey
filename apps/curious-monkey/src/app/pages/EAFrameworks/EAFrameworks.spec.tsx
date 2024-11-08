import { render } from '@testing-library/react';

import EAFrameworks from './EAFrameworks';

describe('EAFrameworks', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EAFrameworks />);
    expect(baseElement).toBeTruthy();
  });
});
