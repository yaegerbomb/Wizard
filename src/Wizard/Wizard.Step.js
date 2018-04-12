import React from "react";

import { WizardContext } from "./Wizard.Provider";
import { WizardInput } from "./WizardInput";

class Step extends React.Component {
  renderInput = component => {};
  renderComponents = (components, selectProduct, deselectProduct) => {
    return components.map((component, key) => {
      switch (component.type) {
        case "textInput":
          return <WizardInput component={component} />;
        default:
          return (
            <div key={`c-${key}`}>
              {component.label}
              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  component.selected
                    ? deselectProduct(component)
                    : selectProduct(component)
                }
              >
                {component.selected ? "Remove" : "Add"}
              </button>
            </div>
          );
      }
    });
  };
  render() {
    return (
      <WizardContext.Consumer>
        {({ state, selectProduct, deselectProduct }) => (
          <React.Fragment>
            {this.renderComponents(
              state.steps[state.currentStep].components,
              selectProduct,
              deselectProduct
            )}
          </React.Fragment>
        )}
      </WizardContext.Consumer>
    );
  }
}

export default Step;
