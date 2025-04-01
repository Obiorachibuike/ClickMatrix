import { useState } from "react";

const MATRIX_SIZE = 3; // Defines the 3x3 grid size

export default function App() {
  // State to track clicked cells
  const [clickedCells, setClickedCells] = useState<number[]>([]);
  // State to store cells that should turn orange in sequence
  const [finalizedCells, setFinalizedCells] = useState<number[]>([]);
  // State to store display numbers for each cell
  const [cellNumbers, setCellNumbers] = useState<number[]>(Array(9).fill(0));
  // State to track if the reset button should be shown
  const [showResetButton, setShowResetButton] = useState(false);

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

    // Update number display based on click order
    const updatedNumbers = [...cellNumbers];
    updatedNumbers[index] = newClicks.length; // Assign the order number
    setCellNumbers(updatedNumbers);

    // Check if this is the last click (i.e., all cells clicked)
    if (newClicks.length === MATRIX_SIZE * MATRIX_SIZE) {
      console.log("All cells clicked. Starting final sequence...");

      // Apply the final orange effect one by one in the order of clicks
      newClicks.forEach((cell, i) => {
        setTimeout(() => {
          console.log(`Changing cell ${cell} to orange.`);
          setFinalizedCells((prev) => [...prev, cell]); // Add cell to finalized list
        }, i * 800); // Slower transition effect for sequential change
      });

      // After all cells are turned orange, show the reset button
      setTimeout(() => {
        setShowResetButton(true);
      }, newClicks.length * 800); // Show button after the last cell turns orange
    }
  };

  // Function to reset the game
  const resetGame = () => {
    setClickedCells([]);
    setFinalizedCells([]);
    setCellNumbers(Array(9).fill(0));
    setShowResetButton(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-black">Click the Boxes</h1>
      <div className="relative w-full max-w-xs md:max-w-md lg:max-w-lg">
        <div className="grid grid-cols-3 gap-2 w-full">
          {[...Array(MATRIX_SIZE * MATRIX_SIZE)].map((_, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`w-24 h-24 flex items-center justify-center border text-xl font-bold
                ${
                  finalizedCells.includes(index)
                    ? "bg-orange-500 text-white" // Turns orange in sequence
                    : clickedCells.includes(index)
                    ? "bg-green-500 text-black" // Initially clicked (turns green)
                    : "bg-gray-300 text-gray-700" // Default (not clicked)
                }
                transition-all duration-[800ms] cursor-pointer`}
            >
              {cellNumbers[index] > 0 ? cellNumbers[index] : index + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Show reset button after all cells are turned orange */}
      {showResetButton && (
        <button
          onClick={resetGame}
          className="mt-6 p-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700 transition duration-200"
        >
          Reset Game
        </button>
      )}
    </div>
  );
}
