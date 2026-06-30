import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  MapPin,
  Star,
  Wallet,
  Loader2,
  Compass,
  SlidersHorizontal,
} from "lucide-react";
import { getPreferenceRecommendations } from "../services/recommendationApi";

const cities = ["Jakarta", "Bandung", "Yogyakarta", "Semarang", "Surabaya"];
const budgets = ["low", "medium", "high"];

function RangeField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-2 rounded-2xl bg-white/5 p-4 border border-white/10">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-300">{label}</span>
        <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-bold text-emerald-300">
          {value}/5
        </span>
      </div>

      <input
        type="range"
        min="1"
        max="5"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-emerald-400 cursor-pointer"
      />
    </div>
  );
}

export function Recommend() {
  const [age, setAge] = useState(30);
  const [city, setCity] = useState("Jakarta");
  const [budget, setBudget] = useState("medium");

  const [nature, setNature] = useState(5);
  const [culture, setCulture] = useState(2);
  const [adventure, setAdventure] = useState(3);
  const [shopping, setShopping] = useState(1);
  const [relaxation, setRelaxation] = useState(4);

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fieldClass = "w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-4 text-white shadow-inner outline-none transition hover:border-emerald-400/40 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10";

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
    <main className="min-h-screen overflow-hidden bg-[#020617] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.25),transparent_35%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_30%)]" />

      <section className="relative mx-auto max-w-7xl px-6 py-10">
        <motion.header
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
              <Sparkles size={16} />
              AI Tourism Recommender
            </div>

            <h1 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
              Discover places matched to your{" "}
              <span className="text-emerald-400">travel style.</span>
            </h1>

            <p className="mt-4 max-w-2xl text-slate-400">
              Answer a few simple questions and let the AI rank the best tourism
              places for your profile.
            </p>
          </div>

          {/* <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl">
            <p className="text-sm text-slate-400">Current pipeline</p>
            <p className="mt-1 font-semibold text-white">
              React → Express → FastAPI → ML Model
            </p>
          </div> */}
        </motion.header>

        <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-400 text-slate-950">
                <SlidersHorizontal />
              </div>
              <div>
                <h2 className="text-xl font-bold">Your travel profile</h2>
                <p className="text-sm text-slate-400">
                  Customize your preferences
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className={fieldClass}
                // "w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 outline-none transition focus:border-emerald-400"
                placeholder="Age"
              />

              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={fieldClass}
                // "w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 outline-none transition focus:border-emerald-400"
              >
                {cities.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className={fieldClass}
                // "w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 outline-none transition focus:border-emerald-400"
              >
                {budgets.map((item) => (
                  <option key={item} value={item}>
                    {item.toUpperCase()} Budget
                  </option>
                ))}
              </select>

              <RangeField label="Nature" value={nature} onChange={setNature} />
              <RangeField label="Culture" value={culture} onChange={setCulture} />
              <RangeField label="Adventure" value={adventure} onChange={setAdventure} />
              <RangeField label="Shopping" value={shopping} onChange={setShopping} />
              <RangeField label="Relaxation" value={relaxation} onChange={setRelaxation} />

              <button
                type="submit"
                disabled={loading}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-5 py-4 font-black text-slate-950 shadow-lg shadow-emerald-400/20 transition hover:-translate-y-0.5 hover:bg-emerald-300 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Generating...
                  </>
                ) : (
                  <>
                    <Compass size={20} />
                    Get Recommendations
                  </>
                )}
              </button>
            </div>
          </motion.form>

          <section className="min-h-[500px]">
            {!result && (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid h-full place-items-center rounded-[2rem] border border-dashed border-white/15 bg-white/5 p-10 text-center"
              >
                <div>
                  <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-3xl bg-sky-400/20 text-sky-300">
                    <Sparkles />
                  </div>
                  <h3 className="text-2xl font-bold">Your personalized recommendations will appear here</h3>
                  <p className="mt-2 max-w-md text-slate-400">
                    Adjust your travel profile and generate AI-ranked places that match your preferences.
                  </p>
                </div>
              </motion.div>
            )}

            {result && (
              <div className="space-y-4">
                <div className="mb-5">
                  <h2 className="text-2xl font-black">Recommended Places</h2>
                  <p className="text-slate-400">
                    Top results ranked by predicted AI score.
                  </p>
                </div>

                {result.recommendations.map((place: any, index: number) => (
                  <motion.article
                    key={place.Place_Id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.06 }}
                    className="group rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/15"
                  >
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="mb-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-sm text-slate-300">
                          #{index + 1} recommendation
                        </div>

                        <h3 className="text-2xl font-black">
                          {place.Place_Name}
                        </h3>

                        <p className="mt-2 flex items-center gap-2 text-slate-400">
                          <MapPin size={16} />
                          {place.City} • {place.Category}
                        </p>
                      </div>

                      <div className="rounded-3xl bg-emerald-400 p-5 text-center text-slate-950 shadow-lg shadow-emerald-400/20">
                        <p className="text-xs font-bold uppercase">AI Score</p>
                        <p className="text-3xl font-black">
                          {place.Predicted_Rating.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full bg-yellow-400/15 px-4 py-2 text-sm text-yellow-300">
                        <Star size={16} />
                        Rating {place.Rating}
                      </span>

                      <span className="inline-flex items-center gap-2 rounded-full bg-sky-400/15 px-4 py-2 text-sm text-sky-300">
                        <Wallet size={16} />
                        Price {place.Price}
                      </span>

                      <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-slate-300">
                        Personalized match
                      </span>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}