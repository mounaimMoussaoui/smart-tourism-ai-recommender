import { useState } from "react";
import { getRecommendations } from "../services/recommendationApi";

export function Recommend() {
  const [age, setAge] = useState(30);
  const [category, setCategory] = useState("Taman Hiburan");
  const [city, setCity] = useState("Jakarta");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await getRecommendations({
        age,
        category,
        city,
        top_n: 5,
      });

      setResult(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 40, maxWidth: 900, margin: "0 auto" }}>
      <h1>TourGuide AI</h1>
      <p>AI-powered tourism recommendation system</p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          placeholder="Age"
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Taman Hiburan">Taman Hiburan</option>
          <option value="Budaya">Budaya</option>
          <option value="Cagar Alam">Cagar Alam</option>
          <option value="Bahari">Bahari</option>
          <option value="Pusat Perbelanjaan">Pusat Perbelanjaan</option>
        </select>

        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="Jakarta">Jakarta</option>
          <option value="Bandung">Bandung</option>
          <option value="Yogyakarta">Yogyakarta</option>
          <option value="Semarang">Semarang</option>
          <option value="Surabaya">Surabaya</option>
        </select>

        <button type="submit">
          {loading ? "Generating..." : "Get Recommendations"}
        </button>
      </form>

      {result && (
        <section style={{ marginTop: 30 }}>
          <h2>Recommended Places</h2>

          {result.recommendations.map((place: any) => (
            <div key={place.Place_Id} style={{ border: "1px solid #ddd", padding: 16, marginTop: 12 }}>
              <h3>{place.Place_Name}</h3>
              <p>City: {place.City}</p>
              <p>Category: {place.Category}</p>
              <p>Rating: {place.Rating}</p>
              <p>Predicted Rating: {place.Predicted_Rating.toFixed(2)}</p>
              <p>Price: {place.Price}</p>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}