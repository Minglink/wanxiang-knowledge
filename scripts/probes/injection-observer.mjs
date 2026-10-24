// Not imported by the shipped plugin. Explicit opt-in; logs counts only.
export const name = 'wanxiang-injection-observer';
export function apply(ctx, config = {}) {
  if (config.enabled !== true) return;
  ctx.on('agent/pre-step', async (input, next) => {
    const decision = await next();
    ctx.logger.info(JSON.stringify({
      probe: 'pre-step', kind: decision.kind,
      incoming: input.messages.length,
      outgoing: decision.kind === 'reject' ? 0 : decision.messages.length,
    }));
    return decision;
  });
  ctx.on('system-prompt/assemble', async (assembly, _context, next) => {
    const result = await next();
    ctx.logger.info(JSON.stringify({
      probe: 'assembly', sections: result.sections.length,
      contexts: result.contexts.length,
    }));
    return result;
  });
  ctx.on('session/event', (_session, event) => {
    if (['system/message', 'developer/message', 'user/message'].includes(event.type)) {
      ctx.logger.info(JSON.stringify({ probe: 'event', type: event.type }));
    }
  });
}
