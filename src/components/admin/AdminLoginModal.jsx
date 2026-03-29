import React from 'react'

const AdminLoginModal = () => {
  const { adminLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await adminLogin(email, password);
    if (!res.success) alert(res.error);
  };

  return (
    <div className="p-6 bg-white rounded-xl">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <button onClick={handleLogin} className="bg-black text-white px-4 py-2">
        Login
      </button>
    </div>
  );
};

export default AdminLoginModal;