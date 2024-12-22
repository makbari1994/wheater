import { render, screen } from '@testing-library/react';
import WeatherCard from './WeatherCard';

describe('WeatherCard', () => {
  const mockWeatherData = {
    temp: 25,
    weather: [{ description: 'Clear sky', icon: '01d' }],
    time: '12:00 PM',
  };

  it('renders weather description, temperature, and time', () => {
    render(<WeatherCard currentWeather={mockWeatherData} handleUnitChange={jest.fn()} />);

    const description = screen.getByText(/Clear sky/i);
    const temperature = screen.getByText(/25°/i);
    const time = screen.getByText(/12:00 PM/i);

    expect(description).toBeInTheDocument();
    expect(temperature).toBeInTheDocument();
    expect(time).toBeInTheDocument();
  });

  it('renders weather icon', () => {
    render(<WeatherCard currentWeather={mockWeatherData} handleUnitChange={jest.fn()} />);

    const icon = screen.getByAltText(/Weather Icon/i);
    expect(icon).toHaveAttribute('src', 'https://www.weatherbit.io/static/img/icons/01d.png');
  });

  it('calls handleUnitChange when button is clicked', () => {
    const mockHandleUnitChange = jest.fn();
    render(<WeatherCard currentWeather={mockWeatherData} handleUnitChange={mockHandleUnitChange} />);

    const button = screen.getByText(/Switch Unit/i);
    button.click();

    expect(mockHandleUnitChange).toHaveBeenCalledTimes(1);
  });
});
