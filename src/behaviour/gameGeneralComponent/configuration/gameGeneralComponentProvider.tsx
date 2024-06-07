import * as React from 'react';

import { GameGeneralComponentConfigurationContext } from './gameGeneralComponentConfiguration';


interface IProps {
    children: React.ReactElement;

}

export class GameGeneralComponentConfigurationProvider extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    render(): any {
        const { children, ...rest } = this.props;

        return (
            <GameGeneralComponentConfigurationContext.Provider value={{ ...rest }}>
                {children}
            </GameGeneralComponentConfigurationContext.Provider>
        );
    }
}
export default GameGeneralComponentConfigurationProvider;
