import Header from "@/components/widjets/Header/header";
import "./style.css";
import ButtonDefault from "@/components/shared/UI/Buttons.tsx/buttons";
function Test2() {
  return (
    <>
      <Header />
      <h1 style={{ textAlign: "center" }}>Test2</h1>
      <main className="main container">
        <ButtonDefault>Start test 2</ButtonDefault>
      </main>
    </>
  );
}

export default Test2;
