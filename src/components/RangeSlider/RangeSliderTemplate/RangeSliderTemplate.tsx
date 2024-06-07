import React from "react";
// import { ButtonComponent, SwitchButton, AutoplayRangeSlider } from "@bonanzainteractive/slote_core";
import ButtonComponent from "../rangeSlider/ButtonComponent";
import SwitchButton from "../rangeSlider/SwitchButton";
import AutoplayRangeSlider from "../rangeSlider/AutoplayRangeSlider";

import { isMobile } from "react-device-detect";
import "./RangeSliderTemplate.css";

export default function RangeSliderTemplate(props: any) {
    const {
        thirdSlider,
        firstSliderStep,
        secondSliderStep,
        thirdSliderStep,
        sliderValue,
        isEnabled,
        currencyType,
        isActiveSpinBtn,
        handleToggle,
        handleSlider,
        handleClick,
        autoplayButtons,
        langCode,
        onClickSound,
    } = props;

    let check = false;
    function sliderResizeOnSmallWindow() {
        let element = document.getElementsByClassName("autoPlayMainDiv");
        window.addEventListener("resize", () => {
            if (window.visualViewport?.height && window.visualViewport?.height <= 250) {
                check = true;
                element[0].classList.add('smallWindowDiv');
            } else if (check) {
                element[0].classList.remove('smallWindowDiv');
                check = false;
            }
        });
    }
    sliderResizeOnSmallWindow();

    const buttonList = [];
    for (let bet of autoplayButtons) {
        buttonList.push(
            <ButtonComponent
                classProp={parseInt(isActiveSpinBtn) === bet ? 'autoPlayBtn autoPlayBtnClicked' : "autoPlayBtn"}
                ButtonValue={bet}
                idProp={bet}
                key={bet}
                handleClick={handleClick}
                name={"autoPlaySpinCount"}
                onClickSound={onClickSound}
            ></ButtonComponent>
        );
    }

    return (
        <>
            <div className="autoPlayMainDiv">
                {<h2 className="autoPlayHeading">{langCode.autoplayText_25}</h2>}
                <div className="buttonDiv">
                    {buttonList}
                </div>
                {/* auto play toggle btn div */}
                <div className="autoPlaySwitchBtn">
                    {/* <p id="stop-autoplay">{"Stop Autoplay on Any Win"} </p> */}
                    <SwitchButton
                        handleToggle={handleToggle}
                        setSwitchLabel={`${langCode.autoplayText_2} ${langCode.autoplayText_3}`}
                        switchName={'checkedA'}
                        onClickSound = {onClickSound}
                    ></SwitchButton>
                </div>
                <div className="sliderDiv">
                    <AutoplayRangeSlider
                        sliderText={langCode.autoplayText_6}
                        currencyType={currencyType}
                        handleSlider={handleSlider}
                        sliderId={"firstSlider"}
                        sliderValue={sliderValue()}
                        sliderSteps={firstSliderStep()}
                        maxValue={13}
                        onClickSound={onClickSound}
                        sliderColor={"rgb(226,190,32)"}
                    ></AutoplayRangeSlider>
                    <AutoplayRangeSlider
                        sliderText={langCode.autoplayText_7}
                        currencyType={currencyType}
                        handleSlider={handleSlider}
                        sliderId={"secondSlider"}
                        sliderValue={sliderValue()}
                        sliderSteps={secondSliderStep()}
                        maxValue={15}
                        onClickSound={onClickSound}
                        sliderColor={"rgb(226,190,32)"}
                    ></AutoplayRangeSlider>
                    <AutoplayRangeSlider
                        sliderText={langCode.autoplayText_8}
                        currencyType={currencyType}
                        handleSlider={handleSlider}
                        sliderId={"thirdSlider"}
                        sliderSteps={thirdSliderStep()}
                        maxValue={thirdSlider()}
                        onClickSound={onClickSound}
                        sliderColor={"rgb(226,190,32)"}
                    ></AutoplayRangeSlider>
                </div>
                <div className="startAutoPlayBtnDiv">
                    {
                        <ButtonComponent ButtonComponent
                            classProp={"cancelBtn"}
                            ButtonValue={langCode.autoplayText_21}
                            handleClick={handleClick}
                        ></ButtonComponent>
                    }
                    <ButtonComponent
                        classProp={"startAutoPlayBtn"}
                        ButtonValue={langCode.autoplayText_20}
                        handleClick={handleClick}
                        isEnabled={isEnabled}
                    ></ButtonComponent>
                </div>
            </div>
        </>
    );
}

