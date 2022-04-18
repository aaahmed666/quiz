import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Section1 = ({
  currentSection,
  setCurrentSection,
  businessModel,
  setBusinessModel,
  setAgeBracket,
  agebracket,
  setIndustries,
  industries,
}) => {
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
  const [t] = useTranslation();

  return (
    <>
      {currentSection === 1 && (
        <section>
          <div className="radio-item">
            <h2>{t("q1")}</h2>
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
            <div className="radio-item">
              <h2>{t("q2")}</h2>
              <label>
                <input
                  type="radio"
                  name="q2"
                  onClick={() => setAgeBracket("yes")}
                  defaultChecked={agebracket === "yes"}
                />
                <span>{t("a1")}</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="q2"
                  onClick={() => setAgeBracket("no")}
                  defaultChecked={agebracket === "no"}
                />
                <span>{t("a2")}</span>
              </label>
            </div>
          )}

          {(businessModel === "B2B" || businessModel === "Both") && (
            <div className="radio-item">
              <h2>{t("q3")}</h2>
              <label>
                <input
                  type="radio"
                  name="q3"
                  onClick={() => setIndustries("yes")}
                  defaultChecked={industries === "yes"}
                />
                <span>{t("a1")}</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="q3"
                  onClick={() => setIndustries("no")}
                  defaultChecked={industries === "yes"}
                />
                <span>{t("a2")}</span>
              </label>
            </div>
          )}

          {nextQuestion() && (
            <Button
              varient="primary"
              type="button"
              onClick={() => setCurrentSection(2)}>
              {t("next")}
            </Button>
          )}
        </section>
      )}
    </>
  );
};

export default Section1;
