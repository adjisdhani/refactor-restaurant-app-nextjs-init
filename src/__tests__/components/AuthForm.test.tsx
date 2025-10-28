import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import AuthForm from '@/components/login/AuthForm';
import { useState } from 'react';

function AuthFormWithState(props: Partial<Parameters<typeof AuthForm>[0]>) {
  const [username, setUsername] = useState(props.username ?? '');
  const [password, setPassword] = useState(props.password ?? '');
  const setU = (v: string) => setUsername(v);
  const setP = (v: string) => setPassword(v);

  return (
    <AuthForm
      username={username}
      password={password}
      setUsername={setU}
      setPassword={setP}
      onSubmit={props.onSubmit ?? (() => {})}
      error={props.error ?? ''}
      loading={props.loading ?? false}
      LoadingComponent={props.LoadingComponent ?? null}
      dynamicMessage={props.dynamicMessage ?? 'Loading...'}
    />
  );
}

describe('Komponen AuthForm', () => {
  it('harus menampilkan input username, password, dan tombol submit', () => {
    render(
      <AuthFormWithState />
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('memanggil onSubmit ketika form disubmit', async () => {
    const user = userEvent.setup();

    // <-- beri tipe yang tepat di sini
    const handleSubmit = vi.fn<(e: React.FormEvent<HTMLFormElement>) => void>((e) => {
      e.preventDefault();
    });

    render(<AuthFormWithState onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText(/username/i), 'iyonk');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(handleSubmit).toHaveBeenCalled();
  });

  it('menonaktifkan tombol ketika loading', () => {
    render(<AuthFormWithState loading={true} />);

    expect(screen.getByRole('button', { name: /signing in.../i })).toBeDisabled();
  });
});
