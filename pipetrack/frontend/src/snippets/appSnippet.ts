export default `
import json

try:
    f = open('log.json')
    all_log = json.load(f)
    f.close()
except IOError:
    all_log = {0:''}
    
display(Javascript(f"""window.pipelineData = {pipeline_data};"""))`;
