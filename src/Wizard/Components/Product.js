import React from "react";

import { WizardContext } from "../Wizard.Provider";

class Product extends React.Component {
  render() {
    const { component } = this.props;
    return (
      <WizardContext.Consumer>
        {({ toggleProduct, toggleQuantityProduct }) => (
          <div>
            <div>{component.label}</div>
            <div>{component.description}</div>
            <button type="button" onClick={() => toggleProduct(component)}>
              {component.selected ? "Remove" : "Add"}
            </button>
            {!component.byGlobal && (
              <div>
                <label>{component.otherValueLabel}</label>
                <input
                  type="number"
                  defaultValue={component.otherQuantity}
                  onChange={e =>
                    toggleQuantityProduct(component, e.target.value)
                  }
                />
              </div>
            )}
          </div>
        )}
      </WizardContext.Consumer>
    );
  }
}

export default Product;
