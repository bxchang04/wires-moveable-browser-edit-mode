import React from "react";


import {

} from "./types";

export default class Edit extends React.PureComponent<
  DragSelectableProps,
  DragSelectableState
> {
  state: editState = {
    containerTop: 0,
    containerLeft: 0,
    onScreenElements: [],
    observerIdsCache: []
  };


  componentDidMount(): void {

  }


  componentWillUnmount(): void {

  }

  private handleMouseDown: any = (event: MouseEvent) => {
    if (this.props.locked) {
      return;
    }
    if (event.buttons === 1) {
      this.handleClick(event);
      // eslint-disable-next-line no-underscore-dangle
      this._startUp(event);
    } else {
      event.preventDefault();
      // eslint-disable-next-line no-underscore-dangle
      this._end(event);
    }
  };

  isRightClick = (event: any) => {
    let isRightMB = false;
    if ("which" in event) {
      // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
      isRightMB = event.which === 3;
    } else if ("button" in event) {
      // IE, Opera
      isRightMB = event.button === 2;
    }
    return isRightMB;
  };

  handleClick = (event: MouseEvent) => {
    if (this.mouseInteraction) {
      alert("xxx");
    }

    if (this.isRightClick(event)) {
      return;
    }

    const { selectAbleClass, onSelectChange } = this.props;

    const target = event.target as HTMLElement | SVGAElement;
    if (typeof onSelectChange === "function") {
      const newTarget =
        target && target.classList.contains(selectAbleClass) ? target : null;
      onSelectChange(newTarget, event);
    }
  };

  private _startUp: any = (event: MouseEvent) => this.startUp(event);
  private startUp(event: MouseEvent) {
    if (event.type === "touchstart") {
      event.preventDefault();
    }

    if (this.props.locked) {
      return;
    }

    if (this.isRightClick(event)) {
      return;
    }

    this.getStartingPositions(event);

    if (this.props.container) {
      /*eslint-disable no-underscore-dangle*/
      this.props.container.removeEventListener("mousedown", this._startUp);
      this.props.container.addEventListener("mousemove", this._handleMove);
      this.props.container.addEventListener("mouseup", this._end);
      /*eslint-enable*/
    }
  }



  //Editor feature
  editorMode = () => {
    let component = ('');
    var canvas = document.getElementById('element__wrapper');

    var input1 = '';
    var input2 = '';

    //Helper functions
    var getClosestParent = function (elem, selector) {
      for ( ; elem && elem !== document; elem = elem.parentNode ) {
        if ( elem.matches( selector ) ) return elem;
      }
      return null;
    };

    // Helper function to set components
    function setComponent() {
      // Set component and inputs = to closest  parent node with 'editable' class and its children
      component = getClosestParent(event.target, '.editable');
      // *** - replace below with for loop? i = elements, if classList.contains(".input"), set input[i] = element.
      input1 = component.querySelector('.input1');
      input2 = component.querySelector('.input2');
      //set rest of inputs here
    }

    // Helper function to revert components
    function revertInputs() {
      input1 = input1.textContent;
      input2 = input2.textContent;
      //set rest of inputs here
    }

    // Mouse Input code
    document.getElementById('canvas').onclick = event => {
      if(event.target && event.target.closest(".editable")) {
        if (event.detail === 1) {
          setComponent();
        }
        if (event.detail === 2) {
          // Register double click.
          openEditor();
        }
      }
    };

    // Keyboard Input code
    document.addEventListener("keydown", handleInput);

    function handleInput(e) {
      if(event.key === "F2" ){
        openEditor();
      }

      if(event.key === "Escape"){
        revertInputs();
        editor.blur();
      }

      if(event.key === "Enter" && event.ctrlKey){
        editor.blur();
      }
    }

    // Editor code
    var editor = document.getElementById('editor');

    editor.addEventListener("change", updateEditor);

    function openEditor() {
      var rect = component.getBoundingClientRect();

      editor.style.top = component.offsetTop + "px";
      editor.style.left = rect.left + "px";
      editor.style.width = rect.width + "px";
      editor.style.height = rect.height + "px";
      editor.focus();
      editor.value = input1.textContent + "\n" + input2.textContent; // *** make this dynamic -- needs to account for more than 2 inputs
      editor.select();
    }

    // *** make this dynamic -- needs to account for more than 2 inputs
    function updateEditor() {
      var editorValue = editor.value;

      if(editorValue.includes("\n")){
        var newInput1 = editorValue.slice(0, editor.value.indexOf("\n"));
        var newInput2 = editorValue.slice(editor.value.indexOf("\n"));
      }
      else{
        var newInput1 = editorValue;
        var newInput2 = "";
      }

      input1.textContent = newInput1;
      input2.textContent = newInput2;
      //add more using for loop
    }
  }


  render = () => {
    return (

    );
  };
}
