import React from "react";

import { WizardContext } from "../Wizard.Provider.js";

export const Input = ({ component }) => (
  <WizardContext.Consumer>
    {({
      getComponentValue,
      updateComponentValue,
      showComponentInvalidMessage
    }) => (
      <div>
        <label htmlFor={`input-${component.label}`}>{component.label}</label>
        <input
          type={component.type}
          placeholder=""
          onChange={e => updateComponentValue(component, e.target.value)}
          defaultValue={getComponentValue(component)}
        />
        {showComponentInvalidMessage(component) && (
          <div>{component.invalidMessage} </div>
        )}
      </div>
    )}
  </WizardContext.Consumer>
);
