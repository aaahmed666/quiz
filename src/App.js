import "./App.css";
import React, { useState } from "react";

function App() {
  const [businessModel, setBusinessModel] = useState(false);
  const [agebracket, setAgeBracket] = useState(false);
  const [industries, setIndustries] = useState(false);

  const [currentSection, setCurrentSection] = useState(1);

  const [investment, setInvestment] = useState(false);
  const [investmentValue, setInvestmentValue] = useState(false);

  const nextQuestion = () => {
    let result = false;

    switch (businessModel) {
      case "B2C":
        result = agebracket !== false;
        break;
      case "B2B":
        result = industries !== false;
        break;
      default:
        result = agebracket && industries;
        break;
    }

    return result;
  };

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

    setCurrentSection(3);

    const postData = formatPostData();
    console.log(postData);

    const response = fetch(
      "https://react-http-610ce-default-rtdb.firebaseio.com/values.json",
      {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    const data = response.json();
    console.log(data);
  };

  return (
    <div className="App">
      <form onSubmit={submitHandle}>
        {currentSection === 1 && (
          <section>
            <div className="control-form">
              <h2>Is your business model B2C or B2B or Both?</h2>
              <label>
                <input
                  type="radio"
                  name="q1"
                  onClick={() => setBusinessModel("B2C")}
                />
                <span>B2C</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="q1"
                  onClick={() => setBusinessModel("B2B")}
                />
                <span>B2B</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="q1"
                  onClick={() => setBusinessModel("Both")}
                />
                <span>Both</span>
              </label>
            </div>

            {(businessModel === "B2C" || businessModel === "Both") && (
              <div className="control-form">
                <h2>Do you target all age bracket?</h2>
                <label>
                  <input
                    type="radio"
                    name="q2"
                    onClick={() => setAgeBracket("yes")}
                    defaultChecked={agebracket === "yes"}
                  />
                  <span>yes</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="q2"
                    onClick={() => setAgeBracket("no")}
                    defaultChecked={agebracket === "no"}
                  />
                  <span>no</span>
                </label>
              </div>
            )}

            {(businessModel === "B2B" || businessModel === "Both") && (
              <div className="control-form">
                <h2>Do you target all industries?</h2>
                <label>
                  <input
                    type="radio"
                    name="q3"
                    onClick={() => setIndustries("yes")}
                    defaultChecked={industries === "yes"}
                  />
                  <span>yes</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="q3"
                    onClick={() => setIndustries("no")}
                    defaultChecked={industries === "yes"}
                  />
                  <span>no</span>
                </label>
              </div>
            )}

            {nextQuestion() && (
              <button type="button" onClick={() => setCurrentSection(2)}>
                next
              </button>
            )}
          </section>
        )}

        {currentSection === 2 && (
          <section>
            <div className="form-control">
              <h2>How much was the investment?</h2>
              <label>
                <input
                  type="radio"
                  name="q4"
                  onClick={() => setInvestment("yes")}
                />
                <span>yes</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="q4"
                  onClick={() => setInvestment("no")}
                />
                <span>no</span>
              </label>
            </div>

            <div className="form-control">
              <h2>How much was the investment?</h2>
              <input
                type="number"
                min="1"
                value={investmentValue}
                onChange={(e) => setInvestmentValue(e.target.value)}
                disabled={!investment || investment === "no"}
              />
            </div>
            {investment && <button>Submit</button>}
          </section>
        )}

        {currentSection === 3 && (
          <section>
            <div>you answers are submitted successfully</div>
          </section>
        )}
      </form>
    </div>
  );
}

export default App;
