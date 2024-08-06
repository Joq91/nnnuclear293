import { useState } from 'react';

export default function TapSwap() {
  const [codes, setCodes] = useState([
    { name: 'Code 1', code: 'ABC123' },
    { name: 'Code 2', code: 'DEF456' },
    // Add more initial codes as needed
  ]);
  const [search, setSearch] = useState('');

  const filteredCodes = codes.filter(code => 
    code.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search codes" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="code-list">
        {filteredCodes.map((code, index) => (
          <div key={index} className="code-box">
            <h3>{code.name}</h3>
            <p>{code.code}</p>
          </div>
        ))}
      </div>
    </div>
  );
}