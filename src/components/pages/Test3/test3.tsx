import Header from "@/components/widjets/Header/header";
import "./style.css";
import ButtonDefault from "@/components/shared/UI/Buttons.tsx/buttons";
function Test3() {
  return (
    <>
      <Header />
      <h1 style={{ textAlign: "center" }}>Test3</h1>
      <main className="main container">
        <ButtonDefault>Start test 3</ButtonDefault>
      </main>
    </>
  );
}

export default Test3;
