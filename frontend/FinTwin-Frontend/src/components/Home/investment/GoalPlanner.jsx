import  { useState } from "react";
import { motion } from "framer-motion";
import {
  FaHome,
  FaGraduationCap,
  FaCar,
  FaPlane,
  FaUmbrella,
  FaArrowRight,
} from "react-icons/fa";

import "./investments.css";


const goals = [
  {
    name: "Buy a House",
    icon: <FaHome />,
    suggestion: "Mutual Funds + SIP",
  },
  {
    name: "Education",
    icon: <FaGraduationCap />,
    suggestion: "SIP + Balanced Funds",
  },
  {
    name: "Buy a Car",
    icon: <FaCar />,
    suggestion: "RD + Fixed Deposit",
  },
  {
    name: "Travel",
    icon: <FaPlane />,
    suggestion: "Short Term Funds",
  },
  {
    name: "Retirement",
    icon: <FaUmbrella />,
    suggestion: "PPF + Equity Funds",
  },
];


const GoalPlanner = () => {


  const [selectedGoal, setSelectedGoal] = useState(goals[0]);

  const [amount, setAmount] = useState(5000000);

  const [years, setYears] = useState(10);



  const monthlyInvestment =
    amount /
    (years * 12);



  return (

    <section className="goal-section">


      <motion.div
        className="goal-heading"

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
          Goal Based Investing
        </span>


        <h2>
          Plan Your Dreams, We Help You Reach Them
        </h2>


        <p>
          Choose your financial goal and get an estimated
          investment plan designed around your timeline.
        </p>


      </motion.div>





      <div className="goal-container">


        {/* Goal Cards */}


        <div className="goal-cards">


          {goals.map((goal,index)=>(

            <motion.div

              key={index}

              className={
                selectedGoal.name === goal.name
                ?
                "goal-card active"
                :
                "goal-card"
              }


              onClick={()=>
                setSelectedGoal(goal)
              }


              whileHover={{
                y:-8
              }}

            >

              <div className="goal-icon">
                {goal.icon}
              </div>


              <h3>
                {goal.name}
              </h3>


            </motion.div>

          ))}


        </div>







        {/* Planner */}


        <motion.div

          className="goal-planner-box"

          initial={{
            opacity:0,
            x:50
          }}

          whileInView={{
            opacity:1,
            x:0
          }}

          transition={{
            duration:.7
          }}

        >


          <h3>
            {selectedGoal.name}
          </h3>


          <p>
            Recommended Strategy:
          </p>


          <div className="strategy-box">

            {selectedGoal.suggestion}

          </div>





          <div className="goal-input">


            <label>
              Target Amount
            </label>


            <h2>
              ₹{amount.toLocaleString("en-IN")}
            </h2>


            <input

              type="range"

              min="100000"

              max="10000000"

              step="50000"

              value={amount.toLocaleString("en-IN")}

              onChange={(e)=>
                setAmount(
                  Number(e.target.value)
                )
              }

            />

          </div>







          <div className="goal-input">


            <label>
              Time Period
            </label>


            <h2>
              {years} Years
            </h2>


            <input

              type="range"

              min="1"

              max="40"

              value={years}

              onChange={(e)=>
                setYears(
                  Number(e.target.value)
                )
              }

            />

          </div>







          <div className="monthly-result">


            <p>
              Approx Monthly Investment
            </p>


            <h2>
  ₹{Math.round(monthlyInvestment).toLocaleString("en-IN")}
</h2>

            <FaArrowRight />


          </div>



        </motion.div>


      </div>


    </section>

  );

};


export default GoalPlanner;