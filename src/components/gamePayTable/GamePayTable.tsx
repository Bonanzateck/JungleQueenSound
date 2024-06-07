import React from 'react';
import "./GamePayTable.css"
import PayoutInnerRow from './PayoutInnerRow';
import { isMobile } from 'react-device-detect';
function GamePayTable(props: any) {
    const { langCode, payout } = props;
    const payoutValuesArr = [];
    const popArr = [0, 12, 13, 14];
    let bet = props.betList[props.currentBetIndex];
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    let choosePath = `${origin}${pathname}`;

    choosePath = isMobile ? choosePath + "LD" : choosePath + "HD";
    for (let values of payout) {
        !popArr.includes(values.id) && payoutValuesArr.push(
            <div className={`innerContent ${values.name.toLowerCase()}SymbolDiv ${values.name.toLowerCase().slice(0, 2)}SymbolDiv`} key={values.id}>
                <div className="symbolDiv payOutDiv">
                    <img src={`${choosePath}/assets/paytable/${values.name.toLowerCase()}_symbol.webp`} alt={`${values.name.toLowerCase()} symbol image`} />
                    <ul className='payOutList'>
                        <PayoutInnerRow
                            payout={values.payout}
                            bet={bet}
                        ></PayoutInnerRow>
                    </ul>
                </div>
            </div>
        )
    }

    return (
        <div className='mainPayTableDiv'>
            <div className="topFixedDiv">
                <h1 className='info'>INFO</h1>
            </div>
            <div className="payTableContent">
                <h2 className='heading'>{langCode.paytableHeading1}</h2>
                <div className="innerContent">
                    <div className="symbolDiv">
                        <img src={`${choosePath}/assets/paytable/wild_symbol.webp`} alt="wild symbol image" />
                        <span className='symbolName'>{langCode.paytablePage3_1}</span>
                    </div>
                    <p className='content'>
                        {langCode.paytablePage3_2}
                    </p>
                </div>
                <div className="innerContent">
                    <div className="symbolDiv">
                        <img src={`${choosePath}/assets/paytable/scatter_symbol.webp`} alt="scatter symbol image" />
                        <span className='symbolName'>{langCode.paytablePage3_5}</span>
                    </div>
                    <p className='content'>
                        {langCode.paytablePage3_6}
                    </p>
                </div>
                <div className="innerContent">
                    <div className="symbolDiv">
                        <img src={`${choosePath}/assets/paytable/butterfly_symbol.webp`} alt="butterfly symbol image" />
                        <span className='symbolName'>{langCode.paytablePage3_3}</span>
                    </div>
                    <p className='content'>
                        {langCode.paytablePage3_4}
                    </p>
                </div>
                <div className="innerContent">
                    <div className="symbolDiv">
                        <img src={`${choosePath}/assets/paytable/golden_queen_symbol.webp`} alt="golden queen symbol image" />
                        <span className='symbolName'>{langCode.paytablePage3_7}</span>
                    </div>
                    <p className='content'>
                        {langCode.paytablePage3_8}
                    </p>
                </div>

                {/* pay table pay values */}
                {payoutValuesArr}

                <div className="innerContent featureDiv">
                    <div className="symbolDiv">
                        <span className='symbolName featureSymbol'>{langCode.paytableHeading2}</span>
                        <img src={`${choosePath}/assets/paytable/butterfly_feature.webp`} alt="butterfly feature symbol image" />
                    </div>
                    <p className='content'>
                        {langCode.paytablePage4_1}
                    </p>
                    <img className='featureSymbolImg' src={`${choosePath}/assets/paytable/butterfly_feature_all_symbols.webp`} alt="butterfly feature all symbol image" />
                </div>

                <div className="innerContent featureDiv">
                    <div className="symbolDiv">
                        <span className='symbolName featureSymbol'>{langCode.paytableHeading3}</span>
                        <img className='featureSymbolImg' src={`${choosePath}/assets/paytable/golden_queen_feature.webp`} alt="golden queen feature symbol image" />
                    </div>
                    <p className='content'>
                        {langCode.paytablePage3_8}
                    </p>
                </div>

                <div className="innerContent featureDiv">
                    <div className="symbolDiv">
                        <span className='symbolName featureSymbol'>{langCode.paytableHeading4}</span>
                        <img className='featureSymbolImg' src={`${choosePath}/assets/paytable/freespin_feature.webp`} alt="golden queen feature symbol image" />
                    </div>
                    <p className='content'>
                        {langCode.paytablePage6_1}
                    </p>
                </div>

                <div className="innerContent featureDiv">
                    <div className="symbolDiv">
                        <span className='symbolName featureSymbol'>{langCode.paytableHeading5}</span>
                        <img className='featureSymbolImg' src={`${choosePath}/assets/paytable/paylines.webp`} alt="golden queen feature symbol image" />
                    </div>
                </div>

                <div className="innerContent featureDiv">
                    <div className="symbolDiv">
                        <span className='symbolName featureSymbol'>{langCode.paytableHeading7}</span>
                    </div>
                    <p className='content content_buyFeature'>
                        {langCode.paytablePage6_3}
                    </p>
                </div>

            </div>

            <div className="bottomFixedDiv">
                <button onClick={props.handleButtonClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-circle"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
                </button>
            </div>
        </div>
    )
}

export default GamePayTable;
