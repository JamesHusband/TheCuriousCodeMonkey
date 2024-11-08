import { render } from '@testing-library/react';

import IsoStandards from './IsoStandards';

describe('IsoStandards', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IsoStandards />);
    expect(baseElement).toBeTruthy();
  });
});
