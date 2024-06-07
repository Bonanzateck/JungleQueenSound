import * as React from 'react';
import {ConvertSymbolAnimationContext} from './convertSymbolAnimationConfiguration';

interface IProps {
    children: React.ReactElement;
}

export class ConvertSymbolAnimationProvider extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render(): any {
        const {children, ...rest} = this.props;

        return (
            <ConvertSymbolAnimationContext.Provider value={{...rest}}>
                {children}
            </ConvertSymbolAnimationContext.Provider>
        );
    }
}

export default ConvertSymbolAnimationProvider;
