import { api } from '../lib/axios'

export const exportLink = async () => {
  try {
    const { data } = await api.get('/links/exports')
    const reportUrl = data.reportUrl

    const fileName = reportUrl.split('/').pop() || 'report.csv'

    const link = document.createElement('a')

    link.href = reportUrl
    link.download = fileName
    link.click()
  } catch (error) {
    console.log(error)
  }
}
