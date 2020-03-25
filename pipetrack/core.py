"""This module is made for defining a bunch of functions
for logging pipelines.
"""
import json
import os
from IPython.core.display import HTML, Javascript
import random
import string

__start_ix = 0
__list_of_phases = []

def start(_ih:list = None):
    if _ih is None:
        raise Exception("Input caching variable '_ih' must be passed")
    else:
        global __start_ix
        __start_ix = len(_ih)

def start_phase(name:str = None):
    if name is None:
        raise Exception("Name of current phase must be passed")
    else:
        global __list_of_phases
        __list_of_phases.append(name)


def finish(_ih:list = None):
    if _ih is None:
        raise Exception("Input caching variable '_ih' must be passed")
    else:
        global __start_ix
        global __list_of_phases
        ih = _ih[__start_ix:]
        di = {}
        for i in range(len(__list_of_phases)):
            name = __list_of_phases[i]
            try:
                di[name] = ih[
                ih.index(f'pipetrack.start_phase("{__list_of_phases[i]}")')+1 :
                ih.index(f'pipetrack.start_phase("{__list_of_phases[i+1]}")')
                ]
            except IndexError:
                di[name] = ih[
                ih.index(f'pipetrack.start_phase("{__list_of_phases[i]}")')+1 :
                -1]

        with open('log.json', 'w') as f:
            json.dump(di, f)

def show(_ih):
    directory, filename = os.path.split(__file__)
    JS_PATH = os.path.join(directory, "frontend", "build", "static", "js", "main.js")
    CSS_PATH = os.path.join(directory, "frontend", "build", "static", "css")
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
        </script>
        <style>{css_bundle}</style>
    """

    display(HTML(content))
    display(Javascript(js_bundle))
