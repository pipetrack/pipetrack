export default (python: string) => {
    return new Promise((resolve) => {
        const callbacks = {
            iopub: {
                output: (data: any) => resolve(data)
            }
        };

        // @ts-ignore
        Jupyter.notebook.kernel.execute(python, callbacks);
    });
}
