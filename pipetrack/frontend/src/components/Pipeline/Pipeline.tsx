import * as React from 'react';
import styles from './Pipeline.module.css';
import createEngine, {
    DefaultLinkModel,
    DefaultNodeModel,
    DiagramModel,
    DiagramEngine
} from '@projectstorm/react-diagrams';
import {CanvasWidget} from '@projectstorm/react-canvas-core';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames';
import executePython from '../../utils/executePython';

interface PipelineItem {
    name: string;
    value: string;
    valueID: string;
}

// ключ - фаза, значение - список ячеек в фазе
export type IPipeline = Record<string, Array<String>> & { favorite: string; note: string; };

interface Props {
    pipeline: IPipeline;
    id: string;
    setFavorite: Function;
}

interface State {
    engine: DiagramEngine | null;
    nodes: DefaultNodeModel[] | null;
    pipeline: PipelineItem[];
    note: string;
}

class Pipeline extends React.Component<Props, State> {
    state: State = {
        engine: null,
        nodes: null,
        pipeline: [],
        note: '',
    };



    componentDidMount(): void {
        const pipelineData = this.props.pipeline;

        if (!pipelineData) return;

        const engine = createEngine();

        const pipeline = Object.entries(pipelineData).reduce((res, [name, values]) => {
            // чекаем вдруг это служеюное поле
            if (['favorite', 'note'].includes(name)) {
                return res;
            }

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
            link.setLocked(true);
            res.push(link);

            return res;
        }, [] as any[]);

        const model = new DiagramModel();
        model.addAll(...nodes, ...links);
        engine.setModel(model);

        const { note } = this.props.pipeline;

        this.setState({ engine, nodes, pipeline, note });
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        const { nodes, pipeline } = this.state;

        nodes?.forEach(((node, idx) => {
            const nodeElement = document.querySelector(`[data-nodeid="${node.getID()}"]`);

            const tooltipID = this.props.id + pipeline[idx].name + pipeline[idx].valueID;

            nodeElement?.setAttribute('data-tip', 'true');
            nodeElement?.setAttribute('data-for', tooltipID);
        }));

        ReactTooltip.rebuild();
    }

    setFavorite = async () => {
        const { id, setFavorite, pipeline: {favorite, note} } = this.props;
        const value = favorite === '1' ? '0' : '1';
        const otherValue = '0';

        const code = `
import json

try:
    f = open('log.json')
    all_log = json.load(f)
    f.close()
except IOError:
    all_log = {0:''}
    
for key in all_log:
    if isinstance(all_log[key], dict):
        if key == "${id}":
            all_log[key]["favorite"] = "${value}"
        else:
            all_log[key]["favorite"] = "${otherValue}"

with open('log.json', 'w') as f:
    json.dump(all_log, f)`.trim();

        await executePython(code);
        setFavorite(id, value);
    };

    render() {
        if (!this.props.pipeline) return null;

        const {id: pipelineID, pipeline: {favorite}} = this.props;
        const {engine, pipeline} = this.state;
        if (engine === null) return null;
        // @ts-ignore
        return (
            <div className={styles.pipeline}>
                <div
                    className={classNames({
                        fa: true,
                        'fa-star': true,
                        [styles.star]: true,
                        [styles.star__active]: favorite === "1",
                    })}

                    onClick={this.setFavorite}
                />
                <CanvasWidget engine={engine!} className={styles.pipeline__canvas} />
                {
                    pipeline.map(({ name, valueID, value }) => {
                        const tooltipID = pipelineID + name + valueID;

                        return (
                            <ReactTooltip id={tooltipID} className={styles.tooltip} key={tooltipID}>
                                {value}
                            </ReactTooltip>
                        );
                    })
                }
            </div>
        );
    }
}

export default Pipeline;
