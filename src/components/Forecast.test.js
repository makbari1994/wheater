import { render, screen } from '@testing-library/react';
import Forecast from './Forecast';

describe('Forecast', () => {
  const mockForecastData = [
    { datetime: '2024-12-23', temp_max: 25, temp_min: 15, weather: { icon: '01d' } },
    { datetime: '2024-12-24', temp_max: 26, temp_min: 16, weather: { icon: '02d' } },
  ];

  it('renders forecast for each day', () => {
    render(<Forecast forecast={mockForecastData} />);

    const day1 = screen.getByText(/2024-12-23/i);
    const day2 = screen.getByText(/2024-12-24/i);
    const temp1 = screen.getByText(/25° \/ 15°/i);
    const temp2 = screen.getByText(/26° \/ 16°/i);

    expect(day1).toBeInTheDocument();
    expect(day2).toBeInTheDocument();
    expect(temp1).toBeInTheDocument();
    expect(temp2).toBeInTheDocument();
  });

  it('renders weather icons correctly', () => {
    render(<Forecast forecast={mockForecastData} />);

    const icon1 = screen.getByAltText(/Weather Icon/i);
    const icon2 = screen.getByAltText(/Weather Icon/i);

    expect(icon1).toHaveAttribute('src', 'https://www.weatherbit.io/static/img/icons/01d.png');
    expect(icon2).toHaveAttribute('src', 'https://www.weatherbit.io/static/img/icons/02d.png');
  });
});
