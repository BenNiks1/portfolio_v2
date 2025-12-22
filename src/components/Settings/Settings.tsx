import { FC } from 'react'
import { useAction, useTypedSelector } from '../../hooks'
import { t } from '../../i18n/translations'
import styles from './Settings.module.scss'

export const Settings: FC = () => {
  const { theme, language } = useTypedSelector(state => state.app)
  const { setTheme, setLanguage, resetSettings } = useAction()

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme)
  }

  const handleLanguageChange = (newLanguage: 'en' | 'ru') => {
    setLanguage(newLanguage)
  }

  const handleResetSettings = () => {
    resetSettings()
  }

  return (
    <div className={styles.settings}>
      <h2 className={styles.settings__title}>{t('settingsTitle', language)}</h2>
      <p className={styles.settings__description}>
        {t('settingsDescription', language)}
      </p>

      <div className={styles.settings__section}>
        <h3 className={styles.settings__sectionTitle}>
          {t('language', language)}
        </h3>
        <div className={styles.settings__options}>
          <button
            className={`${styles.settings__button} ${
              language === 'en' ? styles.settings__button_active : ''
            }`}
            onClick={() => handleLanguageChange('en')}
          >
            English
          </button>
          <button
            className={`${styles.settings__button} ${
              language === 'ru' ? styles.settings__button_active : ''
            }`}
            onClick={() => handleLanguageChange('ru')}
          >
            Русский
          </button>
        </div>
      </div>

      <div className={styles.settings__section}>
        <h3 className={styles.settings__sectionTitle}>
          {t('theme', language)}
        </h3>
        <div className={styles.settings__options}>
          <button
            className={`${styles.settings__button} ${
              theme === 'light' ? styles.settings__button_active : ''
            }`}
            onClick={() => handleThemeChange('light')}
          >
            {t('lightTheme', language)}
          </button>
          <button
            className={`${styles.settings__button} ${
              theme === 'dark' ? styles.settings__button_active : ''
            }`}
            onClick={() => handleThemeChange('dark')}
          >
            {t('darkTheme', language)}
          </button>
        </div>
      </div>

      <div className={styles.settings__section}>
        <button
          className={styles.settings__resetButton}
          onClick={handleResetSettings}
        >
          {t('resetSettings', language)}
        </button>
      </div>
    </div>
  )
}
