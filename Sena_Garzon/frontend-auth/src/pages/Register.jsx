import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    password: "",
    rol: "aprendiz", // valor por defecto
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      if (storedUser.rol === "admin") {
        navigate("/admin-dashboard");
      } else if (storedUser.rol === "instructor") {
        navigate("/instructor-dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/register", formData);
      toast.success("Usuario registrado correctamente. Redirigiendo...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error al registrar");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-white px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <div className="text-center mb-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/83/Sena_Colombia_logo.svg"
            alt="Logo SENA"
            className="h-12 mx-auto mb-2"
          />
          <h2 className="text-2xl font-bold text-green-700">Registro SENA Garzón</h2>
          <p className="text-sm text-gray-600">Plataforma educativa complementaria</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            value={formData.correo}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 pr-10"
              required
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </div>
          </div>

          <select
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          >
            <option value="">Selecciona tu rol</option>
            <option value="aprendiz">Aprendiz</option>
            <option value="instructor">Instructor</option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition duration-200"
          >
            Registrarse
          </button>

          <p className="text-center text-gray-600 mt-4 text-sm">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-green-700 hover:underline font-medium">
              Inicia sesión
            </Link>
          </p>

          <p className="text-center text-gray-600 mt-2 text-sm">
            <Link to="/" className="text-green-700 hover:underline font-medium">
              Volver al inicio
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
