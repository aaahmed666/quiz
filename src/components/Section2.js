import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Section2 = ({
  currentSection,
  investment,
  setInvestment,
  investmentValue,
  setInvestmentValue,
  error,
}) => {
  const [t] = useTranslation();

  return (
    <>
      {currentSection === 2 && (
        <section>
          <div className="radio-item">
            <h2>{t("q4")}</h2>
            <label>
              <input
                type="radio"
                name="q4"
                onClick={() => setInvestment("yes")}
              />
              <span>{t("a1")}</span>
            </label>
            <label>
              <input
                type="radio"
                name="q4"
                onClick={() => setInvestment("no")}
              />
              <span>{t("a2")}</span>
            </label>
          </div>

          <div className="radio-item">
            <h2>{t("q5")}</h2>
            <input
              type="number"
              min="1"
              value={investmentValue}
              onChange={(e) => setInvestmentValue(e.target.value)}
              disabled={!investment || investment === "no"}
            />
          </div>
          {investment && (
            <Button variant="success" type="submit">
              {t("submit")}
            </Button>
          )}
          <h2>{error}</h2>
        </section>
      )}
    </>
  );
};

export default Section2;
