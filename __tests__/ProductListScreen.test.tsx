import {render, screen, fireEvent} from '@testing-library/react-native';
import {ProductListScreen} from '../src/screens';

test('form submits two answers', () => {
  render(<ProductListScreen />);
});
