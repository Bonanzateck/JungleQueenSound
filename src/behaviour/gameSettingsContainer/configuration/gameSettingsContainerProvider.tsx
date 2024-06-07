import * as React from 'react';

import { GameSettingsContainerConfigurationContext } from './gameSettingsContainerConfiguration';


interface IProps {
    children: React.ReactElement;

}

export class GameSettingsContainerConfigurationProvider extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    render(): any {
        const { children, ...rest } = this.props;

        return (
            <GameSettingsContainerConfigurationContext.Provider value={{ ...rest }}>
                {children}
            </GameSettingsContainerConfigurationContext.Provider>
        );
    }
}
export default GameSettingsContainerConfigurationProvider;
