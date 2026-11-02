import { useState } from 'react';
import { signIn } from '../lib/productsApi';

const AdminLogin = ({ onSignedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    const { data, error: signInError } = await signIn(email.trim(), password);
    setBusy(false);
    if (signInError) {
      setError(
        signInError.message === 'Invalid login credentials'
          ? 'Correo o contraseña incorrectos.'
          : signInError.message
      );
      return;
    }
    onSignedIn(data.session);
  };

  return (
    <main className="admin-shell admin-shell--center">
      <form className="admin-card admin-login" onSubmit={handleSubmit}>
        <p className="admin-top__eyebrow">Del Mar Artesanías</p>
        <h1 className="admin-login__title">Entrar al panel</h1>
        <p className="admin-muted">Solo la administradora puede crear, editar y borrar piezas.</p>

        <label className="admin-field">
          <span>Correo</span>
          <input
            type="email"
            name="email"
            autoComplete="username"
            inputMode="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label className="admin-field">
          <span>Contraseña</span>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        {error ? <p className="admin-error" role="alert">{error}</p> : null}

        <button type="submit" className="admin-btn admin-btn--primary" disabled={busy}>
          {busy ? 'Entrando…' : 'Entrar'}
        </button>

        <a className="admin-link admin-link--center" href="#/">Volver a la tienda</a>
      </form>
    </main>
  );
};

export default AdminLogin;
