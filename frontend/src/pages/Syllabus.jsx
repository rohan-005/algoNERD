import React, { useState, useEffect } from "react";
import StaggeredMenu from "../components/Navbar";
import "../css/Syllabus.css";
import "../css/Landingcss.css";
import { useNavigate } from "react-router-dom";

export default function Syllabus() {
  const navigate = useNavigate();
  const [syllabusData, setSyllabusData] = useState([]);
  const [completed, setCompleted] = useState({});

  const menuItems = [
    { label: "Home", link: "/" },
    { label: "Why", link: "/#why" },
    { label: "Curriculum", link: "/curriculum" },
    { label: "How it Works", link: "#how-it-works" },
  ];

  const socialItems = [
    { label: "X", link: "https://twitter.com" },
    { label: "GitHub", link: "https://github.com" },
    { label: "LinkedIn", link: "https://linkedin.com" },
  ];

  useEffect(() => {
    fetch("/data/syllabus.json")
      .then(res => res.json())
      .then(data => setSyllabusData(data))
      .catch(err => console.error("Error loading syllabus:", err));

    const savedData = localStorage.getItem("completedQuestions");
    if (savedData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCompleted(JSON.parse(savedData));
    }
  }, []);

  const toggleCompletion = (id) => {
    const updated = { ...completed, [id]: !completed[id] };
    setCompleted(updated);
    localStorage.setItem("completedQuestions", JSON.stringify(updated));
  };

  const handleClick = (id) => {
    navigate(`/question/${id}`);
  };

  const clearAll = () => {
    setCompleted({});
    localStorage.removeItem("completedQuestions");
  };

  return (
    <div className="syllabus-wrapper">
      <div className="navbar-wrapper text-[1.5rem]">
        <StaggeredMenu items={menuItems} socialItems={socialItems} />
      </div>

      <section className="syllabus-hero">
        <h1 className="syllabus-title">
          Master <span className="highlight">DSA</span> From Basics
        </h1>
        <p className="syllabus-sub">
          From Patterns → DP, build real coding confidence step-by-step.
        </p>

        <button className="clear-btn" onClick={clearAll}>
          Clear All Progress ❌
        </button>
      </section>

      <section className="syllabus-content">
        {syllabusData.map((block, idx) => (
          <div className="syllabus-card" key={idx}>
            <h2 className="syllabus-card-title">{block.category_name}</h2>

            <ul className="point-list">
              {block.questions.map((item, i) => (
                <li key={i} className="point-item">
                  <div className="problem-link">
                    <input
                      type="checkbox"
                      checked={!!completed[item.id]}
                      onChange={() => toggleCompletion(item.id)}
                      className="checkbox-style"
                    />

                    <span
                      onClick={() => handleClick(item.id)}
                      className="question-text"
                    >
                      ➤ {item.title}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* 📌 Footer Coming Soon Message */}
        <div className="syllabus-coming-soon syllabus-card">
          🚀 More questions & categories will be released soon... Stay tuned!
        </div>

      </section>
    </div>
  );
}
