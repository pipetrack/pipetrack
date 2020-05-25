export default (id: string) => `
import json

try:
    f = open('log.json')
    all_log = json.load(f)
    f.close()
except IOError:
    all_log = {0:''}
    
all_log.pop("${id}", None)

with open('log.json', 'w') as f:
    json.dump(all_log, f)`.trim();
