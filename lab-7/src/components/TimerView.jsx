import { formatTime } from '../formatTime.js'
/**
 * Простий (presentational) компонент таймера: лише показує те, що отримав у
 * props, і викликає передані обробники. Власного стану й ефектів не має.
 *
 * Використання:
 *   <TimerView
 *     method={method}
 *     secondsLeft={175}
 *     status="running"   // 'idle' | 'running' | 'paused' | 'done'
 *     onStart={…}
 *     onPause={…}
 *     onReset={…}
 *   />
 *
 * Вимоги — у тестах tests/TimerView.test.jsx.
 */
export default function TimerView({
  method,
  secondsLeft,
  status,
  onStart,
  onPause,
  onReset,
}) {
  let mainLabel = 'Старт'
  let mainAction = onStart
  if (status === 'running') {
    mainLabel = 'Пауза'
    mainAction = onPause
  } else if (status === 'paused') {
    mainLabel = 'Продовжити'
    mainAction = onStart
  } else if (status === 'done') {
    mainLabel = 'Спочатку'
    mainAction = onReset
  }
  const canReset = status === 'running' || status === 'paused'
  return (
    <article className="brew-timer" aria-labelledby={`${method.id}-title`}>
      <h3 id={`${method.id}-title`}>{method.name}</h3>
      <p>{method.recipe}</p>
      <p className="time" role="timer">
        {formatTime(secondsLeft)}
      </p>
      <div className="timer-controls">
        <button type="button" onClick={mainAction}>
          {mainLabel}
        </button>
        {canReset && (
          <button type="button" onClick={onReset}>
            Скинути
          </button>
        )}
      </div>
      <p role="status" className="timer-done">
        {status === 'done' && 'Готово! Час пити каву.'}
      </p>
    </article>
  )
}
