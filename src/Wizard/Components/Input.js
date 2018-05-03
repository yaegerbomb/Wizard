import React from "react";
import slugify from "../../Utils/slugify";

import { WizardContext } from "../Wizard.Provider.js";

export const Input = ({ component }) => (
  <WizardContext.Consumer>
    {({
      getComponentValue,
      updateComponentValue,
      showComponentInvalidMessage
    }) => {
      const id = slugify(component.label);
      return (
        <div className="c-form-group contact-input">
          <label className="c-form-label" htmlFor={id}>
            {component.label}
          </label>
          <input
            id={id}
            className="c-form-input"
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
      );
    }}
  </WizardContext.Consumer>
);
