// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";
export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState('EUR');
  const [toCur, setToCur] = useState('USD');
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function convert() {
      setIsLoading(true);

      try {       
        const res = await fetch
        (`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`);        
        
        const data = await res.json();
        setConverted(data.rates[toCur]);
        setIsLoading(false);
      } catch (err) {
        console.log("err.message =  ", err.message)
      }     
    }

    if(fromCur===toCur) return setConverted(amount);
    convert();

  }, [amount, fromCur, toCur])

  function handleAmountChange(e) {
    const value = e.target.value.replace(/\D/g, "");    
    setAmount(value);    
  }

  return (
    <div>      
      <input type="text" value={amount}
        onChange={e => handleAmountChange(e)}  />
      <select value={fromCur} onChange={e => setFromCur(e.target.value)} >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={toCur} onChange={e => setToCur(e.target.value)} >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
      {!isLoading ? <span>{amount} {fromCur} = 
      {(+converted).toFixed(2)} {toCur}</span> : "Loading..." }
      </p>    
    </div>    
  );
}



