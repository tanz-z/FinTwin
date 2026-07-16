import { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./investments.css";


const InvestmentCalculator = () => {

  const [type, setType] = useState("Mutual Fund");

  const [amount, setAmount] = useState(100000);

  const [monthly, setMonthly] = useState(5000);

  const [rate, setRate] = useState(12);

  const [years, setYears] = useState(10);



  let invested = 0;
  let maturity = 0;



  // Mutual Fund Lumpsum

  if(type === "Mutual Fund"){

    invested = amount;

    maturity =
      amount *
      Math.pow(1 + rate/100, years);

  }



  // SIP

  if(type === "SIP"){

    const months = years * 12;

    const monthlyRate = rate / 12 / 100;


    invested = monthly * months;


    maturity =
      monthly *
      (((Math.pow(1 + monthlyRate, months)-1)
      /monthlyRate)
      *(1+monthlyRate));

  }





  // Fixed Deposit

  if(type === "Fixed Deposit"){

    invested = amount;


    maturity =
      amount *
      Math.pow(
        1 + rate/100,
        years
      );

  }





  // Recurring Deposit

  if(type === "Recurring Deposit"){

    const months = years * 12;

    invested = monthly * months;


    maturity =
      monthly *
      months *
      (1 + (rate/100));

  }






  // PPF simplified calculation

  if(type === "PPF"){

    invested = amount * years;


    maturity =
      invested *
      Math.pow(
        1.07,
        years
      );

  }





  const returns = maturity - invested;



  const chartData = Array.from(
    {
      length: years + 1
    },

    (_,index)=>({

      year:index,

      value:
      Math.round(
        invested *
        Math.pow(
          1 + rate/100,
          index
        )
      )

    })
  );




return (

<section className="calculator-section">


<motion.div

className="calculator-heading"

initial={{
opacity:0,
y:40
}}

whileInView={{
opacity:1,
y:0
}}

transition={{
duration:.7
}}

viewport={{
once:true
}}

>

<span>
Investment Calculator
</span>


<h2>
Plan. Invest. Grow.
</h2>


<p>
Choose an investment option and estimate
your future wealth instantly.
</p>


</motion.div>





<div className="calculator-container">




<motion.div
  className="investment-selector"

  initial={{
    opacity: 0,
    y: 20
  }}

  whileInView={{
    opacity: 1,
    y: 0
  }}

  transition={{
    duration: 0.5
  }}

  viewport={{
    once: true
  }}
>

  <label>
    Select Investment Type
  </label>


  <div className="select-wrapper">

    <select
      value={type}
      onChange={(e) =>
        setType(e.target.value)
      }
    >

      <option value="Mutual Fund">
        📈 Mutual Fund
      </option>

      <option value="SIP">
        💰 SIP
      </option>

      <option value="Fixed Deposit">
        🏦 Fixed Deposit
      </option>

      <option value="Recurring Deposit">
        🪙 Recurring Deposit
      </option>

      <option value="PPF">
        📜 PPF
      </option>

    </select>

  </div>


</motion.div>




<div className="calculator-controls">





<div className="slider-box">

<label>
{
type==="SIP" || type==="Recurring Deposit"
?
"Monthly Investment"
:
"Investment Amount"
}
</label>


<h3>
₹
{
(type==="SIP" || type==="Recurring Deposit")
?
monthly.toLocaleString()
:
amount.toLocaleString()
}
</h3>



<input

type="range"

min="500"

max="500000"

step="500"

value={
(type==="SIP" || type==="Recurring Deposit")
?
monthly
:
amount
}

onChange={(e)=>

(type==="SIP" || type==="Recurring Deposit")

?

setMonthly(Number(e.target.value))

:

setAmount(Number(e.target.value))

}

/>


</div>





<div className="slider-box">

<label>
Expected Return
</label>


<h3>
{rate}%
</h3>


<input

type="range"

min="5"

max="20"

value={rate}

onChange={(e)=>
setRate(Number(e.target.value))
}

/>


</div>





<div className="slider-box">

<label>
Duration
</label>


<h3>
{years} Years
</h3>


<input

type="range"

min="1"

max="40"

value={years}

onChange={(e)=>
setYears(Number(e.target.value))
}

/>


</div>




</div>







<div className="calculator-results">


<div className="result-card">

<p>
Invested Amount
</p>


<h2>
₹{Math.round(invested).toLocaleString()}
</h2>

</div>





<div className="result-card">

<p>
Estimated Returns
</p>


<h2>
₹{Math.round(returns).toLocaleString()}
</h2>

</div>





<div className="result-card highlight">

<p>
Future Value
</p>


<h2>
₹{Math.round(maturity).toLocaleString()}
</h2>

</div>



</div>







<div className="growth-chart">


<ResponsiveContainer
width="100%"
height={350}
>


<LineChart data={chartData}>


<XAxis dataKey="year"/>

<YAxis/>

<Tooltip/>


<Line

type="monotone"

dataKey="value"

strokeWidth={3}

/>


</LineChart>


</ResponsiveContainer>


</div>





</div>


</section>

);


};


export default InvestmentCalculator;