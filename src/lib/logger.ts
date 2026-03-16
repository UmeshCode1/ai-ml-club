/**
 * Simple logger utility for production-safe logging
 * Replaces console.log with proper error tracking
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogContext {
    [key: string]: unknown;
}

class Logger {
    private isDevelopment = process.env.NODE_ENV === 'development';

    private log(level: LogLevel, message: string, context?: LogContext) {
        // In production, you would send this to a logging service (Sentry, LogRocket, etc.)
        // For now, we only log in development
        if (this.isDevelopment) {
            const timestamp = new Date().toISOString();
            const contextStr = context ? ` | Context: ${JSON.stringify(context)}` : '';

            switch (level) {
                case 'error':
                    console.error(`[${timestamp}] ERROR: ${message}${contextStr}`);
                    break;
                case 'warn':
                    console.warn(`[${timestamp}] WARN: ${message}${contextStr}`);
                    break;
                case 'debug':
                    console.debug(`[${timestamp}] DEBUG: ${message}${contextStr}`);
                    break;
                default:
                    console.log(`[${timestamp}] INFO: ${message}${contextStr}`);
            }
        }

        // TODO: In production, send to logging service
        // Example: Sentry.captureMessage(message, { level, extra: context });
    }

    info(message: string, context?: LogContext) {
        this.log('info', message, context);
    }

    warn(message: string, context?: LogContext) {
        this.log('warn', message, context);
    }

    error(message: string, error?: Error, context?: LogContext) {
        const errorContext = error ? {
            ...context,
            error: {
                message: error.message,
                stack: error.stack,
                name: error.name,
            }
        } : context;

        this.log('error', message, errorContext);

        // TODO: In production, send to error tracking service
        // Example: Sentry.captureException(error, { extra: context });
    }

    debug(message: string, context?: LogContext) {
        this.log('debug', message, context);
    }
}

export const logger = new Logger();
