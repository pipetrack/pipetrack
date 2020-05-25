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
import {debounce} from '../../utils/debounce';
import saveNote from '../../snippets/saveNote';
import favoriteUpdate from '../../snippets/favoriteUpdate';
import deletePipeline from '../../snippets/deletePipeline';

interface PipelineItem {
    name: string;
    value: string;
    valueID: string;
}

const debouncesExecutePython = debounce(executePython, 50);

// ключ - фаза, значение - список ячеек в фазе
export type IPipeline = Record<string, Array<String>> & { __favorite: string; __note: string; __order: string[]; __result: string; };

interface Props {
    pipeline: IPipeline;
    id: string;
    setFavorite: Function;
    setNote: Function;
    removePipeline: Function;
}

interface State {
    engine: DiagramEngine | null;
    nodes: DefaultNodeModel[] | null;
    pipeline: PipelineItem[];
    note: string;
    editing: boolean;
}

class Pipeline extends React.Component<Props, State> {
    state: State = {
        engine: null,
        nodes: null,
        pipeline: [],
        note: '',
        editing: false,
    };



    componentDidMount(): void {
        const pipelineData = this.props.pipeline;

        if (!pipelineData) return;

        const engine = createEngine();

        const pipeline = pipelineData.__order.reduce((res, name) => {
            // чекаем вдруг это служеюное поле
            if (['__favorite', '__note', '__order', '__result'].includes(name)) {
                return res;
            }

            pipelineData[name].forEach((value, valueID) => res.push({ name, value, valueID }));
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

        const note = this.props.pipeline.__note;

        this.setState({ engine, nodes, pipeline, note });
    }

    zoomToFit = () => this.state.engine?.zoomToFit?.();

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

    setEditing = (editing: boolean) => {
        this.setState({editing});
    };

    onBlurNote = () => {
        const { id, setNote } = this.props;
        const code = saveNote(id, this.noteValue);

        //@ts-ignore
        this.setEditing(false);
        executePython(code);
        setNote(id, this.noteValue);
    };

    onFocusNote = () => this.setEditing(true);

    handleNoteChange = ({target: {value}}: any): void => {
        //@ts-ignore
        this.setState({note: value});

        // TODO: надо сохранять на каджое изменение по идее, но лагает, need fix
    };

    setFavorite = async () => {
        const { id, setFavorite, pipeline: {__favorite} } = this.props;
        const value = __favorite === '1' ? '0' : '1';
        const otherValue = '0';

        const code = favoriteUpdate(id, value, otherValue);

        await executePython(code);
        setFavorite(id, value);
    };

    deletePipeline = async () => {
        const { id, removePipeline } = this.props;

        const code = deletePipeline(id);

        await executePython(code);
        removePipeline(id);
    };

    textarea = React.createRef<HTMLTextAreaElement>();

    get noteValue(): string|undefined {
        return this.textarea?.current?.value;
    }

    render() {
        if (!this.props.pipeline) return null;

        const {id: pipelineID, pipeline: {__favorite, __note, __result}} = this.props;
        const {engine, pipeline} = this.state;
        if (engine === null) return null;
        // @ts-ignore
        return (
            <div className={styles.root}>
                <div className={styles.pipeline}>
                    <div
                        className={classNames({
                            fa: true,
                            'fa-compress': true,
                            [styles.zoom]: true,
                        })}
                        onClick={this.zoomToFit}
                    />
                    <div
                        className={classNames({
                            fa: true,
                            'fa-trash': true,
                            [styles.trash]: true,
                        })}
                        onClick={this.deletePipeline}
                    />
                    <div className={styles.column}>
                        <div
                            className={classNames({
                                fa: true,
                                'fa-star': true,
                                [styles.star]: true,
                                [styles.star__active]: __favorite === "1",
                            })}

                            onClick={this.setFavorite}
                        />
                        <div>
                            Результат:{` ${__result || 'неизвестно'}`}
                        </div>
                    </div>
                    <CanvasWidget engine={engine!} className={styles.pipeline__canvas} />
                    {
                        pipeline.map(({ name, valueID, value }) => {
                            const tooltipID = pipelineID + name + valueID;

                            return (
                                <ReactTooltip id={tooltipID} className={styles.tooltip} key={tooltipID}>
                                    <pre style={{color:"white"}}>
                                        {value}
                                    </pre>
                                </ReactTooltip>
                            );
                        })
                    }
                </div>
                <textarea
                    ref={this.textarea}
                    defaultValue={this.props.pipeline.__note}
                    className={styles.note}
                    onFocus={this.onFocusNote}
                    onBlur={this.onBlurNote}
                />
                {this.state.editing && (
                    <div
                        className={classNames({
                            fa: true,
                            'fa-check': true,
                            [styles.ok]: true,
                        })}
                        onClick={this.onBlurNote}
                    />
                )}
            </div>
        );
    }
}

export default Pipeline;
