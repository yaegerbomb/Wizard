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
          name={`input-${component.label}`}
          type={component.type}
          placeholder={component.placeholder ? component.placeholder : ""}
          onChange={e => updateComponentValue(component, e.target.value)}
          value={getComponentValue(component)}
          disabled={component.disabled}
        />
        {showComponentInvalidMessage(component) && (
          <div>{component.invalidMessage} </div>
        )}
      </div>
    )}
  </WizardContext.Consumer>
);
