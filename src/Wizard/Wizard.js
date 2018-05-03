import React from "react";

import { Navigator } from "./Wizard.Navigator";
import { WizardStepButtons } from "./Wizard.Step.Buttons";
import Step from "./Wizard.Step";
import { WizardContext } from "./Wizard.Provider.js";

import "./wizard.css";

export const Wizard = () => (
  <WizardContext.Consumer>
    {({ state }) => (
      <div id="wizard">
        {!state.submitted && (
          <React.Fragment>
            <Navigator />
            <Step />
            <WizardStepButtons />
          </React.Fragment>
        )}
        {state.submitted && (
          <div className="success-message">{state.successMessage}</div>
        )}
      </div>
    )}
  </WizardContext.Consumer>
);
