import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import UserForm from "./components/UserForm";
import Question from "./components/Question";
import Results from "./components/Results";
import { UserProvider } from "./components/UserContext";

const App = () => {  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [element, setElement] = useState("");
  const [artwork, setArtwork] = useState(null);

  const questions = useMemo(
    () => [
      {
        question: "What's your favorite dog?",
        options: ["Corgi", "Dalmatian", "Doberman", "Hound", "Pitbull"],
      },
    ],
    []
  );

  const keywords = useMemo(
    () => ({
      Corgi: "corgi",
      Dalmatian: "dalmatian",
      Doberman: "doberman",
      Hound: "hound",
      Pitbull: "pitbull",
    }),
    []
  );

  const elements = useMemo(
    () => ({
      "Corgi": "Corgi",
      "Dalmatian": "Dalmatian",
      "Doberman": "Doberman",
      "Hound": "Hound",
      "Pitbull": "Pitbull",
    }),
    []
  );

  const descriptions = useMemo(
    () => ({
      corgi:
        "Corgis are small herding dogs known for their short legs, fluffy tails, and friendly personalities. They are intelligent, playful, and affectionate.",
      dalmatian:
        "Dalmatians are distinctive with their white coats and black spots. They are energetic, outgoing, and known for their strong bond with their owners.",
      doberman:
        "Dobermans are powerful and loyal dogs, often used as guard dogs. They are intelligent, alert, and have a sleek, muscular appearance.",
      hound:
        "Hounds are a diverse group of hunting dogs known for their keen sense of smell and stamina. They are often independent, determined, and good-natured.",
      pitbull:
        "Pitbulls are strong, muscular dogs with a reputation for loyalty and affection towards their families. They are energetic, courageous, and thrive on positive social interaction.",
    }),
    []
  );

  const handleAnswer = useCallback((answer) => {
    setAnswers((prevAnswers) => [...prevAnswers, answer]);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  }, []);

  const determineElement = useCallback((answers) => {
    const counts = {};
    answers.forEach((answer) => {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    
    return Object.keys(counts).reduce((a, b) => {
      return counts[a] > counts[b] ? a : b;
    });
  }, [elements]);

  const randomNum = useCallback((len) => {
    return Math.floor(Math.random() * len);
  }, []);

  const randomDate = useCallback(() => {
    const start = new Date(2010, 0, 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString("en-US");
  }, []);

  const fetchArtwork = useCallback(async (keyword) => {
    console.log("Fetching artwork for", keyword);
    const response = await fetch(`https://dog.ceo/api/breed/${keyword}/images`);
    const data = await response.json();

    console.log("Data:", data);
    
    if (data.message.length > 0) {
      setArtwork({
        title: keyword.charAt(0).toUpperCase() + keyword.slice(1),
        primaryImage: data.message[randomNum(data.message.length)],
        artistDisplayName: descriptions[keyword],
        objectDate: randomDate(),
      });
    }
  }, [descriptions, randomDate, randomNum]);

  useEffect(
    () => {
      if (currentQuestionIndex === questions.length) {
        const selectedElement = determineElement(answers);
        setElement(selectedElement);

        fetchArtwork(keywords[selectedElement]);
      }
    },
    [answers, currentQuestionIndex, determineElement, fetchArtwork, keywords, questions.length]
  );

  return (
    <UserProvider>
      <Header />
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route
          path="/quiz"
          element={
            currentQuestionIndex < questions.length ? (
              <Question
                question={questions[currentQuestionIndex].question}
                options={questions[currentQuestionIndex].options}
                onAnswer={handleAnswer}
              />
            ) : (
              <Results element={element} artwork={artwork} />
            )
          }
        />
      </Routes>
    </UserProvider>
  );
};

export default App;
