import os
from IPython.core.display import HTML
import random
import string

def show(_ih):
    directory, filename = os.path.split(__file__)
    DATA_PATH = os.path.join(directory, "..", "frontend", "build", "static", "js", "main.js")
    js_bundle = ''
    pipeline_data = ''
    with open(DATA_PATH, 'r') as f:
        js_bundle = f.read()

    with open('log.json', 'r') as f:
        pipeline_data = f.read()

    id = ''.join(random.choice(string.ascii_lowercase) for i in range(10))

    content = f"""
        <div id="{id}"></div>
        <script>
            window.lastReactRootID = '{id}';
            window.pipelineData = {pipeline_data};
        </script>
        <script>{js_bundle}</script>
    """

    display(HTML(content))
