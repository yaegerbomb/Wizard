import React from "react";

import { WizardContext } from "../Wizard.Provider.js";

export const Email = ({ component }) => (
  <WizardContext.Consumer>
    {({
      getComponentValue,
      updateComponentValue,
      showComponentInvalidMessage
    }) => (
      <div>
        <label htmlFor={`input-email`}>Email</label>
        <input
          name={`input-${component.label}`}
          type="email"
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
