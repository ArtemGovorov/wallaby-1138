import * as React from 'react';

export class Root extends React.Component<any, any> {
    render() {
        return <div children={this.props.children} />
    }
}