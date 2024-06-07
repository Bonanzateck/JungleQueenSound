import React from "react";
import "./SwitchButton.css";

export default function SwitchButton(props: any) {
    const { setSwitchLabel, handleToggle, isEnabled , switchName, onClickSound} = props;
    // const [state, setState] = React.useState({
    //     checkedA: false,
    // });

    // console.log(switchName);
    
    const handleChange = (event: any) => {
        onClickSound();
        // setState({ ...state, [event.target.name]: event.target.checked });
        handleToggle(event);
    };

    return (
        <>
            <span className="labelText">{setSwitchLabel}</span>
            <label className="switch">
                <input
                    type="checkbox"
                    onChange={handleChange}
                    name={switchName}
                    checked={isEnabled}
                />
                <span className="slider round"></span>
            </label>
        </>
    );
}
SwitchButton.defaultProps = {
    setSwitchLabel: "Switch"
};

