import React from "react";
import slugify from "../../Utils/slugify";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { WizardContext } from "../Wizard.Provider";
class Product extends React.Component {
  state = {
    label: "",
    description: "",
    otherValueLabel: "",
    editLabel: false,
    editDescription: false,
    editorState: EditorState.createEmpty(),
    editOtherValueLabel: false,
    editDetails: false,
    editPrice: 0,
    editByGlobal: true,
    editMinCharge: 0,
    editOtherQuantity: 0,
    editOtherQuantityMin: 1,
    editShowOtherQuantity: true,
    editUnit: ""

  };

  componentDidMount() {
    if (this.props.component.description) {
      let html = this.props.component.description;
      const contentBlock = htmlToDraft(html);

      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );

        const editorState = EditorState.createWithContent(contentState);
        this.setState({
          editorState: editorState,
          description: this.props.component.description
        });
      }
    }

    this.setState({
      editPrice: this.props.component.price,
      editByGlobal: this.props.component.byGlobal,
      editMinCharge: this.props.component.minCharge,
      editOtherValueLabel: this.props.component.otherValueLabel,
      editOtherQuantityMin: this.props.component.otherQuantityMin,
      editShowOtherQuantity: this.props.component.showOtherQuantity,
      editUnit: this.props.component.unit
    })
  }

  componentDidUpdate() {
    const description = this.state.description;
    if (
      this.props.component.description &&
      this.props.component.description !== description
    ) {
      let html = this.props.component.description;
      const contentBlock = htmlToDraft(html);

      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );

        const editorState = EditorState.createWithContent(contentState);
        this.setState({
          editorState: editorState,
          description: this.props.component.description
        });
      }
    }
  }

  editLabel = () => {
    const editLabel = this.state.editLabel;

    this.setState({
      editLabel: !editLabel
    });
  };

  editDescription = () => {
    const editDescription = this.state.editDescription;

    this.setState({
      editDescription: !editDescription
    });
  };

  editOtherValueLabel = () => {
    const editOtherValueLabel = this.state.editOtherValueLabel;

    this.setState({
      editOtherValueLabel: !editOtherValueLabel
    });
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState: editorState
    });
  };

  updateComponentStateLabel = (component, callback) => {
    if (this.state.label) {
      callback(component, {
        ...component,
        label: this.state.label
      });
    }

    this.setState({
      editLabel: false
    });
  };

  updateComponentStateOtherValueLabel = (component, callback) => {
    if (this.state.otherValueLabel) {
      callback(component, {
        ...component,
        otherValueLabel: this.state.otherValueLabel
      });
    }

    this.setState({
      editOtherValueLabel: false
    });
  };

  updateComponentStateDescription = (component, callback) => {
    const newDescription = draftToHtml(
      convertToRaw(this.state.editorState.getCurrentContent())
    );
    if (newDescription) {
      callback(component, {
        ...component,
        description: newDescription
      });
    }

    this.setState({
      editDescription: false
    });
  };

  onEditProductDetails = () => {
    this.setState({
      editDetails: true
    })
  }

  updateComponentDetails = (component, callback) => {
    const {
      editPrice,
      editByGlobal,
      editMinCharge,
      editOtherValueLabel,
      editOtherQuantityMin,
      editShowOtherQuantity,
      editUnit
    } = this.state;

    callback(component, {
      ...component,
      price: editPrice,
      byGlobal: editByGlobal,
      minCharge: editMinCharge,
      otherValueLabel: editOtherValueLabel,
      otherQuantityMin: editOtherQuantityMin,
      showOtherQuantity: editShowOtherQuantity,
      unit: editUnit
    });
  }

  render() {
    const component = this.props.component;
    const id = slugify(component.label);
    let productClass = "c-product";
    let productButton = "button";

    if (component.selected) {
      productClass += " selected";
      productButton += " button-remove";
    } else {
      productButton += " button-add";
    }
    const {
      editLabel,
      editDescription,
      editorState,
      editDetails,
      editPrice,
      editByGlobal,
      editMinCharge,
      editOtherValueLabel,
      editOtherQuantityMin,
      editShowOtherQuantity,
      editUnit
    } = this.state;

    let modalClass = "modal-window"
    if (editDetails) {
      modalClass += " show"
    }

    return (
      <WizardContext.Consumer>
        {({ toggleProduct, toggleQuantityProduct, updateAppProductState, cloneComponent, moveUp, moveDown, removeProduct }) => (
          <React.Fragment>
            <div className={modalClass}>
              <div>
                <button type="button" className="modal-close" onClick={() => { this.setState({ editDetails: false }) }}>Close</button>
                <h1>Edit Product</h1>
                <form>
                  <div className="edit-group">
                    <label>Price:</label>
                    <input type="number" onChange={(e) => this.setState({ editPrice: e.target.value })} className="c-form-input" value={editPrice} />
                  </div>
                  <div className="edit-group">
                    <label>Minimum Charge:</label>
                    <input type="number" onChange={(e) => this.setState({ editMinCharge: e.target.value })} className="c-form-input" value={editMinCharge} />
                  </div>
                  <div className="edit-group">
                    <label>By Global:</label>
                    <input type="checkbox" onChange={(e) => this.setState({ editByGlobal: !editByGlobal })} checked={editByGlobal} />
                  </div>
                  {!editByGlobal && (
                    <React.Fragment>
                      <div className="edit-group">
                        <label>Other Quantiy Minimum Value:</label>
                        <input type="number" onChange={(e) => this.setState({ editOtherQuantityMin: e.target.value })} className="c-form-input" value={editOtherQuantityMin} />
                      </div>
                      <div className="edit-group">
                        <label>Show Other Quantity:</label>
                        <input type="checkbox" onChange={(e) => this.setState({ editShowOtherQuantity: !editShowOtherQuantity })} checked={editShowOtherQuantity} />
                      </div>
                      <div className="edit-group">
                        <label>Unit:</label>
                        <input type="text" onChange={(e) => this.setState({ editUnit: e.target.value })} className="c-form-input" value={editUnit} />
                      </div>
                    </React.Fragment>
                  )}
                  <button type="button" onClick={() => { this.setState({ editDetails: false }) }} className="btn btn-cancel">Cancel</button>
                  <button type="button" onClick={() => this.updateComponentDetails(component, updateAppProductState)} className="btn btn-save">Save Changes</button>
                </form>
              </div>
            </div>

            <button
              type="button"
              className="btn-edit clone-button"
              onClick={() => moveDown(component)}
            >
              Move down
            </button>
            <button
              type="button"
              className="btn-edit clone-button"
              onClick={() => moveUp(component)}
            >
              Move up
            </button>

            <div className={productClass}>
              <button onClick={() => this.onEditProductDetails()} type="button" className="btn btn-edit right">Edit Product Details</button>
              <div className="c-product-title">
                {!editLabel && <React.Fragment>{component.label}</React.Fragment>}
                {editLabel && (
                  <input
                    type="text"
                    className="c-form-input"
                    defaultValue={component.label}
                    onChange={e => {
                      this.setState({
                        label: e.target.value
                      });
                    }}
                  />
                )}
                {!editLabel && (
                  <button
                    type="button"
                    className="btn-edit"
                    onClick={() => this.editLabel()}
                  >
                    Edit Title
                </button>
                )}
                {editLabel && (
                  <button
                    type="button"
                    className="btn-save"
                    onClick={() =>
                      this.updateComponentStateLabel(
                        component,
                        updateAppProductState
                      )
                    }
                  >
                    Save Title
                </button>
                )}
              </div>
              {!editDescription && (
                <React.Fragment>
                  <div
                    className="c-product-description"
                    dangerouslySetInnerHTML={{
                      __html: component.description
                    }}
                  />
                  <button
                    type="button"
                    className="btn-edit description"
                    onClick={() => this.editDescription()}
                  >
                    Edit Description
                </button>
                </React.Fragment>
              )}
              {editDescription && (
                <React.Fragment>
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={this.onEditorStateChange}
                  />
                  <button
                    type="button"
                    className="btn-save"
                    onClick={() =>
                      this.updateComponentStateDescription(
                        component,
                        updateAppProductState
                      )
                    }
                  >
                    Save Description
                </button>
                </React.Fragment>
              )}
              {component.byGlobal && (
                <button
                  className={productButton}
                  type="button"
                  onClick={() => toggleProduct(component)}
                >
                  {component.selected ? "Remove" : "Add"}
                </button>
              )}
              {!component.byGlobal && (
                <div className="c-form-group contact-input">
                  <label className="c-form-label" htmlFor={id}>
                    {!editOtherValueLabel && (
                      <React.Fragment>
                        {component.otherValueLabel}
                        <button
                          type="button"
                          className="btn-edit"
                          onClick={() => this.editOtherValueLabel()}
                        >
                          Edit Unit Label
                      </button>
                      </React.Fragment>
                    )}
                  </label>
                  {editOtherValueLabel && (
                    <React.Fragment>
                      <input
                        type="text"
                        className="c-form-input"
                        defaultValue={component.otherValueLabel}
                        onChange={e => {
                          this.setState({
                            otherValueLabel: e.target.value
                          });
                        }}
                      />
                      <button
                        type="button"
                        className="btn-save"
                        onClick={() =>
                          this.updateComponentStateOtherValueLabel(
                            component,
                            updateAppProductState
                          )
                        }
                      >
                        Save Unit Label
                    </button>
                    </React.Fragment>
                  )}
                  <input
                    id={id}
                    className="c-form-input"
                    name={`product-${component.label}`}
                    type="number"
                    value={component.otherQuantity}
                    onChange={e =>
                      toggleQuantityProduct(component, e.target.value)
                    }
                  />
                </div>
              )}
              <button
                type="button"
                className="btn-edit clone-button"
                onClick={() => cloneComponent(component)}
              >
                Clone
                </button>
              <button
                type="button"
                className="btn-reset btn-tiny"
                onClick={() => removeProduct(component)}
              >
                Remove
              </button>
            </div>
          </React.Fragment>
        )}
      </WizardContext.Consumer>
    );
  }
}

export { Product };
