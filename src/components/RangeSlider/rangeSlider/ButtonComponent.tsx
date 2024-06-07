import React from "react";
import "./AutoplayRangeSlider.css"

export default function ButtonComponent(props: any) {
    const { handleClick, name, ButtonValue, isEnabled, classProp, onPointerDown, onPointerUp, idProp } = props;
    return (
        <button
            className={classProp}
            id={idProp}
            name={name}
            value={ButtonValue}
            onClick={handleClick}
            disabled={isEnabled ? true : false}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
        >
            {ButtonValue}
        </button>
    );
}

//default props for ButtonComponent
ButtonComponent.defaultProps = {
    ButtonValue: ''
};