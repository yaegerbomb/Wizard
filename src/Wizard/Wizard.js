import React from "react";

import { WizardContext } from "./Wizard.Provider";
import Step from "./Wizard.Step";

export const Wizard = () => (
  <WizardContext.Consumer>
    {({ state, setStep }) => (
      <React.Fragment>
        <div>
          {state.steps.map((step, key) => (
            <div onClick={() => setStep(key)}>{step.title}</div>
          ))}
        </div>
        <div>
          <Step />
        </div>
      </React.Fragment>
    )}
  </WizardContext.Consumer>
);

export default Wizard;
