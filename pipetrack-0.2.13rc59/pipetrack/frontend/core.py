import os
from IPython.core.display import HTML, Javascript
import random
import string
import json

def show(_ih):
    directory, filename = os.path.split(__file__)
    JS_PATH = os.path.join(directory, "build", "static", "js", "main.js")
    CSS_PATH = os.path.join(directory, "build", "static", "css")
    CSS_PATH = CSS_PATH + '/' + os.listdir(CSS_PATH)[0]
    js_bundle = ''
    css_bundle = ''
    pipeline_data = {}

    with open(CSS_PATH, 'r') as f:
        css_bundle = f.read()

    with open(JS_PATH, 'r') as f:
        js_bundle = f.read()

    try:
        f = open('log.json')
        pipeline_data = json.load(f)
        f.close()
    except IOError:
        pass

    id = ''.join(random.choice(string.ascii_lowercase) for i in range(10))

    content = f"""
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <div id="{id}"></div>
        <script>
            window.lastReactRootID = '{id}';
            window.pipelineData = {pipeline_data};
            window.isProduction = true;
        </script>
        <style>{css_bundle}</style>
    """

    display(HTML(content))
    display(Javascript(js_bundle))