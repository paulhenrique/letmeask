import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './services/firebase';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)

  return render(ui, { wrapper: BrowserRouter })
}

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Tire as dúvidas da sua audiência em tempo-real/i);
  const titleText = screen.getByText(/Crie salas de Q&A ao-vivo/i)
  expect(linkElement).toBeInTheDocument();
  expect(titleText).toBeInTheDocument();
});

test('Able to login', () => {
  render(<App />);
  const loginButton = screen.getByText(/Crie sua sala com o Google/i);
  expect(loginButton).toBeInTheDocument();
});

test('Able to enter in Room', () => {
  render(<App />);
  const loginButton = screen.getByText(/Entrar na sala/i);
  expect(loginButton).toBeInTheDocument();
});

test('Render Buttons', async () => {
  const route = '/rooms/new';
  renderWithRouter(<App />, { route });
  const button = await screen.getByText(/Criar sala/i);
  expect(button).toBeInTheDocument();

  const enterNewRoom = await screen.getByText(/clique aqui/i);
  expect(enterNewRoom).toBeInTheDocument();

});

test('Render Inputs', async () => {
  const route = '/rooms/new';
  renderWithRouter(<App />, { route });
  const inputType = await screen.findByPlaceholderText(/Nome da sala/i);
  expect(inputType).toBeInTheDocument();
});

test('Render page rooms', async () => {
  const route = '/rooms/new';
  renderWithRouter(<App />, { route });
  const pageDescription = await screen.getByText(/Criar uma nova sala/i);
  expect(pageDescription).toBeInTheDocument();
});