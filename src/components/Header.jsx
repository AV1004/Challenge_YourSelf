import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import NewChallenge from "./NewChallenge.jsx";

export default function Header() {
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState();

  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  function handleDone() {
    setIsCreatingNewChallenge(false);
  }

  return (
    <>
      {/* So as here that modal is going to open so to we have to wrap this code with a component that is provided by framer motion as shown below */}

      <AnimatePresence>
        {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}
      </AnimatePresence>
      {/* Now react first check in this component if the motion is used and any exit props is used at that component and if is used then react will execute it first then remove the component from the dom */}

      <header id="main-header">
        <h1>Your Challenges</h1>
        <motion.button
          // whileHover={{ scale: 1.1, backgroundColor: "#8b111" }} //You can add backgroundColor can animate colors too!
          whileHover={{ scale: 1.1 }} //Now this whileHover is also special kind of prop provide by framer which is use to manilpule the element while user doing somithing with element as like user hovering on element user clicking and etc..
          transition={{ type: "spring", stiffness: 500 }} //Now this type equals to spring is intensioally as it gives boncy effects and stiffness  make it more realistic
          onClick={handleStartAddNewChallenge}
          className="button"
        >
          Add Challenge
        </motion.button>
      </header>
    </>
  );
}
