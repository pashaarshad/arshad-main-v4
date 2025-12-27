export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
      <h1 style={{ fontSize: '3rem', color: '#e53e3e' }}>404 - Page Not Found</h1>
      <p style={{ fontSize: '1.25rem', color: '#333', marginTop: '1rem' }}>
        Sorry, the page you are looking for does not exist.
      </p>
      <a href="/" style={{ marginTop: '2rem', color: '#3182ce', textDecoration: 'underline', fontSize: '1.1rem' }}>
        Go Home
      </a>
    </div>
  );
}
