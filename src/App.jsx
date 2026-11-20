import { useState } from 'react';
import './App.css';
import { Routes, Route, Link, NavLink, Outlet, Navigate,
  useParams, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
 
const users = [
  { id: 1, name: 'Anna', city: 'Opole', age: 24 },
  { id: 2, name: 'Jan', city: 'Wrocław', age: 31 },
  { id: 3, name: 'Maria', city: 'Opole', age: 28 },
];
 
export default function App() {
  const [user, setUser] = useState(null);
 
  return (
    <>
      <nav style={{ display: 'flex', gap: 10 }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/users">Users</Link>
        <Link to="/dashboard">Dashboard</Link>
        {user && <button onClick={() => setUser(null)}>Wyloguj</button>}
      </nav>
      <div className='page'>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/contact" element={<h1>Contact</h1>} />
  
          <Route path="/users" element={<Users />}>
            <Route index element={<UsersList />} />
            <Route path="stats" element={<Stats />} />
            <Route path=":id" element={<Profile />} />
          </Route>
  
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/dashboard" element={
            user ? <h1>Dashboard - witaj {user}</h1> : <RedirectToLogin />
          } />
  
          <Route path="*" element={<><h1>404 - Not Found</h1><Link to="/">Home</Link></>} />
        </Routes>``
        </div>
    </>
  );
}
 
function Users() {
  return (
    <>
      <h1>Users</h1>
      <NavLink to="/users" end>Lista</NavLink> | <NavLink to="/users/stats">Statystyki</NavLink>
      <Outlet />
    </>
  );
}
 
function UsersList() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const filtered = users.filter(u => u.name.toLowerCase().includes(q.toLowerCase()));
 
  return (
    <>
      <input value={q} placeholder="Szukaj"
        onChange={e => setParams(e.target.value ? { q: e.target.value } : {})} />
      <ul>
        {filtered.map(u => (
          <li key={u.id}><Link to={`/users/${u.id}`}>{u.name}</Link> - {u.city}</li>
        ))}
      </ul>
    </>
  );
}
 
function Stats() {
  const avg = users.reduce((s, u) => s + u.age, 0) / users.length;
  return <p>Liczba: {users.length}, średni wiek: {avg.toFixed(1)}</p>;
}
 
function Profile() {
  const { id } = useParams();
  const u = users.find(u => u.id === Number(id));
  if (!u) return <p>Nie ma takiego użytkownika</p>;
  return <p>{u.name}, {u.city}, {u.age} lat</p>;
}
 
function RedirectToLogin() {
  const location = useLocation();
  return <Navigate to="/login" state={{ from: location.pathname }} />;
}
 
function Login({ setUser }) {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
 
  function submit(e) {
    e.preventDefault();
    setUser(name);
    navigate(location.state?.from || '/');
  }
 
  return (
    <form onSubmit={submit}>
      <h1>Login</h1>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button>Zaloguj</button>
    </form>
  );
}