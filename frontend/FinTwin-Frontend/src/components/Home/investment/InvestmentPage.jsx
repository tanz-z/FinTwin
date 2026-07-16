import HeroSection from "./HeroSection";
import InvestmentCategories from "./InvestmentCategories";
import CompareTable from "./CompareTable";
import InvestmentCalculator from "./InvestmentCalculator";
import GoalPlanner from "./GoalPlanner";
function InvestmentPage(){
    return(
        <div className="container">
            <HeroSection/>
            <InvestmentCategories/>
            <CompareTable/>
            <InvestmentCalculator/>
            <GoalPlanner/>
        </div>

    );
}

export default InvestmentPage;