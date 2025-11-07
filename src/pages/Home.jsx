import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/items?search=${query}`);
    }
  };

  return (
    <div className="text-center mt-5">
      <h1 className="mb-4">🔍 Buscar productos</h1>
      <form onSubmit={handleSearch}>
        <div className="input-group mb-3 w-50 mx-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Ejemplo: Essence, beauty, Glamour..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
}
