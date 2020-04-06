import os
from IPython.core.display import HTML, Javascript
import random
import string

def show(_ih):
    directory, filename = os.path.split(__file__)
    JS_PATH = os.path.join(directory, "build", "static", "js", "main.js")
    CSS_PATH = os.path.join(directory, "build", "static", "css")
    CSS_PATH = CSS_PATH + '/' + os.listdir(CSS_PATH)[0]
    js_bundle = ''
    css_bundle = ''
    pipeline_data = ''

    with open(CSS_PATH, 'r') as f:
        css_bundle = f.read()

    with open(JS_PATH, 'r') as f:
        js_bundle = f.read()

    with open('log.json', 'r') as f:
        pipeline_data = f.read()

    id = ''.join(random.choice(string.ascii_lowercase) for i in range(10))

    content = f"""
        <div id="{id}"></div>
        <script>
            window.lastReactRootID = '{id}';
            window.pipelineData = `{pipeline_data}`;
            window.isProduction = true;
        </script>
        <style>{css_bundle}</style>
    """

    display(HTML(content))
    display(Javascript(js_bundle))
