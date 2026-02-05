import { useState } from "react";
import { QuizScreen } from "./components/QuizScreen";
import { DeveloperView } from "./components/DeveloperView";
import { BusinessView } from "./components/BusinessView";

type ViewType = "quiz" | "developer" | "business";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>("quiz");

  const handleSelectAudience = (isDeveloper: boolean) => {
    setCurrentView(isDeveloper ? "developer" : "business");
  };

  const handleBack = () => {
    setCurrentView("quiz");
  };

  return (
    <div className="size-full">
      {currentView === "quiz" && (
        <QuizScreen onSelectAudience={handleSelectAudience} />
      )}
      {currentView === "developer" && (
        <DeveloperView onBack={handleBack} />
      )}
      {currentView === "business" && (
        <BusinessView onBack={handleBack} />
      )}
    </div>
  );
}