import { useState } from "react";

const useSelectedTabs = () => {
  const [selectedTabs, setSelectedTabs] = useState<string | null>(null);

  return {
    selectedTabs,
    setSelectedTabs,
  };
};

export default useSelectedTabs;
