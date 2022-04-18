import "./App.css";
import React, { useState } from "react";
import Section1 from "./components/Section1";
import Section2 from "./components/Section2";
import Section3 from "./components/Section3";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function App() {
  const [t, i18n] = useTranslation();
  const [businessModel, setBusinessModel] = useState(false);
  const [agebracket, setAgeBracket] = useState(false);
  const [industries, setIndustries] = useState(false);

  const [currentSection, setCurrentSection] = useState(0);

  const [investment, setInvestment] = useState(false);
  const [investmentValue, setInvestmentValue] = useState(false);

  const [error, setError] = useState(null);

  const formatPostData = () => {
    let json = {
      businessModel,
      investment,
    };
    if (agebracket) {
      json.agebracket = agebracket;
    }
    if (industries) {
      json.industries = industries;
    }
    if (investmentValue) {
      json.investmentValue = investmentValue;
    }

    return json;
  };

  const submitHandle = (e) => {
    e.preventDefault();

    console.log(businessModel, agebracket, industries, investment);

    const postData = formatPostData();
    console.log(postData);

    const fetchPostData = async () => {
      setError(null);
      try {
        const response = await fetch(
          "https://quiz-7044b-default-rtdb.firebaseio.com/postData.json",
          {
            method: "POST",
            body: JSON.stringify(postData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        console.log(response);
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setCurrentSection(3);
        }
      } catch (error) {
        setCurrentSection(2);
        setError(error.message);
      }
    };
    fetchPostData();
  };

  return (
    <div>
      <div className="navbar">
        <ul>
          {i18n.language === "en" && (
            <Button
              variant="dark"
              onClick={() => {
                i18n.changeLanguage("ar");
              }}>
              العربية
            </Button>
          )}
          {i18n.language === "ar" && (
            <Button
              variant="dark"
              onClick={() => {
                i18n.changeLanguage("en");
              }}>
              English
            </Button>
          )}
        </ul>
      </div>
      <div className="app">
        <form onSubmit={submitHandle}>
          {currentSection === 0 && (
            <Button
              varient="primary"
              type="button"
              onClick={() => setCurrentSection(1)}>
              {t("start")}
            </Button>
          )}

          <Section1
            businessModel={businessModel}
            setBusinessModel={setBusinessModel}
            agebracket={agebracket}
            setAgeBracket={setAgeBracket}
            industries={industries}
            setIndustries={setIndustries}
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
          />

          <Section2
            currentSection={currentSection}
            investment={investment}
            setInvestment={setInvestment}
            investmentValue={investmentValue}
            setInvestmentValue={setInvestmentValue}
            error={error}
          />

          <Section3 currentSection={currentSection} />
        </form>
      </div>
    </div>
  );
}

export default App;
