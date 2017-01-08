import * as React from "react";

export interface IHelloProps { compiler: string; framework: string; }

// export const Hello = (props: HelloProps) => <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;

export class Hello extends React.Component<IHelloProps, undefined> {
    public render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}
