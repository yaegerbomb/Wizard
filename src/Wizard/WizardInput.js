import React from "react";

import { WizardContext } from "./Wizard.Provider.js";

export const WizardInput = ({ component }) => (
  <WizardContext.Consumer>
    {({ state, updateComponentValue }) => (
      <div>
        <label htmlFor={`input-${component.label}`}>{component.label}</label>
        <input
          type="text"
          placeholder=""
          onChange={e => updateComponentValue(component, e.target.value)}
          defaultValue={
            component.value
              ? component.value
              : state.globals.find(g => {
                  return g.name === component.changes[0];
                }).value
          }
        />
      </div>
    )}
  </WizardContext.Consumer>
);
