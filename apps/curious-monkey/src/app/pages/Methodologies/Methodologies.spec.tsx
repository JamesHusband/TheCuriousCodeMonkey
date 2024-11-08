import { render } from '@testing-library/react';

import Methodologies from './Methodologies';

describe('Methodologies', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Methodologies />);
    expect(baseElement).toBeTruthy();
  });
});
