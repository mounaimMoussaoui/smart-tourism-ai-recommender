import { useState } from "react";
// import { getRecommendations } from "../services/recommendationApi";
import { getPreferenceRecommendations } from "../services/recommendationApi";

export function Recommend() {
    const [age, setAge] = useState(30);
    const [category, setCategory] = useState("Taman Hiburan");
    const [city, setCity] = useState("Jakarta");
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [budget, setBudget] = useState("medium");
    const [nature, setNature] = useState(5);
    const [culture, setCulture] = useState(2);
    const [adventure, setAdventure] = useState(3);
    const [shopping, setShopping] = useState(1);
    const [relaxation, setRelaxation] = useState(4);

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setLoading(true);

  try {
    const data = await getPreferenceRecommendations({
      age,
      city,
      budget,
      nature,
      culture,
      adventure,
      shopping,
      relaxation,
      top_n: 5,
    });

    setResult(data);
  } finally {
    setLoading(false);
  }
}

  return (
  <main className="min-h-screen bg-slate-950 text-white px-6 py-10">
    <section className="mx-auto max-w-6xl">
      <div className="mb-10">
        <p className="text-emerald-400 font-medium">AI Tourism Recommender</p>
        <h1 className="text-4xl md:text-6xl font-bold mt-3">
          Discover places matched to your travel style.
        </h1>
        <p className="text-slate-400 mt-4 max-w-2xl">
          Answer a few preference questions and let the AI recommend places based on your profile.
        </p>
      </div>

      <div className="grid lg:grid-cols-[420px_1fr] gap-8">
        {/* form card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur-xl space-y-5"
        >
          {/* keep your inputs here */}

          <button
            type="submit"
            className="w-full rounded-2xl bg-emerald-400 text-slate-950 font-bold py-3 hover:bg-emerald-300 transition"
          >
            {loading ? "Generating..." : "Get Recommendations"}
          </button>
        </form>

        {/* results */}
        <section className="space-y-4">
          {result?.recommendations?.map((place: any) => (
            <div
              key={place.Place_Id}
              className="bg-white/10 border border-white/10 rounded-3xl p-5 hover:bg-white/15 transition"
            >
              <h3 className="text-xl font-bold">{place.Place_Name}</h3>
              <p className="text-slate-400">{place.City} • {place.Category}</p>
              <div className="mt-4 flex gap-3 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300">
                  Rating {place.Rating}
                </span>
                <span className="px-3 py-1 rounded-full bg-sky-400/20 text-sky-300">
                  AI Score {place.Predicted_Rating.toFixed(2)}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10">
                  Price {place.Price}
                </span>
              </div>
            </div>
          ))}
        </section>
      </div>
    </section>
  </main>
);
}


// <main style={{ padding: 40, maxWidth: 900, margin: "0 auto" }}>
//       <h1>TourGuide AI</h1>
//       <p>AI-powered tourism recommendation system</p>

//       <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
//         <input
//           type="number"
//           value={age}
//           onChange={(e) => setAge(Number(e.target.value))}
//           placeholder="Age"
//         />

//         <select value={category} onChange={(e) => setCategory(e.target.value)}>
//           <option value="Taman Hiburan">Taman Hiburan</option>
//           <option value="Budaya">Budaya</option>
//           <option value="Cagar Alam">Cagar Alam</option>
//           <option value="Bahari">Bahari</option>
//           <option value="Pusat Perbelanjaan">Pusat Perbelanjaan</option>
//         </select>

//         <select value={city} onChange={(e) => setCity(e.target.value)}>
//           <option value="Jakarta">Jakarta</option>
//           <option value="Bandung">Bandung</option>
//           <option value="Yogyakarta">Yogyakarta</option>
//           <option value="Semarang">Semarang</option>
//           <option value="Surabaya">Surabaya</option>
//         </select>

//         {/* <p>Preferences:</p> */}

//         <select value={budget} onChange={(e) => setBudget(e.target.value)}>
//         <option value="low">Low Budget</option>
//         <option value="medium">Medium Budget</option>
//         <option value="high">High Budget</option>
//         </select>

//         <label>Nature: {nature}</label>
//         <input type="range" min="1" max="5" value={nature} onChange={(e) => setNature(Number(e.target.value))} />

//         <label>Culture: {culture}</label>
//         <input type="range" min="1" max="5" value={culture} onChange={(e) => setCulture(Number(e.target.value))} />

//         <label>Adventure: {adventure}</label>
//         <input type="range" min="1" max="5" value={adventure} onChange={(e) => setAdventure(Number(e.target.value))} />

//         <label>Shopping: {shopping}</label>
//         <input type="range" min="1" max="5" value={shopping} onChange={(e) => setShopping(Number(e.target.value))} />

//         <label>Relaxation: {relaxation}</label>
//         <input type="range" min="1" max="5" value={relaxation} onChange={(e) => setRelaxation(Number(e.target.value))} />


//         <button type="submit">
//           {loading ? "Generating..." : "Get Recommendations"}
//         </button>
//       </form>

//       {result && (
//         <section style={{ marginTop: 30 }}>
//           <h2>Recommended Places</h2>

//           {result.recommendations.map((place: any) => (
//             <div key={place.Place_Id} style={{ border: "1px solid #ddd", padding: 16, marginTop: 12 }}>
//               <h3>{place.Place_Name}</h3>
//               <p>City: {place.City}</p>
//               <p>Category: {place.Category}</p>
//               <p>Rating: {place.Rating}</p>
//               <p>Predicted Rating: {place.Predicted_Rating.toFixed(2)}</p>
//               <p>Price: {place.Price}</p>
//             </div>
//           ))}
//         </section>
//       )}
//     </main>