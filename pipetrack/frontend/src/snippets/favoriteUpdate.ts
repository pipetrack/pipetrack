export default (id: string, value: string, otherValue: string) => `
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
            all_log[key]["__favorite"] = "${value}"
        else:
            all_log[key]["__favorite"] = "${otherValue}"

with open('log.json', 'w') as f:
    json.dump(all_log, f)`.trim();
