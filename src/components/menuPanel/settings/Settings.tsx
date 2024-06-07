import React, { useEffect, useState } from 'react'
import "./Settings.css"
import SwitchButton from '../../RangeSlider/rangeSlider/SwitchButton'
import AutoplayRangeSlider from '../../RangeSlider/rangeSlider/AutoplayRangeSlider';
import { isMobile } from 'react-device-detect';
import { playSoundLoop, stopSoundLoop } from '../../../core/sounds/SoundControler';
// import RangeSliderMain from '../../RangeSlider/rangeSlider/RangeSliderMain';

function Settings(props: any) {
  const { checkGameSound, allSoundSFXStop, stopAllSFXSound, spaceBarSpin, spinWithSpaceBar, onClickSound, playSound, playingSound, soundIsPlaying, stopAllBGMSound, allSoundBGMStop, setSliderValue, storeSliderValue } = props;


  useEffect(() => {

  }, [storeSliderValue]);

  function handleGameSound() {
    // playingSound(!soundIsPlaying);
    stopAllSFXSound(!allSoundSFXStop);

    if (soundIsPlaying === false && allSoundBGMStop) {
      playingSound(!soundIsPlaying);
    }
  }

  function handleBgMusic() {
    stopSoundLoop("baseGameLoop");
    stopAllBGMSound(!allSoundBGMStop);

    if (allSoundSFXStop) {
      playingSound(!soundIsPlaying);
    }

    if (allSoundBGMStop === false) {
      setSliderValue(Number(0));
      stopSoundLoop("baseGameLoop");
    } else {
      setSliderValue(Number(0.7));
      playSoundLoop("baseGameLoop", "jq_mx_basegame", true);
    }
  }

  function handleVolumeSlider(e: any) {
    stopSoundLoop("baseGameLoop");

    let getVol = e.target.value;
    setSliderValue(Number(getVol));
    playSoundLoop("baseGameLoop", "jq_mx_basegame", true, getVol);
    
    // playSound([{ name: "jq_mx_basegame", loop: true, vol: getVol }]);

    if (getVol == 0) {
      stopAllBGMSound(!allSoundBGMStop);
    } else {
      allSoundBGMStop && stopAllBGMSound(!allSoundBGMStop);
    }
  }

  function handleSpaceSpin(e: any) {
    spaceBarSpin(!spinWithSpaceBar);
  }

  return (
    <div className='settingMainDiv'>
      <h1 className='settingHeading'>SETTINGS</h1>
      <div className="settingContentDiv">

        <div className="gameSound">
          <SwitchButton
            handleToggle={handleGameSound}
            setSwitchLabel={`Game Sound`}
            switchName={'gameSound'}
            onClickSound={onClickSound}
            isEnabled={!allSoundSFXStop}
          ></SwitchButton>
        </div>

        <div className="bgMusic">
          <SwitchButton
            handleToggle={handleBgMusic}
            setSwitchLabel={`Background Music`}
            switchName={'bgMusic'}
            onClickSound={onClickSound}
            isEnabled={!allSoundBGMStop}
          ></SwitchButton>
        </div>

        <div className="volumeControl">
          <span>Volume</span>
          <AutoplayRangeSlider
            minValue={0}
            maxValue={1}
            sliderSteps={0.1}
            sliderColor={"rgb(226,190,32)"}
            isVisible={false}
            handleSlider={handleVolumeSlider}
            onClickSound={onClickSound}
            sliderId={"volumeSlider"}
            defaultValue={Number(storeSliderValue)}
          >
          </AutoplayRangeSlider>
        </div>

        {!isMobile ?
          <div className="spaceSpin">
            <SwitchButton
              handleToggle={handleSpaceSpin}
              setSwitchLabel={`Spin with Space`}
              switchName={'spaceSpin'}
              isEnabled={spinWithSpaceBar}
              onClickSound={onClickSound}
            ></SwitchButton>
          </div> : null
        }

        {/* <div>
          <RangeSliderMain
            minValue={0}
            maxValue={100}
            sliderSteps={1}
            sliderColor={"rgb(226,190,32)"}
            isVisible={false}
            handleSlider={handleVolumeSlider}
            onClickSound={onClickSound}
            defaultValue={50}
          >
          </RangeSliderMain>
        </div> */}
      </div>
    </div>
  )
}

export default Settings
