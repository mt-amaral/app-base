import { ContentSection } from '../components/content-section'
import { AppearanceForm } from './appearance-form'

export function SettingsAppearance() {
  return (
    <ContentSection
      title='Tema'
    >
      <AppearanceForm />
    </ContentSection>
  )
}
