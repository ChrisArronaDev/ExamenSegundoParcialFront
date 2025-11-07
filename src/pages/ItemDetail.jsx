import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ItemDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/items/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleBuy = () => {
    axios
      .post(`${API_URL}/addSale`, { productId: id })
      .then((res) => {
        if (res.data.success) setMessage("✅ Compra registrada con éxito!");
        else setMessage("❌ Error al registrar la compra.");
      })
      .catch((err) => setMessage("❌ Error de conexión."));
  };

  if (!product) return <p className="text-center mt-5">Cargando...</p>;

  return (
    <div className="container mt-4">
      <h2>{product.title}</h2>
      <div className="row">
        <div className="col-md-6">
          {product.images?.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={product.title}
              className="img-fluid mb-3 rounded"
            />
          ))}
        </div>
        <div className="col-md-6">
          <h4>${product.price}</h4>
          <p>
            <strong>Marca:</strong> {product.brand}
          </p>
          <p>
            <strong>Categoría:</strong> {product.category}
          </p>
          <p>
            <strong>Stock:</strong> {product.stock}
          </p>
          <p>{product.description}</p>
          <button onClick={handleBuy} className="btn btn-success">
            Registrar Compra
          </button>
          {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
      </div>
    </div>
  );
}
