import LoansLeft from './LoansLeft';
import LoansRight from './LoansRight';
import homeloan from "../../../assets/homeloan.jpg"
import personalloan from "../../../assets/personalloan.png"
import LoanToptext from './LoanToptext';
import carLoan from "../../../assets/carLoan.png"
import goldLoan from "../../../assets/goldLoan.png"
import businessLoan from "../../../assets/businessLoan.png"
import educationLoan from "../../../assets/educationLoan.png"
import LoanCTA from './LoanCTA';
 
const Loans = () => {
  return (
    

    <div className="loans">
      <LoanToptext/>
      <LoansLeft
        image={personalloan}
       
        title={
          <>
        Personal Loan for Personal Growth
        <br />
        10.50% onwards
      </>
    }
    description={
      <>
        Meet personal expenses such as weddings, travel,
        medical emergencies, or home renovation without collateral.
      </>
    }
  />

  <hr/>

  <LoansRight
    image={homeloan}
    title={
      <>
        Home Loan
        <br />
        8.35% onwards
      </>
    }
    description={
      <>
        Finance your dream home with low EMIs,
        flexible repayment options, and quick approvals.
      </>
    }
  />


  <hr/>
  <LoansLeft
    image={carLoan}
    title={
      <>
        Vehicle Loan
        <br />
        8.75% onwards
      </>
    }
    description={
      <>
        Purchase a new or used car with attractive interest rates,
        minimal documentation, and fast disbursal.
      </>
    }
  />


  <hr/>


  <LoansRight
    image={educationLoan}
    title={
      <>
        Education Loan
        <br />
        8.95% onwards
      </>
    }
    description={
      <>
        Fund higher education in India or abroad,
        covering tuition fees, accommodation, and study-related expenses.
      </>
    }
  />

    <hr/>



  <LoansLeft
    image={businessLoan}
    title={
      <>
        Business Loan
        <br />
        11.25% onwards
      </>
    }
    description={
      <>
        Expand your business, manage working capital,
        or purchase equipment with collateral-free financing.
      </>
    }
  />


  <hr/>


  <LoansRight
    image={goldLoan}
    title={
      <>
        Gold Loan
        <br />
        8.80% onwards
      </>
    }
    description={
      <>
        Get instant funds by pledging your gold ornaments
        with quick approval and flexible repayment options.
      </>
    }
  />
  <hr
  className="mx-auto"
  style={{
    width: "70%",
    opacity: 0.08,
    margin: "4rem auto",
  }}
/>
  <LoanCTA/>
</div>




  );
}

export default Loans;