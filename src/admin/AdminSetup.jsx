/** Se muestra cuando el panel se abre en producción sin las claves de Supabase. */
const AdminSetup = () => (
  <main className="admin-shell admin-shell--center">
    <div className="admin-card">
      <p className="admin-top__eyebrow">Del Mar Artesanías</p>
      <h1 className="admin-login__title">Falta conectar Supabase</h1>
      <p className="admin-muted">
        El panel necesita la dirección del proyecto y la clave pública. Son tres pasos y se
        hacen una sola vez:
      </p>
      <ol className="admin-steps">
        <li>Crea el proyecto en supabase.com y abre <strong>SQL Editor</strong>.</li>
        <li>
          Pega y ejecuta el contenido de <code>supabase/schema.sql</code>: crea la tabla, las
          políticas y el almacén de fotos.
        </li>
        <li>
          Copia <code>.env.example</code> como <code>.env.local</code> y rellena
          <code> VITE_SUPABASE_URL</code> y <code>VITE_SUPABASE_ANON_KEY</code> con los datos de
          <strong> Project Settings → API</strong>. En Vercel, esas dos variables van en
          <strong> Settings → Environment Variables</strong>.
        </li>
      </ol>
      <p className="admin-muted">
        Mientras tanto la tienda sigue mostrando las doce piezas del código, sin errores.
      </p>
      <a className="admin-link admin-link--center" href="#/">Volver a la tienda</a>
    </div>
  </main>
);

export default AdminSetup;
