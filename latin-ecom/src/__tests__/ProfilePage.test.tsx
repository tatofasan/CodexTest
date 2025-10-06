import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfilePage from '../pages/ProfilePage';

describe('ProfilePage', () => {
  it('permite editar los campos del perfil y acceder a las acciones principales', async () => {
    render(<ProfilePage />);
    const user = userEvent.setup();

    const nameInput = screen.getByDisplayValue('Sofía Martínez');
    await user.clear(nameInput);
    await user.type(nameInput, 'Sofía M.');
    expect(screen.getByDisplayValue('Sofía M.')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Guardar cambios' }));
    await user.click(screen.getByRole('button', { name: 'Activar por SMS' }));
    await user.click(screen.getByRole('button', { name: 'Cerrar todas las sesiones' }));

    expect(screen.getByText('Equipo y roles')).toBeInTheDocument();
  });
});
