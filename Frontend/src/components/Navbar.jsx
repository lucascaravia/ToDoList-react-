import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated, user);

  return (
    <nav className="my-3 flex justify-between items-center py-4 px-6 rounded-lg shadow-md"
    style={{ backgroundColor: '#07074f' }}>
    
      {/* Logo */}
      <h1 className="text-2xl font-extrabold text-white">
        <Link to={isAuthenticated ? "/tasks" : "/"}>React Tasks</Link>
      </h1>

      {/* Menú */}
      <ul className="flex items-center gap-x-4">
        {isAuthenticated ? (
          <>
            <li className="text-white font-medium">
              Bienvenido, <span className="text-orange-400">{user.username}</span>
            </li>
            <li>
              <Link
                to="/add-task"
                className=" text-white px-4 py-2 rounded-lg font-semibold  hover:bg-orange-500 transition"
              >
                Agregar Tarea
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => logout()}
                className="text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <ButtonLink
                to="/login"
                className="bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                Login
              </ButtonLink>
            </li>
            <li>
              <ButtonLink
                to="/register"
                className="bg-cyan-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-cyan-600 transition"
              >
                Registro
              </ButtonLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
