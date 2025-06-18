import CVShowcase from "../components/CVShowcase";
import Footer from "../components/footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1">
        <CVShowcase />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
