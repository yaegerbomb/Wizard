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
    editOtherValueLabel: false
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

  onEditorStateChange: Function = editorState => {
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
      const editorState = this.state.editorState;
      callback(component, {
        ...component,
        description: newDescription
      });
    }

    this.setState({
      editDescription: false
    });
  };

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
      editOtherValueLabel
    } = this.state;

    return (
      <WizardContext.Consumer>
        {({ toggleProduct, toggleQuantityProduct, updateAppProductState }) => (
          <div className={productClass}>
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
          </div>
        )}
      </WizardContext.Consumer>
    );
  }
}

export { Product };
