import { AlertCircle, Lock, ShieldAlert, Clock, HelpCircle, RefreshCw } from 'lucide-react';
import styles from './ErrorMessage.module.css';

export default function ErrorMessage({ error, onRetry, onReset }) {
  if (!error) return null;

  const { code, message, supportedPlatforms, retryAfter } = error;

  let IconComponent = AlertCircle;
  let title = 'Something went wrong';

  if (code === 'UNSUPPORTED_PLATFORM') {
    IconComponent = HelpCircle;
    title = 'Platform Not Supported Yet';
  } else if (code === 'PRIVATE_CONTENT') {
    IconComponent = Lock;
    title = 'Content is Private';
  } else if (code === 'RATE_LIMITED') {
    IconComponent = Clock;
    title = 'Slow Down!';
  } else if (code === 'INVALID_URL') {
    IconComponent = ShieldAlert;
    title = 'Invalid URL';
  }

  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>
        <IconComponent size={28} />
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>

      {supportedPlatforms && (
        <div className={styles.platformList}>
          <p className={styles.platformHeader}>We currently support:</p>
          <div className={styles.tags}>
            {supportedPlatforms.map((p) => (
              <span key={p} className={styles.tag}>{p}</span>
            ))}
          </div>
        </div>
      )}

      {retryAfter && (
        <p className={styles.retryNotice}>
          Please wait {retryAfter} seconds before trying again.
        </p>
      )}

      <div className={styles.actions}>
        {onRetry && (
          <button onClick={onRetry} className="btn-primary" style={{ padding: '8px 18px', fontSize: '13px' }}>
            <RefreshCw size={14} />
            <span>Try Again</span>
          </button>
        )}
        {onReset && (
          <button onClick={onReset} className="btn-ghost" style={{ padding: '8px 18px', fontSize: '13px' }}>
            <span>Try another URL</span>
          </button>
        )}
      </div>
    </div>
  );
}
