import React, { useState } from "react";
import PropTypes from "prop-types";
import "./AutoplayRangeSlider.css";
import { isMobile } from "react-device-detect";
import ButtonComponent from "./ButtonComponent";
import { GSAPTimer, CURRENCY } from "@bonanzainteractive/core";

const AutoplayRangeSlider = (props: any) => {
    const {
        minValue,
        maxValue,
        sliderSteps,
        sliderValue,
        sliderId,
        currencyType,
        sliderText,
        handleSlider,
        onClickSound,
        sliderColor,
        isVisible,
        defaultValue,
    } = props;

    const [value, setValue] = useState(0);
    const [isEnabled, setIsEnabled] = React.useState(true);
    const [isEnabledPlus, setIsEnabledPlus] = React.useState(false);
    const [isPointer, setIsPointer] = React.useState(false);
    const [isAction, setIsAction] = React.useState(false);

    //for slider background color calculation 
    const progress = (value / maxValue) * 100;

    React.useEffect(() => {
        // setValue(defaultValue);

        sliderId === "volumeSlider" ? setValue(defaultValue) : null;
        if (value >= 0 && value <= maxValue && isPointer === true) {
            GSAPTimer.getInstance().addTimer(350 / 1000, () => {
                isAction && setValue((prevValue: number) => (prevValue < maxValue ? prevValue + sliderSteps : prevValue));
                !isAction && setValue((prevValue: number) => (prevValue > 0 ? prevValue - sliderSteps : prevValue));
            });
            //for button enable & disable
            !isAction && setIsEnabled(value <= 1 ? true : false);
            !isAction && setIsEnabledPlus(value <= maxValue ? false : true);

            isAction && setIsEnabled(value > -1 ? false : true);
            isAction && setIsEnabledPlus(value === maxValue ? true : false);
        }
    }, [value, isPointer, defaultValue]);

    const handleSliderChange = (event: any) => {
        event.preventDefault();
        setValue(parseFloat(event.target.value));
        new handleSlider(event);
        setIsEnabled(parseFloat(event.target.value) > 0 ? false : true);
        setIsEnabledPlus(parseFloat(event.target.value) === maxValue ? true : false);
    };


    const handleTouchMove = (e: any) => {
        const { touches, target } = e;
        const rect = target.getBoundingClientRect();
        const touch = touches[0];
        const offsetX = touch.clientX - rect.left;
        const percentage = Math.round((offsetX / rect.width) * Number(maxValue));
        if (percentage >= 0 && percentage <= maxValue) {
            setValue(percentage); // Update the value based on touch position
        }
        setIsEnabled(parseFloat(e.target.value) > 0 ? false : true);
        setIsEnabledPlus(parseFloat(e.target.value) === maxValue ? true : false);
    };

    function startHandleClick(e: any) {
        e.preventDefault();
        onClickSound();
        if (e.target.value === "-") {
            setIsAction(false);
        }
        else {
            setIsAction(true);
        }
        setIsPointer(true);
    }

    function stopHandleClick() {
        setIsPointer(false);
    }

    const valueWithCurrency = () => {
        if (currencyType) {
            return currencyType ? CURRENCY.CurrencyManager.formatCurrencyString(sliderId === "thirdSlider" ? value : sliderValue[value], true, true, true, true) : "";
        } else {
            return sliderId === "thirdSlider" ? Number(value).toFixed(2) : Number(sliderValue[value]).toFixed(2);
        }
    }


    return (
        <div onTouchEnd={stopHandleClick}>
            <div className={isMobile ? 'sliderHeaderMob' : "sliderHeaderDesktop"}>
                <div className="sliderText">{sliderText}</div>
                {
                    isVisible && (
                        sliderId !== "thirdSlider" ?
                            <span className="rangeValue rangeValue1"> {
                                value === 0 ? "∞" : valueWithCurrency()
                            }</span>
                            :
                            <span className="rangeValue rangeValue2"> {
                                value === 0 ? "∞" : valueWithCurrency()
                            }</span>
                    )
                }
            </div>
            {/* {
                isMobile ?
                    <ButtonComponent
                        ButtonValue={"-"}
                        classProp={"rangeBtn"}
                        isEnabled={isEnabled}
                        onPointerDown={startHandleClick}
                        onPointerUp={stopHandleClick}
                    ></ButtonComponent> :
                    null
            } */}
            <input className="inputSlider"
                style={{ background: `linear-gradient(to right, ${sliderColor} ${progress}%, #ccc ${progress}%)` }}
                type="range"
                min={minValue as number}
                max={maxValue as number}
                value={value as number}
                onChange={handleSliderChange}
                step={sliderSteps}
                id={sliderId}
                onTouchMove={handleTouchMove}
                onClick={onClickSound}
                onTouchStart={onClickSound}
            // defaultValue={defaultValue}
            />
            {/* {
                isMobile ?
                    <ButtonComponent
                        ButtonValue={"+"}
                        classProp={"rangeBtn"}
                        isEnabled={isEnabledPlus}
                        onPointerDown={startHandleClick}
                        onPointerUp={stopHandleClick}
                    ></ButtonComponent> :
                    null
            } */}
        </div>
    );
};

AutoplayRangeSlider.defaultProps = {
    defaultValue: 0,
    sliderSteps: 1,
    minValue: 0,
    maxValue: 100,
    valueLabel: "auto",
    isMarks: false,
    sliderWidth: "16rem",
    sliderColor: "#228B22",
    sliderMarginTop: 0,
    sliderMarginLeft: 0,
    sliderValue: [0],
    handleSlider: Event,
    currencyType: "",
    sliderText: '',
    isVisible: true
};

AutoplayRangeSlider.propTypes = {
    defaultValue: PropTypes.number,
    sliderSteps: PropTypes.number,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    valueLabel: PropTypes.string,
    isMarks: PropTypes.bool,
    sliderWidth: PropTypes.string,
    sliderColor: PropTypes.string,
    sliderId: PropTypes.string,
    currencyType: PropTypes.string,
    sliderText: PropTypes.string,
    onClickSound: PropTypes.func,
    isVisible: PropTypes.bool,
    handleSlider: PropTypes.any
};

export default AutoplayRangeSlider;