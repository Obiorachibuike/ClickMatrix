import { useState } from "react";

const MATRIX_SIZE = 3; // Defines the 3x3 grid size

export default function App() {
  // State to track clicked cells
  const [clickedCells, setClickedCells] = useState<number[]>([]);
  // State to check if the last box is clicked (triggers final orange color)
  const [finalClick, setFinalClick] = useState(false);

  // Function to handle cell clicks
  const handleClick = (index: number) => {
    console.log(`Cell clicked: ${index}`); // Debugging: Log the clicked cell index

    // If the cell is already clicked, do nothing
    if (clickedCells.includes(index)) {
      console.log(`Cell ${index} is already clicked. Ignoring...`);
      return;
    }

    // Update clicked cells state
    const newClicks = [...clickedCells, index];
    setClickedCells(newClicks);
    console.log("Updated Clicked Cells: ", newClicks); // Debugging: Log clicked cells array

    // Check if this is the last click (i.e., all cells clicked)
    if (newClicks.length === MATRIX_SIZE * MATRIX_SIZE) {
      console.log("All cells clicked. Starting final sequence...");

      // Apply the final orange effect in the order of clicks
      setTimeout(() => {
        newClicks.forEach((cell, i) => {
          setTimeout(() => {
            console.log(`Changing cell ${cell} to orange.`);
            setFinalClick(true);
          }, i * 300); // Adds a delay for sequential effect
        });
      }, 500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Click the Boxes</h1>
      <div className="grid grid-cols-3 gap-2">
        {[...Array(MATRIX_SIZE * MATRIX_SIZE)].map((_, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`w-24 h-24 flex items-center justify-center border 
              ${
                clickedCells.includes(index)
                  ? finalClick
                    ? "bg-orange-500" // Final stage (turns orange)
                    : "bg-green-500" // Initially clicked (turns green)
                  : "bg-gray-300" // Default (not clicked)
              }
              transition-all duration-500 cursor-pointer`}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}