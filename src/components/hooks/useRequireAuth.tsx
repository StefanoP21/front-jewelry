import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Función auxiliar para validar el token
const isValidToken = (token: string | null): boolean => {
  if (!token) return false;

  // Aquí puedes agregar la lógica para validar el token
  // Por ejemplo, decodificar un JWT o verificar su caducidad.
  // Ejemplo simple: verificar si el token existe y no es una cadena vacía
  return token !== "";
};

export default function useRequireAuth() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!isValidToken(token)) {
      // Si el token no es válido, redirige al usuario a la página de login
      router.push("/login");
    }
  }, [router]);
}
