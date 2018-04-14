import React from "react";

import { WizardContext } from "./Wizard.Provider";

export const Navigator = () => (
  <WizardContext.Consumer>
    {({ state, setStep, isStepValid }) => (
      <React.Fragment>
        <div>
          {state.steps.map((step, key) => (
            <div
              key={`s-${key}`}
              onClick={() => {
                let s = key - 1;
                if (s < 0) {
                  s = 0;
                }
                if (isStepValid(s)) {
                  setStep(key);
                }
              }}
            >
              {step.title}
            </div>
          ))}
        </div>
      </React.Fragment>
    )}
  </WizardContext.Consumer>
);
