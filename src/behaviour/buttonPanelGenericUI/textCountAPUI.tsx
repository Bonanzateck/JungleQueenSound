import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {withButtonPanelConfiguration}  from "@bonanzainteractive/slote_core";
import { UIManager } from "@bonanzainteractive/core";
import { withPixiApp } from "@inlet/react-pixi";
import { configGame, constant } from "../../slot/data/config";
import buttonBase from "./buttonBase";
interface IProps {
    [x: string]: any;
}

interface IStore {
    [x: string]: any;
}

interface IDispatchToProps {
}

interface IState {
    [x: string]: any;
}
interface IStateToProps {

    jurisdictionKey: string,
    autoplayCount: number,
    inAutoplay: boolean;
    layoutMode: string;

}
class textCountAPUI extends buttonBase {
    constructor(props: IProps, state: IState) {
        super(props, state);
        this.state = {
            Text_COUNT_AP: {text: this.textValueCal(), visible: false}
        }  
 
    }   
    textValueCal () {
        let autoPlayTextValue;
        if (this.props.autoplayCount > 0) {            
            if (this.props.autoplayCount === 0) {
                this.UIManagerRef("Text_COUNT_AP") && (this.UIManagerRef("Text_COUNT_AP").visible = false);
            } else {
                this.UIManagerRef("Text_COUNT_AP") && (this.UIManagerRef("Text_COUNT_AP").visible = true);
            }
            autoPlayTextValue = this.props.autoplayCount !== Infinity ? this.props.autoplayCount : (this.isMobile && this.props.autoplayCount === Infinity) || this.props.inAutoplay? "∞" : "";
        }
        else{
            autoPlayTextValue = "";
        }        
        constant.configGame.Text_COUNT_AP =   autoPlayTextValue;
        return autoPlayTextValue;
    }
    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        if(nextProps.layoutMode !== this.props.layoutMode){
            return true;
        }
        if(nextProps.autoplayCount !== this.props.autoplayCount){
            this.setState((prevState) => {
                return {
                    ...prevState,
                    Text_COUNT_AP: {text: this.textValueCal(), visible: false},
                    
                    
                }
            });         
          
            this.forceUpdate();
        }
        return false;
        
    }
    componentDidMount(): void {
        if (this.isMobile) {
            if (window.innerWidth < window.innerHeight) {
                this.UIManagerRef("Text_COUNT_AP").x = this.autoplayCounterX;
                this.UIManagerRef("Text_COUNT_AP").y = this.autoplayCounterY;
            }
            
        }
    }
    render() {
        const { langObj, enableAutoPlay } = this.props;        
        return (
            <UIManager id={"GenericUIComponenttextCountAPUI"}
                type={"Container"}
                ref={i => this.buttonPanelGenericUIContainer = i}
                app={this.app}
                configGame={configGame}>
                {
                    this.displayUI.map((data: any) => { 
                        if(data.name === 'Text_COUNT_AP'){
                            data.text =  this.state[data.name].text;
                            if (this.isMobile) {
                                if (window.innerWidth > window.innerHeight) {
                                    data.x = 1755;
                                    data.y = 290;
                                }
                                else {
                                    data.x = this.autoplayCounterX;
                                    data.y = this.autoplayCounterY;
                                }
                            }
                        } 
                        return (
                            <UIManager
                                key={`UIManager-${Math.random()}`}
                                type={data.type}
                                app={this.app}
                                langObj={langObj}
                                disabled={!enableAutoPlay ? ((data.name == this.autoPlayButtonName) ? true : this.state[data.name] && !this.state[data.name].enable) : this.state[data.name] && !this.state[data.name].enable}
                                id={data.id}
                                {...data}
                            />                        
                        )
                    })
                }
            </UIManager>
        )
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore,  'asyncGameLevelSeverState' | 'betPanelState' | 'basegameState' | 'applicationState' | 'behaviourState'>): IStateToProps =>
    ({
        jurisdictionKey: state.applicationState.jurisdictionKey,
        autoplayCount: state.basegameState.autoplayCount,
        inAutoplay: state.basegameState.inAutoplay,
        layoutMode: state.applicationState.layoutMode,

    }),
    (dispatch: Dispatch): IDispatchToProps => ({}))(withButtonPanelConfiguration(textCountAPUI)));
