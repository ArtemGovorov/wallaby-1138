import * as React from 'react';

export class NotFound extends React.Component<any, any> {
    render() {
        return <div className="NotFound" children={this.props.children} />
    }
}

export class LazyRoute extends React.Component<any, any> {
    render() {
        return <div className="LazyRoute" children={this.props.children} />
    }
}