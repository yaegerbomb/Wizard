import React from "react";

import { WizardContext } from "./Wizard.Provider";

class Step extends React.Component {
  renderComponents = (components, selectProduct, deselectProduct) => {
    return components.map((component, key) => {
      return (
        <div key={`c-${key}`}>
          {component.label}
          <button
            type="button"
            class="btn btn-primary"
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
