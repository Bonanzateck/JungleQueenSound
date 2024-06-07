import * as React from 'react';
import {CoinSymbolAnimationContext} from './coinSymbolAnimationConfiguration';

interface IProps {
    children: React.ReactElement;
}

export class CoinSymbolAnimationProvider extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render(): any {
        const {children, ...rest} = this.props;

        return (
            <CoinSymbolAnimationContext.Provider value={{...rest}}>
                {children}
            </CoinSymbolAnimationContext.Provider>
        );
    }
}

export default CoinSymbolAnimationProvider;
