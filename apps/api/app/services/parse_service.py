import json
import csv
import re
from io import BytesIO
from pathlib import Path
from typing import Any, Dict
import yaml

BASE_DIR = Path(__file__).resolve().parent.parent
PARSER_PATH = BASE_DIR / 'parsers' / 'ontap_cli.yaml'

def parse_spec_file(data: bytes, filename: str) -> Dict[str, Any]:
    if filename.endswith('.json'):
        return json.load(BytesIO(data))
    elif filename.endswith('.csv'):
        text = data.decode('utf-8')
        reader = csv.DictReader(text.splitlines())
        return {'rows': list(reader)}
    else:
        raise ValueError('unsupported spec format')

def table_to_list(table: str) -> list[str]:
    lines = [l.strip() for l in table.strip().splitlines() if l.strip()]
    models: list[str] = []
    for line in lines[1:]:  # skip header
        parts = re.split(r'\s+', line)
        if parts:
            models.append(parts[-1])
    return models

def set_path(data: Dict[str, Any], path: str, value: Any) -> None:
    parts = path.split('.')
    cur: Any = data
    for part in parts[:-1]:
        if part.endswith('[]'):
            key = part[:-2]
            cur.setdefault(key, [])
            new_elem = {}
            cur[key].append(new_elem)
            cur = new_elem
        elif '[' in part and part.endswith(']'):
            key, idx = part[:-1].split('[')
            idx = int(idx)
            cur.setdefault(key, [])
            while len(cur[key]) <= idx:
                cur[key].append({})
            cur = cur[key][idx]
        else:
            cur = cur.setdefault(part, {})
    last = parts[-1]
    if last.endswith('[]'):
        key = last[:-2]
        cur.setdefault(key, [])
        cur[key].append(value)
    else:
        cur[last] = value

def parse_config_file(text: str) -> Dict[str, Any]:
    with open(PARSER_PATH, 'r', encoding='utf-8') as f:
        config = yaml.safe_load(f)
    data: Dict[str, Any] = {}
    for parser in config.get('parsers', []):
        match = re.search(parser['match'], text, re.MULTILINE)
        if not match:
            continue
        for path, tmpl in parser.get('map', {}).items():
            if tmpl == 'table_to_list':
                table = match.group('table')
                for item in table_to_list(table):
                    set_path(data, path, item)
            else:
                value = tmpl.format(**match.groupdict())
                set_path(data, path, value)
    return data
