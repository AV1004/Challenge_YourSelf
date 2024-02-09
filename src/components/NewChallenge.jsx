import { useContext, useRef, useState } from "react";
import { motion, stagger, useAnimate } from "framer-motion";

import { ChallengesContext } from "../store/challenges-context.jsx";
import Modal from "./Modal.jsx";
import images from "../assets/images.js";

export default function NewChallenge({ onDone }) {
  const [scope, animate] = useAnimate(); //scope has to add as ref on parent element where you have to add this animation and animation is function which to execute animation programatially!
  // useAnimate is use to create animation in imperative apporach
  // Now we use this to animate input fields of form when user field invalid inputs

  const title = useRef();
  const description = useRef();
  const deadline = useRef();

  const [selectedImage, setSelectedImage] = useState(null);
  const { addChallenge } = useContext(ChallengesContext);

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const challenge = {
      title: title.current.value,
      description: description.current.value,
      deadline: deadline.current.value,
      image: selectedImage,
    };

    if (
      !challenge.title.trim() ||
      !challenge.description.trim() ||
      !challenge.deadline.trim() ||
      !challenge.image
    ) {
      animate(
        "input,textarea",
        // { rotate: [-5, 0, 5, 0] },
        { x: [-5, 0, 5, 0] },
        { type: "spring", duration: 0.3, delay: stagger(0.05) } //You have to add the elements that you have to animate and have to declare the animation which you want to execute!
      );
      return;
    }

    console.log("working");

    onDone();
    addChallenge(challenge);
  }

  return (
    <Modal title="New Challenge" onClose={onDone}>
      <form id="new-challenge" onSubmit={handleSubmit} ref={scope}>
        <p>
          <label htmlFor="title">Title</label>
          <input ref={title} type="text" name="title" id="title" />
        </p>

        <p>
          <label htmlFor="description">Description</label>
          <textarea ref={description} name="description" id="description" />
        </p>

        <p>
          <label htmlFor="deadline">Deadline</label>
          <input ref={deadline} type="date" name="deadline" id="deadline" />
        </p>

        <motion.ul
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          //So first thing you can add transition property to any prop nested as shown above and thr staggerChildren is a property which make delay on childern lists or components as here it is applying on ul then the list render below has started thier animation one after another with 0.05 delay as it defined above!
          id="new-challenge-images"
        >
          {images.map((image) => (
            <motion.li
              // Now variants can also use here,
              // so if any varints are called in parent component then you only have to define it on any child component as shown here!
              variants={{
                opening: { opacity: 0, scale: 0.1 },
                visible: { opacity: 1, scale: 1 },
                // visible: { opacity: 1, scale: [0.8, 1.3, 1] }, //This Array is defined keyframes means your transition go through this keyframes step by step first 0.8 then 1.3 then final view 1.0 actual size
              }}
              // As you can see here i only defiend variants does't call them , because i already call it in parent component (i.e here Modal wrapper)
              transition={{ type: "spring" }}
              key={image.alt}
              onClick={() => handleSelectImage(image)}
              className={selectedImage === image ? "selected" : undefined}
            >
              <img {...image} />
            </motion.li>
          ))}
        </motion.ul>

        <p className="new-challenge-actions">
          <button type="button" onClick={onDone}>
            Cancel
          </button>
          <button>Add Challenge</button>
        </p>
      </form>
    </Modal>
  );
}
