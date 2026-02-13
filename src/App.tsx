import { useState } from "react";
import Input from './components/input'

function App() {
  const [displayText, setDisplayText] = useState<string>("");

  return (
    <div className="App">
      <h1>Display: {displayText}</h1>
      <Input setDisplayText={setDisplayText} />
    </div>
  );
}

export default App