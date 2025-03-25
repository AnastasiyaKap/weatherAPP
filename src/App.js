import './index.css';
import WeatherForm from './components/WeatherForm';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

export default function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <WeatherForm />
      </ErrorBoundary>
    </div>
  );
}
