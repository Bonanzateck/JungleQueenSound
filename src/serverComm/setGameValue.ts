
// This function sets various game configuration values based on the provided Result and props.
export const setGameValue = (Result: any, props: any) => {
    // Destructure properties from the props object for easy access.
    const { setApplicationAutoPlayLossLimitEnabled, setApplicationDebugEnabled, setApplicationCurrencyAdditionalMultiplier, setApplicationAutoPlayLossLimitMandatory, setApplicationAutoPlaySingleWinLimitEnabled, setApplicationAutoPlaySingleWinLimitMandatory, setApplicationAutoPlayWinLimitEnabled, setApplicationAutoPlayWinLimitMandatory, setApplicationCheatingEnabled, setApplicationCountryCode, setApplicationCurrencyCode, setApplicationCurrencyDecimalSeparator, setApplicationCurrencyIgnoreDecimals, setApplicationCurrencyGroupingSeparator, setApplicationDisableQuickSpin, setApplicationDisableQuickStop, setApplicationEnableAutoPlay, setApplicationEnableRiskCard, setApplicationHistoryUrl, setApplicationHomeUrl, setApplicationLanguageCode, setApplicationRealityCheckTimePassedInSeconds, setApplicationRealityCheckTimeoutInSeconds, setApplicationSessionTimeoutInSeconds, setApplicationShowCloseButton, setApplicationShowHelpButton, setApplicationShowSettingsControl, setApplicationShowRTP, setApplicationShowTime, setApplicationShowVolumeControl, setTopwinOddsShow, setApplicationEnableRiskLadder, setApplicationAutoPlaySpinStartValue, setApplicationAutoPlaySingleWinLimitPercentage, setApplicationCurrencySymbolPrintedBefore, setApplicationShowSlotSessionStatistics, setApplicationMaxWinMultiplier, setApplicationAutoPlayExpertMode, setApplicationAutoPlaySpinSteps, setApplicationAutoPlaySimpleMode, setApplicationLocale, setApplicationAutoPlaySpinResetToStartValue, setApplicationResponsibleGamingUrl, setApplicationAutoPlayWinLimitPercentage, setApplicationAutoPlayFreeGamesAutoStart, setApplicationShowResponsibleGamingIcon, setApplicationAutoPlayLossLimitPercentage, setApplicationCurrencySymbol, setApplicationResponsibleGamingIconPath, setApplicationAutoPlayAbortOnFreeGameWinEnabled, setApplicationRequestCommand, setSuppressCelebrationForWinsBelowStake } = props;

    // Set various game configuration values based on the Result object.
    setApplicationAutoPlayLossLimitEnabled(Result.gameOptions.autoPlayLossLimitEnabled);
    setApplicationDebugEnabled(Result.gameOptions.debugEnabled);
    setApplicationCurrencyAdditionalMultiplier(Result.gameOptions.currencyAdditionalMultiplier);
    setApplicationAutoPlayLossLimitMandatory(Result.gameOptions.autoPlayLossLimitMandatory);
    setApplicationAutoPlaySingleWinLimitEnabled(Result.gameOptions.autoPlaySingleWinLimitEnabled);
    setApplicationAutoPlaySingleWinLimitMandatory(Result.gameOptions.autoPlaySingleWinLimitMandatory);
    setApplicationAutoPlayWinLimitEnabled(Result.gameOptions.autoPlayWinLimitEnabled);
    setApplicationAutoPlayWinLimitMandatory(Result.gameOptions.autoPlayWinLimitMandatory);
    setApplicationCheatingEnabled(Result.gameOptions.cheatingEnabled);
    setApplicationCountryCode(Result.gameOptions.countryCode);
    setApplicationCurrencyCode(Result.gameOptions.currencyCode);

    // Set currency-related configurations, with default values when necessary.
    setApplicationCurrencyDecimalSeparator(Result.gameOptions.currencyDecimalSeparator ? Result.gameOptions.currencyDecimalSeparator : ".");
    setApplicationCurrencyIgnoreDecimals(Result.gameOptions.currencyIgnoreDecimals);
    setApplicationCurrencyGroupingSeparator(Result.gameOptions.currencyGroupingSeparator ? Result.gameOptions.currencyGroupingSeparator : ",");
    setApplicationDisableQuickSpin(Result.gameOptions.disableQuickSpin);
    setApplicationDisableQuickStop(Result.gameOptions.disableQuickStop);
    setApplicationEnableAutoPlay(Result.gameOptions.enableAutoPlay);
    setApplicationEnableRiskCard(Result.gameOptions.enableRiskCard);
    setApplicationHistoryUrl(Result.gameOptions.historyUrl);
    setApplicationHomeUrl(Result.gameOptions.homeUrl);
    setApplicationLanguageCode(Result.gameOptions.languageCode);
    setApplicationSessionTimeoutInSeconds(Result.gameOptions.sessionTimeoutInSeconds);
    setApplicationShowCloseButton(Result.gameOptions.showCloseButton);
    setApplicationShowHelpButton(Result.gameOptions.showHelpButton);
    setApplicationShowRTP(Result.gameOptions.showRTP);
    setApplicationShowSettingsControl(Result.gameOptions.showSettingsControl);
    setApplicationShowTime(Result.gameOptions.showTime);
    setApplicationShowVolumeControl(Result.gameOptions.showVolumeControl);

    // Set other game configurations.
    setTopwinOddsShow(Result.gameOptions.showTopWinOdds);
    setApplicationEnableRiskLadder(Result.gameOptions.enableRiskLadder);
    setApplicationAutoPlaySpinStartValue(Result.gameOptions.autoPlaySpinStartValue);
    setApplicationAutoPlaySingleWinLimitPercentage(Result.gameOptions.autoPlaySingleWinLimitPercentage);
    setApplicationCurrencySymbolPrintedBefore(!Result.gameOptions.currencySymbolPrintedBefore);
    setApplicationShowSlotSessionStatistics(Result.gameOptions.showSlotSessionStatistics);
    setApplicationMaxWinMultiplier(Result.gameOptions.maxWinMultiplier);
    setApplicationAutoPlayExpertMode(Result.gameOptions.autoPlayExpertMode);

    // Extract and set the first 9 elements of autoPlaySpinSteps, if available.
    let autoplaySteps = [];
    if (Result.gameOptions.autoPlaySpinSteps.length > 9) {
        for (let i = 0; i < 9; i++) {
            autoplaySteps.push(Result.gameOptions.autoPlaySpinSteps[i]);
        }
    } else {
        autoplaySteps = Result.gameOptions.autoPlaySpinSteps;
    }
    setApplicationAutoPlaySpinSteps(autoplaySteps);

    setApplicationAutoPlaySimpleMode(true);
    setApplicationLocale(Result.gameOptions.locale.toLowerCase().substring(0, 2));
    setApplicationAutoPlaySpinResetToStartValue(Result.gameOptions.autoPlaySpinResetToStartValue);
    setApplicationResponsibleGamingUrl(Result.gameOptions.responsibleGamingUrl);
    setApplicationAutoPlayWinLimitPercentage(Result.gameOptions.autoPlayWinLimitPercentage);
    setApplicationShowResponsibleGamingIcon(Result.gameOptions.showResponsibleGamingIcon);
    setApplicationAutoPlayFreeGamesAutoStart(Result.gameOptions.autoPlayFreeGamesAutoStart);
    setApplicationAutoPlayLossLimitPercentage(Result.gameOptions.autoPlayLossLimitPercentage);
    setApplicationCurrencySymbol(Result.gameOptions.currencySymbol);
    setApplicationResponsibleGamingIconPath(Result.gameOptions.responsibleGamingIconPath);
    setApplicationAutoPlayAbortOnFreeGameWinEnabled(Result.gameOptions.autoPlayAbortOnFreeGameWinEnabled);
    setApplicationRequestCommand(Result.gameOptions.requestCommand);
    setSuppressCelebrationForWinsBelowStake(true);

    // Set the reality check time passed and timeout in seconds.
    setApplicationRealityCheckTimePassedInSeconds(Result.gameOptions.realityCheckTimePassedInSeconds * 1000);
    setApplicationRealityCheckTimeoutInSeconds(Result.gameOptions.realityCheckTimeoutInSeconds * 1000);
}