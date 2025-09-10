from pydantic import BaseModel
from typing import List, Literal, Optional

class ValidationDiff(BaseModel):
    id: str
    level: Literal['P0', 'P1', 'P2']
    status: Literal['PASS', 'FAIL', 'WARN']
    message: str
    expected: Optional[str] = None
    actual: Optional[str] = None

class ValidationSummary(BaseModel):
    pass_: int
    fail: int
    warn: int

class ValidationResponse(BaseModel):
    summary: ValidationSummary
    diffs: List[ValidationDiff]
