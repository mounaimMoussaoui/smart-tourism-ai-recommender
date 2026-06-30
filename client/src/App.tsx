// import { useState } from "react";
// import { getRecommendations } from "./services/recommendationApi";

// function App() {
//   const [result, setResult] = useState<any>(null);

//   async function handleTest() {
//     const data = await getRecommendations({
//       age: 30,
//       category: "Taman Hiburan",
//       city: "Jakarta",
//       top_n: 5,
//     });

//     setResult(data);
//   }

//   return (
//     <main style={{ padding: 40 }}>
//       <h1>TourGuide AI</h1>

//       <button onClick={handleTest}>
//         Get Recommendations
//       </button>

//       <pre>{JSON.stringify(result, null, 2)}</pre>
//     </main>
//   );
// }

// export default App;


import { Recommend } from "./pages/Recommend";

function App() {
  return <Recommend />;
}

export default App;