import * as React from 'react';
import ReactDOM from 'react-dom';
import './Pipeline.css';
import createEngine, {
    DefaultLinkModel,
    DefaultNodeModel,
    DiagramModel,
    DiagramEngine
} from '@projectstorm/react-diagrams';

import {CanvasWidget} from '@projectstorm/react-canvas-core';
import ReactTooltip from 'react-tooltip'

interface PipelineItem {
    name: string;
    value: string;
    valueID: string;
}


interface Props {

}

interface State {
    engine: DiagramEngine | null;
    nodes: DefaultNodeModel[] | null;
    pipeline: PipelineItem[]
}

const mock: Record<string, Array<String>> = {"train": ["kek = 10", "kek", "for i in range(10):\n    for _ in range(3):\n        print('suka')"], "model": ["'model'"], "metric": ["'metric'"], "serve": []};

class Pipeline extends React.Component<Props, State> {
    state: State = {
        engine: null,
        nodes: null,
        pipeline: [],
    };

    componentDidMount(): void {
        const engine = createEngine();

        const pipeline = Object.entries(mock).reduce((res, [name, values]) => {
            values.forEach((value, valueID) => res.push({ name, value, valueID }));
            return res;
        }, [] as any[]);


        const nodes = pipeline.map(({ name, value, valueID }, idx) => {

            const color = name === 'train' ? 'green' : name === 'model' ? 'blue' : name === 'metric' ? 'red' : 'gray';
            const node = new DefaultNodeModel({
                name: `${name}[${valueID}]`,
                color,
            });

            node.setPosition( 100 * (idx + 1), 100);
            node.addInPort('');
            node.addOutPort('');
            node.setLocked(true);

            return node;
        });

        const links = nodes.reduce((res, node, idx) => {
            if (!idx) return res;

            const prevOutPort = nodes[idx - 1].getOutPorts()?.[0];
            const nextInPort = node.getInPorts()?.[0];

            const link = prevOutPort.link<DefaultLinkModel>(nextInPort);
            res.push(link);

            return res;
        }, [] as any[]);

        const model = new DiagramModel();
        model.addAll(...nodes, ...links);
        engine.setModel(model);

        this.setState({ engine, nodes, pipeline });
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        const { nodes, pipeline } = this.state;

        nodes?.forEach(((node, idx) => {
            const nodeElement = document.querySelector(`[data-nodeid="${node.getID()}"]`);

            const tooltipID = pipeline[idx].name + pipeline[idx].valueID;

            nodeElement?.setAttribute('data-tip', 'true');
            nodeElement?.setAttribute('data-for', tooltipID);
        }));

        ReactTooltip.rebuild();
    }

    render() {
        const {engine, pipeline} = this.state;

        if (engine === null) return null;
        // @ts-ignore
        return (
            <>
                <CanvasWidget engine={engine!} className="pipeline"/>
                {
                    pipeline.map(({ name, valueID, value }) => {
                        const tooltipID = name + valueID;

                        return (
                            <ReactTooltip id={tooltipID} className="tooltip" key={tooltipID}>
                                {value}
                            </ReactTooltip>
                        );
                    })
                }
            </>
        );
    }
}

export default Pipeline;
