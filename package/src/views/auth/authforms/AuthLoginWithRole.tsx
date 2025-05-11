import { Button, Label, TextInput, Radio } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/**
 * Componente di login con selezione del ruolo
 */
const AuthLoginWithRole = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("dentist");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Salva i dati di sessione nel localStorage
    const sessionData = {
      user: {
        email,
        role
      }
    };

    localStorage.setItem('user-session', JSON.stringify(sessionData));

    // Reindirizza alla dashboard appropriata
    if (role === "clinic") {
      navigate("/clinic");
    } else {
      navigate("/");
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Email" />
        </div>
        <TextInput
          id="email"
          placeholder="nome@esempio.com"
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="role" value="Tipo di utente" />
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <Radio
              id="dentist"
              name="role"
              value="dentist"
              checked={role === "dentist"}
              onChange={() => setRole("dentist")}
            />
            <Label htmlFor="dentist">Studio Dentista</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio
              id="clinic"
              name="role"
              value="clinic"
              checked={role === "clinic"}
              onChange={() => setRole("clinic")}
            />
            <Label htmlFor="clinic">Clinica Dentale</Label>
          </div>
        </div>
      </div>

      <Button type="submit" className="bg-primary hover:bg-primary-700">
        Accedi
      </Button>

      <div className="flex justify-between">
        <Link
          to="#"
          className="text-sm text-primary hover:underline dark:text-primary"
        >
          Password dimenticata?
        </Link>
      </div>
    </form>
  );
};

export default AuthLoginWithRole;
