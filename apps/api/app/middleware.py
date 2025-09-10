from uuid import uuid4
from typing import Callable
from fastapi import Request, Response

async def request_id_middleware(request: Request, call_next: Callable):
    request_id = str(uuid4())
    request.state.request_id = request_id
    response: Response = await call_next(request)
    response.headers['X-Request-ID'] = request_id
    return response
