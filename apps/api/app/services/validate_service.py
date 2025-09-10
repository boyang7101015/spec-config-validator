from pathlib import Path
from typing import Any, Dict, List
import yaml
from ..schemas import ValidationDiff, ValidationResponse, ValidationSummary

BASE_DIR = Path(__file__).resolve().parent.parent
RULESET_PATH = BASE_DIR / 'rulesets' / 'default.yaml'

def get_values(data: Any, path: str) -> List[Any]:
    parts = path.split('.')
    values = [data]
    for part in parts:
        if part.endswith('[]'):
            key = part[:-2]
            new_vals: List[Any] = []
            for v in values:
                arr = v.get(key, []) if isinstance(v, dict) else []
                if isinstance(arr, list):
                    new_vals.extend(arr)
            values = new_vals
        elif '[' in part and part.endswith(']'):
            key, idx = part[:-1].split('[')
            idx = int(idx)
            new_vals = []
            for v in values:
                arr = v.get(key, []) if isinstance(v, dict) else []
                if isinstance(arr, list) and len(arr) > idx:
                    new_vals.append(arr[idx])
            values = new_vals
        else:
            new_vals = []
            for v in values:
                if isinstance(v, dict) and part in v:
                    new_vals.append(v[part])
            values = new_vals
    return values

def validate(spec: Dict[str, Any], conf: Dict[str, Any]) -> ValidationResponse:
    with open(RULESET_PATH, 'r', encoding='utf-8') as f:
        rules = yaml.safe_load(f).get('rules', [])
    diffs: List[ValidationDiff] = []
    pass_count = fail_count = warn_count = 0
    ctx = {'spec': spec, 'conf': conf}
    for rule in rules:
        expected_vals = get_values(ctx, rule['path_spec'])
        conf_vals = get_values(ctx, rule['path_conf'])
        compare = rule['compare'][0]
        op = compare.get('op')
        status = 'PASS'
        message = rule['title']
        expected_str = actual_str = None
        if op == 'eq':
            expected = expected_vals[0] if expected_vals else None
            actual = conf_vals[0] if conf_vals else None
            expected_str = str(expected)
            actual_str = str(actual)
            if expected != actual:
                status = 'FAIL'
        elif op == 'any_in':
            allowed = expected_vals[0] if expected_vals else []
            actual_list = conf_vals
            if not all(item in allowed for item in actual_list):
                status = 'FAIL'
        else:
            status = 'WARN'
        if status == 'PASS':
            pass_count += 1
        elif status == 'FAIL':
            fail_count += 1
        else:
            warn_count += 1
        diffs.append(
            ValidationDiff(
                id=rule['id'],
                level=rule['level'],
                status=status,
                message=message,
                expected=expected_str,
                actual=actual_str,
            )
        )
    summary = ValidationSummary(pass_=pass_count, fail=fail_count, warn=warn_count)
    return ValidationResponse(summary=summary, diffs=diffs)
