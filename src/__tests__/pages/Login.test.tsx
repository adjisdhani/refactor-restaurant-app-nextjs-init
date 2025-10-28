import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

const fakePush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: fakePush }),
}));

import Login from '@/components/login/Login';
import * as csrfUtil from '@/utils/csrf';

describe('Halaman Login', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    fakePush.mockReset();
  });

  it('menampilkan error jika username/password terlalu pendek', async () => {
    render(<Login />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/username/i), 'ab'); // < 3
    await user.type(screen.getByLabelText(/password/i), '123'); // < 6
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText(/Username minimal 3 karakter/i)).toBeInTheDocument();
  });

  it('login berhasil akan memanggil router.push("/main")', async () => {
    vi.spyOn(csrfUtil, 'getCsrfTokenFromCookie').mockReturnValue('token123');

    // Mock fetch sukses: gunakan vi.stubGlobal untuk mock global fetch
    const mockResponse = new Response(JSON.stringify({ ok: true }), { status: 200 });
    const mockedFetch = vi.fn(() => Promise.resolve(mockResponse)) as unknown as typeof fetch;
    vi.stubGlobal('fetch', mockedFetch);

    render(<Login />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/username/i), 'validuser');
    await user.type(screen.getByLabelText(/password/i), 'validpassword');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockedFetch).toHaveBeenCalledWith('/api/login', expect.any(Object));
      expect(fakePush).toHaveBeenCalledWith('/main');
    });
  });

  it('login gagal menampilkan pesan error', async () => {
    vi.spyOn(csrfUtil, 'getCsrfTokenFromCookie').mockReturnValue('token123');

    const mockResponse = new Response('Invalid credentials', { status: 401 });
    const mockedFetch = vi.fn(() => Promise.resolve(mockResponse)) as unknown as typeof fetch;
    vi.stubGlobal('fetch', mockedFetch);

    render(<Login />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/username/i), 'wronguser');
    await user.type(screen.getByLabelText(/password/i), 'wrongpass');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText(/Invalid credentials|Login gagal|Terjadi kesalahan/i)).toBeInTheDocument();
  });
});
