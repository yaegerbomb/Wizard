import React from "react";

import { WizardContext } from "../Wizard.Provider.js";

var tosBox = {
  border: "1px solid black",
  padding: "5px",
  backgroundColor: "white",
  maxHeight: "300px",
  overflowY: "scroll"
};

export const TOS = ({ component }) => (
  <WizardContext.Consumer>
    {({ getComponentValue, updateComponentValue }) => (
      <div>
        <div style={tosBox}>
          <div dangerouslySetInnerHTML={{ __html: component.text }} />
        </div>
        <div
          className={
            getComponentValue(component) ? "tos-accept selected" : "tos-accept"
          }
        >
          <label>
            I Accept
            <input
              name="accept"
              type="checkbox"
              checked={getComponentValue(component)}
              onChange={e => updateComponentValue(component, e.target.checked)}
            />
          </label>
        </div>
      </div>
    )}
  </WizardContext.Consumer>
);
